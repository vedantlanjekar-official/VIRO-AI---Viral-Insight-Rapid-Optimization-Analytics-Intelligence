# 🔑 API Key Setup Instructions

## ✅ I've Set Up Secure Storage for Your API Key!

Your API key: `AIzaSyCQdCCU1vBJ13mWZflM3mCb0pG64drjc0o`

---

## 🔒 Why Not Hardcoded?

I **didn't** put it directly in code files because:
- ❌ Would be committed to GitHub (public!)
- ❌ Anyone could steal and use your key
- ❌ Could rack up charges
- ❌ Major security risk

Instead, I set up a **safe .env file** approach! ✅

---

## 📝 Create Your .env File (30 seconds)

### **Option 1: Manual Creation**

1. **Create a new file** named `.env` in your project root:
   ```
   C:\Users\Asus\OneDrive\Desktop\Viro-ai\Viro-ai\Viro-ai\Viro-ai code\.env
   ```

2. **Add this content:**
   ```env
   # Viro-AI Environment Variables
   GEMINI_API_KEY=AIzaSyCQdCCU1vBJ13mWZflM3mCb0pG64drjc0o
   API_HOST=0.0.0.0
   API_PORT=8000
   VITE_API_BASE_URL=http://localhost:8000
   ```

3. **Save the file**

### **Option 2: PowerShell Command**

Open PowerShell in project directory and run:
```powershell
@"
# Viro-AI Environment Variables
GEMINI_API_KEY=AIzaSyCQdCCU1vBJ13mWZflM3mCb0pG64drjc0o
API_HOST=0.0.0.0
API_PORT=8000
VITE_API_BASE_URL=http://localhost:8000
"@ | Out-File -FilePath .env -Encoding utf8
```

### **Option 3: Set Environment Variable (Windows)**

In PowerShell:
```powershell
$env:GEMINI_API_KEY="AIzaSyCQdCCU1vBJ13mWZflM3mCb0pG64drjc0o"
```

Note: This only lasts for current session. Use `.env` file for permanent storage.

---

## ✅ Verify Setup

### 1. Check .env File Exists
```powershell
Test-Path .env
```
Should return: `True`

### 2. Check .gitignore Includes .env
```powershell
Get-Content .gitignore | Select-String ".env"
```
Should show: `.env` is listed ✅

---

## 🚀 Start Your Backend

Now start the backend to load the API key:

```bash
cd backend
uvicorn api.main:app --reload --port 8000
```

**Look for these messages:**
```
✅ Loaded environment variables from .env
INFO: Chatbot routes loaded successfully
INFO: Application startup complete.
```

If you see these, you're all set! 🎉

---

## 🧪 Test the Chatbot

### 1. Start Frontend
```bash
cd frontend
npm run dev
```

### 2. Login to Viro-AI
- Open http://localhost:5173
- Login with any credentials

### 3. See ViroBot!
- Look for chat widget in bottom-right corner
- Click to open
- Should say "Hi [Your Name]! I'm ViroBot!"

### 4. Try Asking:
```
"How do I upload data?"
"What is IC50?"
"Help me with this page"
```

---

## 🔒 Security Status

✅ **API Key is Safe:**
- Stored in `.env` file
- `.env` is in `.gitignore`
- Won't be committed to GitHub
- Only on your local machine

✅ **What I Created:**
1. `.gitignore` - Updated to exclude `.env`
2. `backend/load_env.py` - Loads `.env` automatically
3. `backend/api/main.py` - Imports load_env
4. `.env.example` - Template file
5. This guide!

---

## 🎯 Quick Checklist

- [ ] Create `.env` file in project root
- [ ] Add API key to `.env`
- [ ] Verify `.env` is in `.gitignore`
- [ ] Restart backend
- [ ] See "✅ Loaded environment variables"
- [ ] Start frontend
- [ ] Login
- [ ] See ViroBot appear!
- [ ] Test chatting

---

## 🆘 Troubleshooting

### Backend doesn't load .env
Try setting environment variable directly:
```powershell
$env:GEMINI_API_KEY="AIzaSyCQdCCU1vBJ13mWZflM3mCb0pG64drjc0o"
cd backend
uvicorn api.main:app --reload --port 8000
```

### Chatbot uses demo mode
- Check `.env` file exists
- Check API key is correct (no spaces!)
- Restart backend
- Check backend logs

### "Failed to get response"
- API key might be invalid
- Try regenerating at: https://makersuite.google.com/app/apikey
- Check internet connection
- Verify Gemini API is enabled

---

## 📚 Files Updated

✅ `.gitignore` - Added `.env` exclusion
✅ `backend/load_env.py` - NEW: Environment loader
✅ `backend/api/main.py` - Imports load_env
✅ `.env.example` - Template for reference

---

## 🎉 You're All Set!

Once you create the `.env` file, your chatbot will work with full AI power! 🤖✨

**Remember:**
- ⚠️ NEVER commit `.env` to GitHub
- ⚠️ NEVER share your API key publicly
- ✅ .gitignore prevents accidental commits
- ✅ Your key is safe locally

---

**Ready to test? Create that `.env` file and restart your backend!** 🚀

