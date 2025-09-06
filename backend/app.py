import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"  # suppress INFO/WARNING logs from TF
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"  # silence oneDNN numeric differences note

from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Lazy-load the model to avoid long startup delays
MODEL_PATH = "mnist_cnn.keras"
_model = None

def get_model():
	global _model
	if _model is None:
		# compile=False speeds up load when we only need inference
		_model = load_model(MODEL_PATH, compile=False)
	return _model


def _center_to_28x28_from_array(gray_arr_01: np.ndarray) -> np.ndarray:
	"""Given a single digit grayscale array in [0,1], crop bbox, scale longest side to 20,
	center into 28x28, and return (28,28) array in [0,1]."""
	mask = gray_arr_01 > 0.08
	if not np.any(mask):
		return np.zeros((28, 28), dtype=np.float32)
	rows = np.any(mask, axis=1)
	cols = np.any(mask, axis=0)
	rmin, rmax = np.where(rows)[0][[0, -1]]
	cmin, cmax = np.where(cols)[0][[0, -1]]
	digit = gray_arr_01[rmin:rmax+1, cmin:cmax+1]
	h, w = digit.shape
	if h > w:
		new_h = 20
		new_w = max(1, int(round(w * (20.0 / h))))
	else:
		new_w = 20
		new_h = max(1, int(round(h * (20.0 / w))))
	digit_img = Image.fromarray((digit * 255).astype(np.uint8))
	digit_img = digit_img.resize((new_w, new_h), Image.BILINEAR)
	digit = np.array(digit_img).astype("float32") / 255.0
	canvas = np.zeros((28, 28), dtype=np.float32)
	y_offset = (28 - new_h) // 2
	x_offset = (28 - new_w) // 2
	canvas[y_offset:y_offset+new_h, x_offset:x_offset+new_w] = digit
	# center of mass shift
	yy, xx = np.mgrid[0:28, 0:28]
	total = canvas.sum() + 1e-8
	cy = (yy * canvas).sum() / total
	cx = (xx * canvas).sum() / total
	canvas = np.roll(canvas, int(round(14 - cy)), axis=0)
	canvas = np.roll(canvas, int(round(14 - cx)), axis=1)
	return canvas


def preprocess_image_from_data_url_to_gray(data_url: str) -> np.ndarray:
	"""Return grayscale array in [0,1] from a canvas data URL without resizing or centering."""
	header, b64data = data_url.split(",", 1)
	image_bytes = base64.b64decode(b64data)
	image = Image.open(io.BytesIO(image_bytes)).convert("L")
	arr = np.array(image).astype("float32") / 255.0
	return arr


def preprocess_single_digit_from_data_url(data_url: str) -> np.ndarray:
	"""Return tensor shaped (1,28,28,1) for a single digit from canvas data URL."""
	arr = preprocess_image_from_data_url_to_gray(data_url)
	canvas28 = _center_to_28x28_from_array(arr)
	arr28 = np.expand_dims(canvas28, axis=(0, -1))
	return arr28


def segment_digits_from_gray(gray_arr_01: np.ndarray) -> list:
	"""Segment likely multiple digits using vertical gaps. Returns list of (28,28,1) arrays sorted left->right."""
	mask = gray_arr_01 > 0.08
	if not np.any(mask):
		return []
	# project on columns to find gaps
	cols_any = np.any(mask, axis=0)
	segments = []
	in_seg = False
	start = 0
	for i, val in enumerate(cols_any):
		if val and not in_seg:
			in_seg = True
			start = i
		elif not val and in_seg:
			# end of segment
			end = i - 1
			segments.append((start, end))
			in_seg = False
	# tail segment
	if in_seg:
		segments.append((start, len(cols_any) - 1))
	# filter out tiny noise segments (e.g., width < 4 px)
	segments = [(s, e) for (s, e) in segments if (e - s + 1) >= 4]
	# crop each segment to its row bbox too and center/scale
	rows_any = np.any(mask, axis=1)
	if np.any(rows_any):
		rmin_all, rmax_all = np.where(rows_any)[0][[0, -1]]
	else:
		rmin_all, rmax_all = 0, mask.shape[0] - 1
	digit_tensors = []
	for cmin, cmax in segments:
		crop = gray_arr_01[rmin_all:rmax_all+1, cmin:cmax+1]
		canvas28 = _center_to_28x28_from_array(crop)
		digit_tensors.append(np.expand_dims(canvas28, axis=(-1)))
	return digit_tensors


@app.route("/")
def index():
	return jsonify({"status": "ok", "message": "MNIST inference API is running"})


@app.route("/health")
def health():
	return jsonify({"ok": True})


@app.route("/predict", methods=["POST"])
def predict():
	# Handle both JSON and FormData
	if request.is_json:
		payload = request.get_json(silent=True) or {}
		data_url = payload.get("image")
		multi = bool(payload.get("multi", False))
	else:
		# Handle FormData
		if 'image' in request.files:
			file = request.files['image']
			# Convert file to data URL
			import base64
			image_bytes = file.read()
			data_url = f"data:image/png;base64,{base64.b64encode(image_bytes).decode()}"
		else:
			data_url = None
		multi = False
	
	if not data_url:
		return jsonify({"error": "Missing 'image' field", "received_json": request.is_json, "files": list(request.files.keys())}), 400
	try:
		model = get_model()
		# Auto-detect multiple digits if not explicitly requested
		gray = preprocess_image_from_data_url_to_gray(data_url)
		digit_imgs_auto = segment_digits_from_gray(gray)
		if multi or len(digit_imgs_auto) >= 2:
			if not digit_imgs_auto:
				return jsonify({"prediction": None, "confidence": 0.0, "sequence": "", "perDigit": []})
			batch = np.stack([img for img in digit_imgs_auto], axis=0)
			probs = model.predict(batch, verbose=0)
			preds = np.argmax(probs, axis=1).tolist()
			confs = np.max(probs, axis=1).tolist()
			sequence = "".join(str(p) for p in preds)
			return jsonify({
				"sequence": sequence,
				"perDigit": [{"prediction": int(p), "confidence": float(c)} for p, c in zip(preds, confs)],
				"numDigits": len(preds)
			})
		# Single digit fallback
		input_tensor = _center_to_28x28_from_array(gray)
		input_tensor = np.expand_dims(input_tensor, axis=(0, -1))
		probs = model.predict(input_tensor, verbose=0)[0]
		pred_class = int(np.argmax(probs))
		confidence = float(np.max(probs))
		return jsonify({
			"prediction": pred_class,
			"confidence": confidence,
			"success": True,
			"probs": [float(x) for x in probs]
		})
	except Exception as e:
		return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
	# Avoid Flask reloader spawning multiple processes that re-import TF
	port = int(os.environ.get("PORT", 5000))
	app.run(host="0.0.0.0", port=port) 