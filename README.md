# Handwritten Digit Recognition

A full-stack web application for recognizing handwritten digits using a Convolutional Neural Network (CNN) trained on the MNIST dataset.

## 🚀 Features

- **Real-time Digit Recognition**: Draw digits on a canvas and get instant predictions
- **CNN Model**: Trained on MNIST dataset with 95%+ accuracy
- **Modern Web Interface**: Built with React, TypeScript, and Tailwind CSS
- **RESTful API**: Flask backend with TensorFlow/Keras
- **Responsive Design**: Works on desktop and mobile devices

## 📁 Project Structure

```
Handwritten-Digit-Recognition/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── digit_recognition.py # CNN model training script
│   ├── requirements.txt    # Python dependencies
│   └── mnist_cnn.keras     # Trained model (not in repo)
├── frontend/               # React frontend
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   ├── package.json       # Node.js dependencies
│   └── README.md          # Frontend documentation
├── digit_recognition.py   # Standalone training script
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## 🛠️ Installation

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Train the model (optional):**
   ```bash
   python digit_recognition.py
   ```

5. **Start the Flask server:**
   ```bash
   python app.py
   ```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The frontend will be available at `http://localhost:5173`

## 🎯 Usage

1. **Open the web application** in your browser
2. **Draw a digit** (0-9) on the canvas using your mouse or touch
3. **Click "Predict"** to get the model's prediction
4. **Clear the canvas** to draw a new digit

## 🧠 Model Architecture

The CNN model consists of:
- **Input Layer**: 28x28x1 grayscale images
- **Convolutional Layers**: 2 Conv2D layers with ReLU activation
- **Pooling Layers**: 2 MaxPooling2D layers for dimensionality reduction
- **Dense Layers**: 2 fully connected layers with softmax output
- **Output**: 10 classes (digits 0-9)

## 📊 Performance

- **Training Accuracy**: ~99%
- **Test Accuracy**: ~95%
- **Model Size**: ~1.4MB
- **Inference Time**: <100ms

## 🔧 API Endpoints

### POST `/predict`
Predicts the digit from an uploaded image.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Image file

**Response:**
```json
{
  "prediction": 5,
  "confidence": 0.98,
  "success": true
}
```

## 🛠️ Development

### Training a New Model

1. **Modify the model architecture** in `digit_recognition.py`
2. **Run the training script:**
   ```bash
   python digit_recognition.py
   ```
3. **The trained model** will be saved as `mnist_cnn.keras`

### Customizing the Frontend

The frontend is built with:
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Canvas API** for drawing