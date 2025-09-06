# Deployment Guide for Digit-AI

This guide will help you deploy your Digit-AI application with the backend on Render and frontend on Netlify.

## Prerequisites

- GitHub repository with your code
- Render account (free tier available)
- Netlify account (free tier available)

## Backend Deployment on Render

### Step 1: Prepare Backend for Render

The backend is already configured to work with Render. The key changes made:

1. **Port Configuration**: Updated `backend/app.py` to use environment variable `PORT` (Render automatically sets this)
2. **Dependencies**: Your `requirements.txt` is ready for deployment

### Step 2: Deploy to Render

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com) and sign in
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Connect your GitHub account
   - Select your Digit-AI repository
   - Choose the repository

3. **Configure Service**
   - **Name**: `digit-ai-backend` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Root Directory**: `backend`

4. **Environment Variables** (Optional)
   - No additional environment variables needed for basic deployment
   - Render will automatically set `PORT` environment variable

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes)
   - Note down your service URL (e.g., `https://digit-ai-backend.onrender.com`)

### Step 3: Test Backend

Your backend will be available at:
- Health check: `https://your-app-name.onrender.com/health`
- API endpoint: `https://your-app-name.onrender.com/predict`

## Frontend Deployment on Netlify

### Step 1: Prepare Frontend for Netlify

1. **Create Environment File for Local Development**
   Create `frontend/.env.local` with:
   ```
   VITE_API_URL=http://localhost:5000
   ```

2. **Build Configuration**
   Your `package.json` already has the correct build script: `"build": "vite build"`

### Step 2: Deploy to Netlify

1. **Go to Netlify Dashboard**
   - Visit [netlify.com](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"

2. **Connect Repository**
   - Connect your GitHub account
   - Select your Digit-AI repository

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

4. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-render-app-name.onrender.com`
   - Replace `your-render-app-name` with your actual Render service name

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete (2-3 minutes)
   - Your site will be available at a Netlify URL

### Step 3: Custom Domain (Optional)

- In Netlify dashboard, go to Domain settings
- Add your custom domain if you have one

## Local Development Setup

### Backend (Local)
```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```
Backend will run on `http://localhost:5000`

### Frontend (Local)
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:8080`

### Environment Variables for Local Development

Create `frontend/.env.local`:
```
VITE_API_URL=http://localhost:5000
```

**Note**: Both local development and production now use port 5000 by default, which ensures consistency.

## Testing Your Deployment

### Local Testing
1. Start backend: `cd backend && python app.py`
2. Start frontend: `cd frontend && npm run dev`
3. Open `http://localhost:8080`
4. Test digit recognition functionality

### Production Testing
1. Visit your Netlify URL
2. Test digit recognition functionality
3. Check browser developer tools for any API errors

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Backend already has `CORS(app)` configured
   - Should work out of the box

2. **API Connection Issues**
   - Verify `VITE_API_URL` is set correctly in Netlify
   - Check Render service is running and accessible

3. **Build Failures**
   - Check that all dependencies are in `requirements.txt`
   - Verify Node.js version compatibility

4. **Slow First Request (Render)**
   - Render free tier spins down after inactivity
   - First request after inactivity may take 30+ seconds
   - This is normal for free tier

### Render Free Tier Limitations
- Services sleep after 15 minutes of inactivity
- 750 hours per month limit
- Cold start delays (30+ seconds for first request)

### Netlify Free Tier
- 100GB bandwidth per month
- 300 build minutes per month
- Custom domains supported

## Environment Variables Summary

### Backend (Render)
- `PORT`: Automatically set by Render (no action needed)

### Frontend (Netlify)
- `VITE_API_URL`: Set to your Render service URL
  - Local: `http://localhost:5000`
  - Production: `https://your-render-app-name.onrender.com`

## File Structure After Deployment

```
Digit-AI/
├── backend/
│   ├── app.py (updated with PORT env var)
│   ├── requirements.txt
│   └── mnist_cnn.keras
├── frontend/
│   ├── .env.local (create this for local dev)
│   ├── package.json
│   └── src/
└── DEPLOYMENT_GUIDE.md (this file)
```

## Next Steps

1. Deploy backend to Render
2. Deploy frontend to Netlify
3. Test both local and production environments
4. Share your live application URL!

Your application will work seamlessly in both local development and production environments with the configurations provided.
