# 🤖 AI Chatbot Setup Guide - ViroBot

## 🎯 Overview

ViroBot is an intelligent AI assistant powered by Google's Gemini API that helps users:
- Understand how to use Viro-AI
- Upload and analyze virus data
- Interpret analysis results
- Explain biological terminology
- Summarize complex outputs

## ✨ Features

### 🎨 **Beautiful UI**
- Bottom-right chat widget
- Matches white/blue/grey theme
- Expandable/collapsible/minimizable
- Smooth animations

### 🧠 **Context-Aware**
- Knows what page you're on
- Understands your results
- Remembers conversation history
- Provides relevant suggestions

### ⚡ **Proactive Assistance**
- Welcome message on login
- Offers help when results are ready
- Quick action buttons
- Smart suggestions

### 💬 **Conversations**
- Natural language understanding
- Explains biological terms
- Summarizes results
- Page-specific help

---

## 🔧 Setup Instructions

### Step 1: Get Gemini API Key

1. **Go to Google AI Studio**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Get API Key"
   - Click "Create API Key"
   - Copy the generated key

3. **Keep it Safe!**
   - Don't share publicly
   - Don't commit to GitHub
   - Use environment variables

### Step 2: Configure Backend

1. **Create `.env` file** in project root:
```bash
# AI Chatbot Configuration
GEMINI_API_KEY=your_api_key_here
```

2. **Or set environment variable** (Windows):
```powershell
$env:GEMINI_API_KEY="your_api_key_here"
```

3. **Or set environment variable** (Linux/Mac):
```bash
export GEMINI_API_KEY="your_api_key_here"
```

### Step 3: Install Dependencies

```bash
pip install google-generativeai
```

Or install all dependencies:
```bash
pip install -r requirements.txt
```

### Step 4: Restart Backend

```bash
cd backend
uvicorn api.main:app --reload --port 8000
```

You should see:
```
INFO: Chatbot routes loaded successfully
```

### Step 5: Test the Chatbot

1. Start frontend: `cd frontend && npm run dev`
2. Login to the app
3. ViroBot should appear in bottom-right corner!
4. Click to open and start chatting

---

## 🎮 How to Use

### **On Login**
- ViroBot pops up automatically
- Greets you: "What will you do today?"
- Suggests how to get started

### **On Dashboard**
- Ask: "How do I upload data?"
- Ask: "Which virus should I analyze?"
- Click "Help with this page" button

### **When Results Ready**
- ViroBot proactively offers help
- Click "Summarize results" button
- Ask about specific findings

### **Anytime**
- Ask: "What is IC50?"
- Ask: "Explain binding affinity"
- Ask: "What does this deadliness score mean?"
- Ask: "How dangerous is this virus?"

---

## 💡 Example Conversations

### Example 1: Getting Started
```
User: How do I start?

ViroBot: 👋 Great question! Here's how to get started:

1. Go to Dashboard
2. Select a virus (SARS-CoV-2, Influenza, or Ebola)
3. Click "Quick Screen" for fast results
   OR
   Upload your data file and click "Start Full Analysis"

Need help with anything specific? 🚀
```

### Example 2: Understanding Results
```
User: What does my deadliness score mean?

ViroBot: Your virus has a deadliness score of 76/100, which is 
classified as HIGH RISK. 

This means:
• High transmissibility (spreads easily)
• Significant mortality risk
• Can evade immune system
• May resist vaccines

The top drug candidate (Nirmatrelvir) shows strong binding 
affinity of 0.94, which could help treat infections! 💊

Would you like me to explain any specific metrics?
```

### Example 3: Explaining Terms
```
User: What is IC50?

ViroBot: 📖 IC50 means "Inhibitory Concentration 50"

In simple terms: It's the amount of drug needed to block 50% 
of the virus activity.

Lower IC50 = Better! 👍
- 3.1 nM = Very strong drug
- 500 nM = Moderate drug
- 5 μM = Weaker drug

Your top drug has IC50 of 3.1 nM - that's excellent! ⭐
```

---

## 🔌 API Endpoints

