# Viro-AI Frontend - Setup Guide

Complete step-by-step guide to get the frontend running.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 16+** installed ([Download](https://nodejs.org/))
- ✅ **npm** (comes with Node.js) or **yarn**
- ✅ **Backend API** running on `http://localhost:8000`
- ✅ A modern web browser (Chrome, Firefox, Safari, Edge)

### Check Your Installation

```bash
# Check Node.js version (should be 16+)
node --version

# Check npm version
npm --version
```

## 🚀 Installation Steps

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

If you're in the project root, the full path is:
```bash
cd "C:\Users\Asus\OneDrive\Desktop\Viro-ai\Viro-ai\Viro-ai\Viro-ai code\frontend"
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- React and React DOM
- Vite (build tool)
- Tailwind CSS (styling)
- Chart.js (visualizations)
- Axios (API calls)
- Lucide React (icons)
- React Hot Toast (notifications)

**Expected time:** 1-3 minutes depending on your internet connection.

### Step 3: Start Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Step 4: Open in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

🎉 **You should now see the Viro-AI frontend!**

## ✅ Verification Checklist

### 1. Check API Connection

At the top right of the page, you should see:
- **Green dot** with "API Connected" if backend is running
- **Red dot** with "API Offline" if backend is not running

### 2. If API is Offline

**Start the backend first:**

Open a **NEW terminal** (keep frontend running) and:

```bash
# Navigate to project root
cd "C:\Users\Asus\OneDrive\Desktop\Viro-ai\Viro-ai\Viro-ai\Viro-ai code"

# Start backend
python backend/api/main.py
```

Wait for:
```
VIRO-AI API READY!
API: http://0.0.0.0:8000
```

Then refresh your browser. The connection should turn green.

### 3. Test the Dashboard

- You should see 3 virus cards (SARS-CoV-2, Influenza, Ebola)
- Each card shows a deadliness score
- Click "Quick Screen" button on any virus
- Results should appear in 1-2 seconds

### 4. Test Prediction

- Click the "Prediction" tab
- Select "SARS-CoV-2" from dropdown
- Select a protein (e.g., "6VXX")
- Click "Run Prediction"
- Wait for results (should take 1-2 seconds)
- Results tab should show ranked drugs

## 🎯 Quick Test Workflow

### Complete End-to-End Test

1. **Start Backend** (if not running):
   ```bash
   python backend/api/main.py
   ```

2. **Start Frontend** (in new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser**: `http://localhost:3000`

4. **Run Quick Test**:
   - Click "Quick Screen" on SARS-CoV-2 card
   - Wait for results
   - Check that you see 10 ranked drugs
   - Click "Details" on any drug
   - Verify drug information modal appears

5. **Test Export**:
   - Click "JSON" or "CSV" button in results
   - Verify file downloads

✅ **If all tests pass, your setup is complete!**

## 🛠️ Troubleshooting

### Issue 1: Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or change port in vite.config.js
server: {
  port: 3001  // Change to different port
}
```

### Issue 2: Module Not Found

**Error:** `Cannot find module 'react'`

**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: API Connection Failed

**Error:** "Unable to connect to server"

**Checklist:**
- ✅ Is backend running? Check `http://localhost:8000/health`
- ✅ Is backend on port 8000? Check terminal output
- ✅ Is CORS enabled in backend? Check `main.py`
- ✅ Firewall blocking? Temporarily disable

**Test backend directly:**
```bash
curl http://localhost:8000/health
```

Should return:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "drugs_loaded": true
}
```

### Issue 4: Charts Not Showing

**Error:** Charts appear blank

**Solution:**
```bash
# Reinstall chart dependencies
npm install chart.js react-chartjs-2 --force
```

### Issue 5: Tailwind Styles Not Working

**Error:** No styling or broken layout

**Solution:**
```bash
# Rebuild Tailwind
npm run dev
# Or clear cache
rm -rf node_modules/.vite
npm run dev
```

## 📦 Build for Production

### Create Optimized Build

```bash
npm run build
```

Output will be in `dist/` directory.

### Test Production Build

```bash
npm run preview
```

Opens at `http://localhost:4173`

### File Sizes

Typical production build:
- `index.html`: ~1 KB
- `assets/*.js`: ~200-300 KB (gzipped)
- `assets/*.css`: ~10-20 KB (gzipped)

## 🌐 Deployment Options

### Option 1: Static Hosting (Netlify)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Build and deploy
vercel --prod
```

### Option 3: GitHub Pages

1. Build: `npm run build`
2. Push `dist/` to `gh-pages` branch
3. Enable GitHub Pages in repo settings

### Option 4: Docker

```bash
# Build image
docker build -t viroai-frontend .

# Run container
docker run -p 3000:3000 viroai-frontend
```

## 🔄 Development Workflow

### Typical Development Session

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   python backend/api/main.py

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

2. **Make changes** to any `.jsx` or `.css` file

3. **See instant updates** in browser (HMR)

4. **Test changes** by interacting with UI

5. **Check console** for errors (F12 in browser)

### Hot Reload

Vite provides instant hot module replacement:
- Component changes → Instant update
- CSS changes → Instant update
- Config changes → Full reload

## 📊 Performance Tips

### Faster Development

```bash
# Use yarn instead of npm (faster)
yarn install
yarn dev
```

### Reduce Bundle Size

In `vite.config.js`:
```javascript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor': ['react', 'react-dom'],
        'charts': ['chart.js', 'react-chartjs-2']
      }
    }
  }
}
```

## 🎓 Next Steps

Once setup is complete:

1. ✅ **Explore Dashboard** - Try quick screening for all viruses
2. ✅ **Run Predictions** - Test different proteins and parameters
3. ✅ **View Results** - Examine charts and drug details
4. ✅ **Export Data** - Download results as JSON/CSV
5. ✅ **Customize** - Modify colors, add features, etc.

## 📚 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build

# Maintenance
npm install          # Install dependencies
npm update           # Update packages
npm audit fix        # Fix vulnerabilities

# Cleaning
rm -rf node_modules  # Remove dependencies
rm -rf dist          # Remove build output
```

## 💡 Pro Tips

1. **Keep Backend Running**: Start backend first, then frontend
2. **Use Browser DevTools**: Press F12 to debug
3. **Check Network Tab**: Monitor API calls and responses
4. **React DevTools**: Install browser extension for component inspection
5. **Save Work**: Changes auto-save, but git commit regularly

## 🆘 Getting Help

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review error messages** in terminal and browser console
3. **Verify prerequisites** (Node.js version, backend running)
4. **Clear cache** and reinstall dependencies
5. **Check API documentation** in backend folder

## ✨ You're Ready!

Your Viro-AI frontend should now be running perfectly. Enjoy exploring drug-virus binding predictions! 🧬💊

---

**Need help?** Contact: sairajjadhav433@gmail.com

