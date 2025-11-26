# 🚀 How to Start Viro-AI Frontend

## ✅ Error Fixed!

The error you saw happened because you ran `npm run dev` from the **root directory**, but it needs to run from the **frontend directory**.

---

## 🎯 3 Easy Ways to Start

### **Method 1: Using Batch File (EASIEST!)** ⭐
Just double-click this file:
```
START_FRONTEND.bat
```

This will:
- Navigate to the frontend folder
- Start the dev server
- Show you the URL

---

### **Method 2: Using PowerShell/CMD**
Open PowerShell or Command Prompt and run:

```bash
cd "C:\Users\Asus\OneDrive\Desktop\Viro-ai\Viro-ai\Viro-ai\Viro-ai code\frontend"
npm run dev
```

**Or in two steps:**
```bash
cd frontend
npm run dev
```

---

### **Method 3: Start Both Backend + Frontend** 🔥
Double-click this file to start everything:
```
START_BOTH.bat
```

This will open 2 windows:
- **Window 1:** Backend API (port 8000)
- **Window 2:** Frontend (port 5173)

---

## 📍 What the Error Meant

**❌ Wrong (caused error):**
```bash
C:\...\Viro-ai code> npm run dev
# Error: Cannot find package.json
```

**✅ Correct:**
```bash
C:\...\Viro-ai code> cd frontend
C:\...\Viro-ai code\frontend> npm run dev
# Success! Server starts
```

**Why?** The `package.json` file is in the `frontend` folder, not the root folder.

---

## 🌐 Access Your App

Once the server starts, you'll see:
```
  VITE v5.4.20  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Open your browser to:** http://localhost:5173

---

## 🛑 How to Stop the Server

Press `Ctrl + C` in the terminal/command window

---

## ⚡ Quick Commands Reference

| Action | Command |
|--------|---------|
| Navigate to frontend | `cd frontend` |
| Start dev server | `npm run dev` |
| Build for production | `npm run build` |
| Stop server | `Ctrl + C` |
| Install dependencies | `npm install` |

---

## 🔧 If You Still Get Errors

### Error: "Cannot find module"
**Fix:**
```bash
cd frontend
npm install
npm run dev
```

### Error: "Port 5173 already in use"
**Fix:** Kill the existing process or use a different port:
```bash
npm run dev -- --port 3000
```

### Error: "ENOENT package.json"
**Fix:** Make sure you're in the frontend directory:
```bash
cd frontend
pwd  # Check current directory
npm run dev
```

---

## ✅ Verification

The server is working if you see:
- ✅ "VITE ready in XXX ms"
- ✅ "Local: http://localhost:5173"
- ✅ No error messages

Open http://localhost:5173 and you should see the beautiful Viro-AI landing page!

---

## 🎉 You're All Set!

**Easiest way:** Just double-click `START_FRONTEND.bat`

**Or run manually:**
```bash
cd frontend
npm run dev
```

Then visit: **http://localhost:5173**

Happy analyzing! 🧬💊

