# ⚡ Viro-AI Frontend - Quick Start Guide

## 🚀 Get Running in 3 Minutes!

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Go to: **http://localhost:5173**

---

## 🎯 What You'll See

### 1. Landing Page (/)
Beautiful homepage with:
- Hero section
- 6 feature cards
- How it works
- 3 virus project cards
- **Click "Get Started" or "Login"**

### 2. Login (/login)
**Demo Mode Active!**
- Email: `demo@viroai.com` (or any email)
- Password: `password` (or any password)
- Click "Sign In"

### 3. Dashboard (/dashboard)
After login, you'll see:
- **File upload zone** (drag & drop)
- **Virus selector** (SARS-CoV-2, Influenza, Ebola)
- **Quick Screen buttons** → Try this first!

### 4. Run Your First Analysis
**Easiest way:**
1. Click "Quick Screen" button on any virus card
2. Wait 2 seconds
3. Results appear automatically!

**OR Full Analysis:**
1. Select virus from dropdown
2. (Optional) Upload a file
3. Click "Start Full Analysis"

### 5. View Results (/results)
See all **7 comprehensive sections:**
1. 🧬 Mutation Prediction
2. ⚠️ Deadliness Score
3. 💊 Clinical Symptoms
4. 💉 Top Drug Candidates
5. 📦 3D Visualization
6. 🧪 AI Modifications
7. ✅ Recommendations

**Actions:**
- Export PDF
- Export CSV
- Export JSON
- Share results
- Save to history

### 6. View History (/history)
Click "History" in header:
- See all past predictions
- Search and filter
- Download results
- Delete predictions

---

## 🎨 Theme

As requested:
- ✅ White backgrounds
- ✅ Blue borders on everything
- ✅ Grey/white cards
- ✅ DNA pattern decorations

---

## 🔧 Troubleshooting

### "Cannot connect to API"
Make sure backend is running:
```bash
cd backend
uvicorn api.main:app --reload --port 8000
```

### "Module not found"
Reinstall dependencies:
```bash
npm install
```

### "Styles not loading"
Restart server:
```bash
npm run dev
```

---

## 📱 Features

- ✅ Beautiful landing page
- ✅ Authentication (demo mode)
- ✅ File upload (drag & drop)
- ✅ Virus analysis
- ✅ 7-section results
- ✅ Export to PDF/CSV/JSON
- ✅ Prediction history
- ✅ Search & filter
- ✅ Fully responsive
- ✅ Error handling
- ✅ Loading states

---

## 📚 Documentation

- **COMPLETE_FRONTEND_SUMMARY.md** - Full overview
- **FRONTEND_INSTALLATION_GUIDE.md** - Detailed guide
- **FRONTEND_SETUP.md** - Technical details

---

## 🎉 You're Ready!

The complete frontend is installed and ready to use!

**Have fun analyzing viruses! 🧬💊**


