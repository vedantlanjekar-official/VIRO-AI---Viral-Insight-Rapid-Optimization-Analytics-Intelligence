# 🧪 Test ViroBot - Step by Step Guide

## ✅ Issues Fixed!

1. ✅ **Clear chat button added** (🗑️ trash icon)
2. ✅ **Better error messages** (shows exact problem)
3. ✅ **API key configured** (in .env file)
4. ✅ **Close button working** (✕ X icon)

---

## 🚀 Start Testing (3 Commands)

### Step 1: Start Backend
```bash
cd backend
uvicorn api.main:app --reload --port 8000
```

**You MUST see these messages:**
```
✅ Loaded environment variables from .env
INFO: Chatbot routes loaded successfully
INFO: Application startup complete.
```

If you don't see "✅ Loaded environment variables":
- Run `SETUP_CHATBOT.bat` again
- Check `.env` file exists

---

### Step 2: Start Frontend
```bash
cd frontend
npm run dev
```

**Should see:**
```
VITE v5.4.20  ready in XXXms
➜  Local:   http://localhost:3001/
```

---

### Step 3: Test ViroBot!

1. **Open** http://localhost:3001 (or 5173)
2. **Click** "Get Started" or "Login"
3. **Login** with:
   - Email: `demo@viroai.com`
   - Password: `password`
4. **Wait 1 second** → ViroBot appears! 🤖

---

## 🎯 Visual Test Guide

### **What You Should See:**

#### **1. Chatbot Button Appears**
```
                              ┌─────┐
                              │ 🤖  │ ← Bottom-right corner
                              │(•)  │    Green pulse
                              └─────┘
```

#### **2. Click Button → Chat Opens**
```
┌──────────────────────────────────────────┐
│ 🤖 ViroBot AI      [🗑️][🔄][➖][✕]     │ ← Header with 4 buttons
├──────────────────────────────────────────┤
│                                          │
│  👋 Hi! I'm ViroBot, your AI assistant! │
│  What would you like to do today?       │
│                                          │
│  I can help with:                        │
│  • 🧬 Analyzing viruses                  │
│  • 📊 Understanding results              │
│  • 💊 Finding drug candidates            │
│  • 🔬 Explaining terms                   │
│                                          │
│  Just ask me anything! 😊                │
│  10:30 AM                                │
│                                          │
├──────────────────────────────────────────┤
│ [🆘 Help] [📊 Summarize] [🔬 IC50]      │ ← Quick actions
├──────────────────────────────────────────┤
│ Ask me anything...               [📤]   │ ← Input
└──────────────────────────────────────────┘
```

---

## 🧪 Test Each Feature

### **Test 1: Send Message**
1. Type: `How do I upload data?`
2. Press **Enter** (or click 📤)
3. Loading spinner appears
4. ✅ AI responds in 2-5 seconds with instructions

### **Test 2: Clear Chat (🗑️)**
1. Click **trash icon** in header
2. Popup: "Clear all chat messages?"
3. Click **OK**
4. ✅ All messages cleared
5. ✅ New welcome message appears
6. ✅ Toast: "Chat cleared!"

### **Test 3: Refresh (🔄)**
1. Click **refresh icon** in header
2. ✅ Conversation restarts
3. ✅ New welcome message

### **Test 4: Minimize (➖)**
1. Click **minimize icon**
2. ✅ Chat shrinks to header only
3. Click minimize again
4. ✅ Chat expands

### **Test 5: Close (✕)**
1. Click **X icon** in header
2. ✅ Chatbot closes
3. ✅ Floating button appears
4. Click floating button
5. ✅ Chatbot reopens with messages

### **Test 6: Quick Actions**
1. Click **"Help with this page"** button
2. ✅ Get page-specific guidance
3. Click **"Explain IC50"** button
4. ✅ Get IC50 explanation

### **Test 7: Proactive Help**
1. Run a viral analysis
2. Go to results page
3. ✅ ViroBot pops up: "Your analysis is complete!"
4. Click **"Summarize results"** button
5. ✅ Get results summary

---

## 📸 Screenshot Checklist

