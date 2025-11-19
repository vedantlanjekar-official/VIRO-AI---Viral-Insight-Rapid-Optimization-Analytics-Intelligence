# ⚡ ViroBot AI Chatbot - Quick Start

## 🎯 What is ViroBot?

An AI assistant that helps users:
- 🧬 Understand viral analysis
- 📊 Interpret results
- 💊 Learn about drugs
- 🔬 Explain biology terms
- 🚀 Get started quickly

## 🚀 Setup in 5 Minutes

### Step 1: Get API Key (2 minutes)
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Get API Key" → "Create API Key"
3. Copy the key

### Step 2: Set Environment Variable (1 minute)

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="paste_your_key_here"
```

**Linux/Mac:**
```bash
export GEMINI_API_KEY="paste_your_key_here"
```

### Step 3: Install Package (1 minute)
```bash
pip install google-generativeai
```

### Step 4: Restart Backend (1 minute)
```bash
cd backend
uvicorn api.main:app --reload --port 8000
```

Look for: `INFO: Chatbot routes loaded successfully` ✅

### Step 5: Test It! (1 minute)
```bash
cd frontend
npm run dev
```

1. Open http://localhost:5173
2. Login (any email/password)
3. ViroBot appears in bottom-right! 🤖
4. Click and start chatting!

---

## 💡 Test Without API Key (Demo Mode)

Don't have an API key yet? No problem!

ViroBot works in **demo mode** with pre-programmed responses:

1. Skip Step 1 & 2 (no API key needed)
2. Just install and restart backend
3. ViroBot works instantly!
4. Uses keyword-based responses
5. Good for testing UI

---

## 🎯 Quick Test Commands

Try these in the chat:

```
"How do I upload data?"
"What is IC50?"
"Help me understand results"
"What are the top drugs?"
"Explain binding affinity"
```

---

## 🎨 What You'll See

### When You Login
```
┌─────────────────────────────────┐
│ 🤖 ViroBot AI                   │ [minimize] [close]
├─────────────────────────────────┤
│                                 │
│ 👋 Hi John! I'm ViroBot!       │
│                                 │
│ What would you like to do       │
│ today?                          │
│                                 │
│ I can help with:                │
│ • 🧬 Analyzing viruses          │
│ • 📊 Understanding results      │
│ • 💊 Drug candidates            │
│                                 │
├─────────────────────────────────┤
│ [Help] [Summarize] [Explain]    │
├─────────────────────────────────┤
│ Ask me anything... [Send 📤]    │
└─────────────────────────────────┘
```

---

## 📁 Files Created

```
✅ backend/services/gemini_service.py     (AI logic)
✅ backend/api/chatbot.py                 (API endpoints)
✅ frontend/src/components/AIChatbot.jsx  (Chat UI)
✅ AI_CHATBOT_SETUP.md                    (Full guide)
✅ CHATBOT_FEATURE_SUMMARY.md             (Details)
✅ CHATBOT_QUICKSTART.md                  (This file)
```

---

## ✅ Verification

Chatbot working if you see:

- ✅ Floating button in bottom-right
- ✅ Green pulse indicator
- ✅ Opens when clicked
- ✅ Welcome message appears
- ✅ Can type and send messages
- ✅ AI responds within 5 seconds

---

## 🐛 Troubleshooting

**Chatbot doesn't appear?**
- Check you're logged in
- Open browser console (F12)
- Look for errors

**Backend error?**
- Restart with: `uvicorn api.main:app --reload`
- Check terminal for errors
- Try demo mode (no API key)

**Slow responses?**
- Normal! Gemini takes 2-5 seconds
- Demo mode is instant
- Check internet connection

**API key not working?**
- Verify key is correct
- Try generating new key
- Check Google AI Studio for issues

---

## 🎊 Done!

ViroBot is now helping your users! 🚀

**Next Steps:**
- Read full docs: `AI_CHATBOT_SETUP.md`
- See all features: `CHATBOT_FEATURE_SUMMARY.md`
- Customize as needed

---

**Questions?**
- Check `AI_CHATBOT_SETUP.md` for detailed guide
- Test in demo mode first
- Experiment with different questions

**Enjoy your AI assistant!** 🤖✨