### POST `/chatbot/welcome`
Get welcome message on login
```json
{
  "user_name": "John",
  "session_id": "session_12345"
}
```

### POST `/chatbot/chat`
Send message to chatbot
```json
{
  "message": "How do I upload data?",
  "context": {
    "page": "dashboard"
  },
  "session_id": "session_12345"
}
```

### POST `/chatbot/summarize`
Summarize analysis results
```json
{
  "results": { /* analysis results */ },
  "session_id": "session_12345"
}
```

### POST `/chatbot/explain`
Explain a biological term
```json
{
  "term": "IC50",
  "session_id": "session_12345"
}
```

### POST `/chatbot/help`
Get page-specific help
```json
{
  "page": "dashboard",
  "session_id": "session_12345"
}
```

---

## 🎨 UI Components

### Chat Window
- **Position**: Fixed bottom-right
- **Size**: 384px × 600px
- **Colors**: White background, blue borders
- **Header**: Gradient blue with ViroBot logo
- **Messages**: Alternating user/assistant bubbles
- **Input**: Multi-line textarea with send button

### Quick Actions
- "Help with this page"
- "Summarize results" (when available)
- "Explain IC50" (example term)

### States
- **Closed**: Floating button with pulse indicator
- **Open**: Full chat window
- **Minimized**: Header only (compact mode)
- **Loading**: Spinner animation

---

## 🧪 Demo Mode

If **no Gemini API key** is configured, ViroBot runs in demo mode:

- ✅ Still works!
- ✅ Uses pre-programmed responses
- ✅ Keyword-based answers
- ⚠️ Less intelligent than Gemini
- ⚠️ Can't understand complex questions

**Demo responses include:**
- How to upload files
- Understanding results
- Explaining IC50, binding affinity
- Page-specific help

---

## 🐛 Troubleshooting

### Chatbot doesn't appear
- Check you're logged in
- Check console for errors
- Verify backend is running

### "Failed to get response" error
- Check Gemini API key is set
- Verify API key is valid
- Check backend logs
- Try demo mode (remove API key)

### Chatbot is slow
- Gemini API can take 2-5 seconds
- Demo mode is instant
- Check internet connection

### API key not working
- Verify key is correct (no spaces)
- Check Google AI Studio for quota
- Try regenerating key
- Enable required APIs in Google Cloud

---

## 🔒 Security

### ⚠️ Important

- **Never** commit API key to GitHub
- **Always** use environment variables
- **Don't** expose key in frontend
- **Do** use `.env` for local development

### `.gitignore` Entry
```
# Environment
.env
.env.local
*.env
```

---

## 📊 Usage Limits

### Free Tier (Gemini API)
- **60 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**

### Tips to Stay Within Limits
- Implement caching
- Use demo mode for testing
- Rate limit requests
- Monitor usage in Google Cloud Console

---

## 🚀 Advanced Features

### Custom Responses
Edit `backend/services/gemini_service.py`:
```python
self.system_context = """
Your custom instructions here...
"""
```

### Add More Terms
Edit `BIOLOGICAL_TERMS` dictionary:
```python
BIOLOGICAL_TERMS = {
    'Your Term': 'Your explanation',
}
```

### Context Enhancement
Modify `get_contextual_prompt()` to add more context:
```python
if 'custom_data' in context:
    prompt_parts.append(f"Custom: {context['custom_data']}")
```

---

## 📚 Resources

- **Gemini API Docs**: https://ai.google.dev/tutorials/python_quickstart
- **Google AI Studio**: https://makersuite.google.com/
- **API Pricing**: https://ai.google.dev/pricing

---

## ✅ Checklist

Before deploying:
- [ ] Get Gemini API key
- [ ] Set environment variable
- [ ] Test chatbot in demo mode
- [ ] Test with real API
- [ ] Verify all features work
- [ ] Check API usage limits
- [ ] Add API key to production env

---

## 🎉 You're Done!

ViroBot is now ready to help your users! 🤖

**Test it:**
1. Login to Viro-AI
2. See ViroBot appear
3. Click to chat
4. Ask questions
5. Get helpful answers!

**Enjoy your AI-powered assistant!** ✨