Take screenshots to verify:

- [ ] Floating button in bottom-right corner
- [ ] Chat opens when clicked
- [ ] Welcome message displays
- [ ] Header has 4 buttons (🗑️ 🔄 ➖ ✕)
- [ ] Quick action buttons visible
- [ ] Can type and send messages
- [ ] AI responses appear
- [ ] Clear button works
- [ ] Close button works

---

## ✅ Expected Results

### **Working Properly:**

**Opening:**
- ✅ Button appears bottom-right
- ✅ Click opens chat window
- ✅ Welcome message shows

**Chatting:**
- ✅ Type message works
- ✅ Enter sends message
- ✅ Loading spinner shows
- ✅ AI responds (2-5 sec)
- ✅ Response is helpful

**Controls:**
- ✅ Clear (🗑️) → Confirms → Clears
- ✅ Refresh (🔄) → Restarts
- ✅ Minimize (➖) → Shrinks
- ✅ Close (✕) → Closes

**Quick Actions:**
- ✅ Help button → Page help
- ✅ Summarize → Results summary
- ✅ Explain → Term definition

---

## 🐛 If You See Errors

### **Error: "I had trouble processing that"**

**Check backend terminal:**
```
Look for errors after sending message
Common: "GEMINI_API_KEY not found"
```

**Fix:** Restart backend to load .env
```bash
cd backend
uvicorn api.main:app --reload --port 8000
```

### **Error: "Cannot connect to backend"**

**Fix:** Make sure backend is running
```bash
cd backend
uvicorn api.main:app --reload --port 8000
```

Should see:
```
INFO: Uvicorn running on http://0.0.0.0:8000
```

### **Chatbot doesn't appear**

**Check:**
1. Are you logged in?
2. Is frontend running?
3. Check browser console (F12)
4. Look for errors

**Fix:** Refresh page or re-login

---

## 📊 Performance

### **Response Times:**

| Action | Expected Time |
|--------|--------------|
| Open chat | < 1 second |
| Welcome message | Instant |
| Send message | 2-5 seconds (Gemini API) |
| Quick actions | 2-5 seconds |
| Clear chat | Instant |
| Close chat | Instant |

**Note:** First response may take longer (5-10 sec) as Gemini initializes.

---

## 🎯 Demo vs Real AI

### **With API Key (Real AI):**
- ✅ Smart, contextual responses
- ✅ Understands complex questions
- ✅ Natural conversation
- ⏱️ Takes 2-5 seconds

### **Without API Key (Demo Mode):**
- ✅ Pre-programmed responses
- ✅ Keyword matching
- ✅ Works instantly
- ⚠️ Less intelligent

**Current:** You have Real AI (API key configured)! 🎉

---

## 💡 Try These Questions

Good questions to test:

```
"How do I upload a virus sequence?"
"What is IC50 and why is it important?"
"Explain my deadliness score"
"What are the top drug candidates?"
"How does binding affinity work?"
"What should I do with these results?"
"Help me understand this page"
"What is SARS-CoV-2?"
"Explain mutation prediction"
```

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ ViroBot appears on login
2. ✅ Welcome message is personalized
3. ✅ Responds to your questions
4. ✅ Answers are intelligent and helpful
5. ✅ All 4 header buttons work
6. ✅ Quick actions work
7. ✅ No error messages in chat
8. ✅ Backend logs show successful requests

---

## 🎊 You're Ready!

Everything is fixed and configured:
- ✅ Clear chat option added
- ✅ Close button working
- ✅ Better error messages
- ✅ API key configured
- ✅ All dependencies installed
- ✅ Routes loaded successfully

**Time to test ViroBot!** 🤖

---

## 📞 Quick Help

**If problems:**
1. Restart backend
2. Restart frontend
3. Clear browser cache
4. Check .env file exists
5. Read `CHATBOT_FIXES.md`

**If working:**
1. Enjoy chatting!
2. Test all features
3. Try different questions
4. Show to your team!

---

**Happy testing!** 🚀✨

**Remember:** Not pushed to GitHub yet - test first! 😊

