
# Handwritten Digit Recognition with MNIST Dataset
# By: Your Name

import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras import datasets, layers, models

# --------------------------
# 1. Load Dataset
# --------------------------
(x_train, y_train), (x_test, y_test) = datasets.mnist.load_data()

# --------------------------
# 2. Preprocess Data
# --------------------------
# Reshape to (28,28,1) for CNN
x_train = x_train.reshape(-1, 28, 28, 1).astype("float32") / 255.0
x_test = x_test.reshape(-1, 28, 28, 1).astype("float32") / 255.0

print("Training data shape:", x_train.shape)
print("Testing data shape:", x_test.shape)

# --------------------------
# 3. Build CNN Model
# --------------------------
model = models.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(28,28,1)),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D((2,2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')  # 10 classes (0–9)
])

model.summary()

# --------------------------
# 4. Compile & Train
# --------------------------
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

if __name__ == "__main__":
    history = model.fit(x_train, y_train, 
                        epochs=5, 
                        batch_size=64,
                        validation_data=(x_test, y_test))

    # --------------------------
    # 5. Evaluate Model
    # --------------------------
    test_loss, test_acc = model.evaluate(x_test, y_test)
    print(f"✅ Test Accuracy: {test_acc:.4f}")

    # Save model for inference
    model.save("mnist_cnn.keras")
    print("💾 Saved trained model to mnist_cnn.keras")

    # --------------------------
    # 6. Make Predictions
    # --------------------------
    predictions = model.predict(x_test[:10])

    for i in range(10):
        plt.imshow(x_test[i].reshape(28,28), cmap="gray")
        plt.title(f"Predicted: {np.argmax(predictions[i])}, Actual: {y_test[i]}")
        plt.axis("off")
        plt.show()
