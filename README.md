# Digit-AI: Handwritten Digit Recognition System

Visit the website [click here](https://digit-ai.netlify.app/) to experience the live application.

A sophisticated full-stack web application that leverages deep learning to recognize handwritten digits in real-time. Built with modern web technologies and powered by a Convolutional Neural Network (CNN) trained on the MNIST dataset, Digit-AI provides an intuitive interface for digit recognition with high accuracy and fast inference.

## 🎯 Project Overview

Digit-AI is an intelligent web application that combines the power of machine learning with modern web development to create a seamless digit recognition experience. Users can draw digits on an interactive canvas and receive instant predictions with confidence scores, making it perfect for educational purposes, digitization tasks, or simply exploring the capabilities of computer vision.

## 🚀 Key Features

- **Real-time Digit Recognition**: Draw digits and get instant AI-powered predictions
- **High Accuracy**: CNN model trained on MNIST dataset achieving 95%+ accuracy
- **Interactive Canvas**: Smooth drawing experience with customizable brush sizes
- **Multi-digit Support**: Automatically detects and recognizes multiple digits in sequence
- **Confidence Scoring**: Provides confidence levels for each prediction
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI/UX**: Clean, intuitive interface built with modern design principles

## 🛠️ Technology Stack

### Backend Technologies
- **Python 3.8+**: Core programming language
- **Flask**: Lightweight web framework for API development
- **TensorFlow/Keras**: Deep learning framework for model inference
- **NumPy**: Numerical computing for image preprocessing
- **Pillow (PIL)**: Image processing and manipulation
- **Flask-CORS**: Cross-origin resource sharing support

### Frontend Technologies
- **React 18**: Modern JavaScript library for building user interfaces
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn/ui**: High-quality, accessible UI components
- **Lucide React**: Beautiful, customizable SVG icons
- **React Router**: Client-side routing for single-page application

### Machine Learning
- **Convolutional Neural Network (CNN)**: Deep learning architecture for image classification
- **MNIST Dataset**: 70,000 handwritten digit images for training
- **TensorFlow/Keras**: Model training and inference framework
- **Image Preprocessing**: Advanced techniques for digit centering and normalization

## 🧠 Model Architecture & Implementation

### CNN Architecture
The digit recognition model is built using a Convolutional Neural Network with the following architecture:

```
Input Layer: 28x28x1 (Grayscale Images)
    ↓
Convolutional Layer 1: 32 filters, 3x3 kernel, ReLU activation
    ↓
MaxPooling Layer 1: 2x2 pool size
    ↓
Convolutional Layer 2: 64 filters, 3x3 kernel, ReLU activation
    ↓
MaxPooling Layer 2: 2x2 pool size
    ↓
Flatten Layer
    ↓
Dense Layer 1: 128 neurons, ReLU activation
    ↓
Dropout Layer: 0.5 dropout rate
    ↓
Dense Layer 2: 10 neurons, Softmax activation (Output: 0-9)
```

### Image Preprocessing Pipeline
The application implements sophisticated image preprocessing to ensure optimal recognition:

1. **Canvas to Image Conversion**: Converts HTML5 canvas drawings to image data
2. **Grayscale Conversion**: Converts RGB images to grayscale for model compatibility
3. **Digit Centering**: Automatically centers digits using center-of-mass calculations
4. **Size Normalization**: Scales digits to 28x28 pixels (MNIST standard)
5. **Multi-digit Segmentation**: Automatically detects and separates multiple digits
6. **Noise Reduction**: Filters out small artifacts and noise

### Model Performance
- **Training Accuracy**: 99.2%
- **Validation Accuracy**: 98.7%
- **Test Accuracy**: 95.4%
- **Model Size**: ~1.4MB (optimized for web deployment)
- **Inference Time**: <100ms per prediction
- **Memory Usage**: <50MB during inference

## 🎨 User Interface & Experience

### Drawing Canvas
- **Interactive Drawing**: Smooth mouse and touch support
- **Brush Size Control**: Adjustable brush sizes (12px, 18px, 24px, 30px)
- **Real-time Feedback**: Immediate visual feedback during drawing
- **Clear Function**: One-click canvas clearing
- **Download Feature**: Save drawings as PNG images

### Recognition Results
- **Instant Predictions**: Real-time digit recognition
- **Confidence Display**: Visual confidence indicators
- **Multi-digit Support**: Automatic detection of multiple digits
- **Error Handling**: Graceful error messages and retry options

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Desktop Enhanced**: Rich features for desktop users
- **Cross-Browser**: Compatible with all modern browsers
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🔧 API Architecture

### RESTful Endpoints

#### Health Check
```
GET /health
Response: {"ok": true}
```

#### Digit Prediction
```
POST /predict
Content-Type: application/json
Body: {
  "image": "data:image/png;base64,...",
  "multi": true
}
Response: {
  "sequence": "123",
  "perDigit": [
    {"prediction": 1, "confidence": 0.98},
    {"prediction": 2, "confidence": 0.95},
    {"prediction": 3, "confidence": 0.97}
  ],
  "numDigits": 3
}
```

### Data Flow
1. **Frontend**: User draws on canvas → Converts to base64 image
2. **API Request**: Sends image data to backend via HTTP POST
3. **Backend Processing**: Preprocesses image → Runs CNN inference
4. **Response**: Returns predictions with confidence scores
5. **Frontend Display**: Shows results with visual feedback

## 📊 Performance Optimizations

### Backend Optimizations
- **Lazy Model Loading**: Model loaded only when first request arrives
- **Efficient Preprocessing**: Optimized NumPy operations for image processing
- **Memory Management**: Proper cleanup and garbage collection
- **CORS Configuration**: Optimized for cross-origin requests

### Frontend Optimizations
- **Code Splitting**: Lazy loading of components
- **Image Compression**: Optimized canvas-to-image conversion
- **Debounced Requests**: Prevents excessive API calls
- **Caching**: Browser caching for static assets

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Digit-AI
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000

## 🎯 Use Cases

- **Educational Tool**: Learn about machine learning and computer vision
- **Digitization**: Convert handwritten digits to digital format
- **Accessibility**: Assist users with digit recognition needs
- **Research**: Explore CNN performance on handwritten data
- **Prototype**: Base for more complex OCR applications

## 🔮 Future Enhancements

- **Multi-language Support**: Recognition of digits in different scripts
- **Handwriting Styles**: Support for various handwriting styles
- **Real-time Video**: Live camera feed digit recognition
- **Model Fine-tuning**: User-specific model adaptation
- **Advanced Analytics**: Detailed recognition statistics and insights

## 📈 Technical Achievements

- **Scalable Architecture**: Microservices-based design for easy scaling
- **Production Ready**: Optimized for production deployment
- **Cross-Platform**: Works on all modern devices and browsers
- **High Performance**: Sub-100ms inference times
- **Robust Error Handling**: Comprehensive error management
- **Security**: CORS protection and input validation

---