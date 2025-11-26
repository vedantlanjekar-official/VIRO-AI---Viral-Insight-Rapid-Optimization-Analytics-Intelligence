"""
Chatbot API Endpoints
FastAPI routes for Gemini AI chatbot
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, Dict, List
import sys
import os

# Add parent directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../..'))

try:
    from backend.services.gemini_service import GeminiChatbot
except ImportError:
    from services.gemini_service import GeminiChatbot

# Create router
router = APIRouter(prefix="/chatbot", tags=["chatbot"])

# Initialize chatbot (will be created per session in production)
chatbot_sessions: Dict[str, GeminiChatbot] = {}


# Pydantic models
class ChatMessage(BaseModel):
    message: str = Field(..., description="User's message")
    context: Optional[Dict] = Field(None, description="Context information (page, results, etc.)")
    session_id: str = Field(..., description="User session ID")


class ChatResponse(BaseModel):
    response: str = Field(..., description="AI assistant's response")
    session_id: str


class WelcomeRequest(BaseModel):
    user_name: str = Field("User", description="User's name")
    session_id: str = Field(..., description="User session ID")


class SummarizeRequest(BaseModel):
    results: Dict = Field(..., description="Analysis results to summarize")
    session_id: str = Field(..., description="User session ID")


class ExplainTermRequest(BaseModel):
    term: str = Field(..., description="Term to explain")
    session_id: str = Field(..., description="User session ID")


class PageHelpRequest(BaseModel):
    page: str = Field(..., description="Current page name")
    session_id: str = Field(..., description="User session ID")


# Helper function to get or create chatbot session
def get_chatbot_session(session_id: str) -> GeminiChatbot:
    """Get existing chatbot session or create new one"""
    if session_id not in chatbot_sessions:
        try:
            chatbot_sessions[session_id] = GeminiChatbot()
        except ValueError as e:
            # If no API key, create demo chatbot
            chatbot_sessions[session_id] = DemoChatbot()
    return chatbot_sessions[session_id]


# Demo chatbot for when Gemini API is not available
class DemoChatbot:
    """Demo chatbot that provides static responses"""
    
    def __init__(self):
        self.chat_history = []
    
    def start_conversation(self, user_name: str = "User") -> str:
        return f"""
        👋 Hi {user_name}! I'm ViroBot, your AI assistant!
        
        (Demo Mode: Using pre-programmed responses)
        
        What would you like to do today?
        
        I can help you with:
        • 🧬 Understanding viral analysis
        • 📊 Interpreting results
        • 💊 Explaining drug candidates
        • 🔬 Defining biological terms
        
        Ask me anything about Viro-AI!
        """
    
    async def get_response(self, user_message: str, context: Optional[Dict] = None) -> str:
        msg_lower = user_message.lower()
        
        # Keyword-based responses
        if any(word in msg_lower for word in ['hello', 'hi', 'hey']):
            return "Hello! 👋 How can I help you with your viral analysis today?"
        
        elif any(word in msg_lower for word in ['help', 'how', 'what']):
            return """
            I can help you with:
            
            1. 📊 **Data Upload**: Upload CSV, FASTA, or JSON files
            2. 🧬 **Analysis**: Run quick or full viral analysis
            3. 📈 **Results**: Understand your 7-section report
            4. 💊 **Drugs**: Learn about top drug candidates
            5. 🔬 **Terms**: Explain biological terminology
            
            What specific area would you like help with?
            """
        
        elif 'upload' in msg_lower or 'file' in msg_lower:
            return """
            📁 **File Upload Guide**:
            
            1. Go to the Dashboard
            2. Drag & drop your file or click "Choose File"
            3. Supported formats: CSV, FASTA, JSON, TXT
            4. Max size: 10MB
            5. Select your virus type
            6. Click "Start Full Analysis"
            
            Need help with a specific file type? 🤔
            """
        
        elif 'result' in msg_lower or 'output' in msg_lower:
            return """
            📊 **Understanding Results**:
            
            Your analysis has 7 sections:
            
            1. 🧬 **Mutation Prediction** - Future variants
            2. ⚠️ **Deadliness Score** - Risk assessment (0-100)
            3. 💊 **Symptoms** - Clinical predictions
            4. 💉 **Top Drugs** - Best candidates ranked
            5. 📦 **3D Visualization** - Molecular binding
            6. 🧪 **AI Modifications** - Drug improvements
            7. ✅ **Recommendations** - Action items
            
            Which section would you like explained? 📖
            """
        
        elif 'drug' in msg_lower or 'candidate' in msg_lower:
            return """
            💊 **About Drug Candidates**:
            
            We screen 190+ antiviral compounds and rank them by:
            • **Binding Affinity** (0-1 score)
            • **IC50** (lower = better)
            • **Confidence** (prediction reliability)
            
            Top drugs show strongest binding to virus proteins!
            
            Want details on a specific drug? 💉
            """
        
        elif any(term in msg_lower for term in ['ic50', 'binding', 'affinity']):
            return """
            🔬 **Key Terms**:
            
            • **IC50**: Drug concentration needed to block 50% of virus. Lower is better!
            • **Binding Affinity**: How strongly drug attaches (0-1 score). Higher is better!
            • **Confidence**: How sure we are about prediction (85-95%)
            
            These help us find the most effective drugs! 🎯
            """
        
        else:
            return """
            I'm here to help! 😊
            
            Try asking:
            • "How do I upload data?"
            • "What does IC50 mean?"
            • "Help me understand results"
            • "What are the top drugs?"
            
            Or tell me what you need assistance with!
            """
    
    def summarize_results(self, results: Dict) -> str:
        virus = results.get('virus', 'Unknown')
        score = results.get('deadliness_score', {}).get('overall_score', 0)
        risk = results.get('deadliness_score', {}).get('risk_level', 'Unknown')
        
        return f"""
        📊 **Results Summary for {virus}**:
        
        • **Deadliness**: {score}/100 ({risk})
        • **Top Drug**: {results.get('top_candidates', [{}])[0].get('drug_name', 'N/A')} ⭐
        • **Analysis**: Complete with 7 detailed sections
        
        Your results show {'high' if score >= 70 else 'moderate' if score >= 50 else 'low'} risk.
        Review the drug rankings to find treatment options! 💊
        """
    
    def explain_term(self, term: str) -> str:
        from backend.services.gemini_service import BIOLOGICAL_TERMS
        explanation = BIOLOGICAL_TERMS.get(term, None)
        if explanation:
            return f"📖 **{term}**: {explanation}"
        return f"🔍 '{term}' - I can explain common terms like IC50, Binding Affinity, SARS-CoV-2, Spike Protein, and more! What would you like to know?"
    
    def get_help_for_page(self, page: str) -> str:
        help_map = {
            'dashboard': '📊 Upload data, select virus, click "Quick Screen" or "Start Full Analysis"',
            'results': '📈 View 7 sections: mutations, scores, symptoms, drugs, 3D view, modifications, recommendations',
            'history': '📜 View past analyses, search, filter, download results',
            'login': '🔐 Demo mode: use any email/password to login'
        }
        return help_map.get(page, '💡 Ask me anything about Viro-AI!')
    
    def clear_history(self):
        self.chat_history = []
    
    def get_conversation_history(self) -> List[Dict]:
        return self.chat_history


# API Endpoints
@router.post("/welcome", response_model=ChatResponse)
async def welcome_message(request: WelcomeRequest):
    """Get welcome message when user logs in"""
    try:
        chatbot = get_chatbot_session(request.session_id)
        welcome = chatbot.start_conversation(request.user_name)
        return ChatResponse(response=welcome, session_id=request.session_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to start conversation: {str(e)}"
        )


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatMessage):
    """Send message to chatbot and get response"""
    try:
        chatbot = get_chatbot_session(request.session_id)
        response = await chatbot.get_response(request.message, request.context)
        return ChatResponse(response=response, session_id=request.session_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Chat failed: {str(e)}"
        )


@router.post("/summarize", response_model=ChatResponse)
async def summarize_results(request: SummarizeRequest):
    """Summarize analysis results"""
    try:
        chatbot = get_chatbot_session(request.session_id)
        summary = chatbot.summarize_results(request.results)
        return ChatResponse(response=summary, session_id=request.session_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Summarization failed: {str(e)}"
        )


@router.post("/explain", response_model=ChatResponse)
async def explain_term(request: ExplainTermRequest):
    """Explain a biological term"""
    try:
        chatbot = get_chatbot_session(request.session_id)
        explanation = chatbot.explain_term(request.term)
        return ChatResponse(response=explanation, session_id=request.session_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Explanation failed: {str(e)}"
        )


@router.post("/help", response_model=ChatResponse)
async def page_help(request: PageHelpRequest):
    """Get help for current page"""
    try:
        chatbot = get_chatbot_session(request.session_id)
        help_text = chatbot.get_help_for_page(request.page)
        return ChatResponse(response=help_text, session_id=request.session_id)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Help request failed: {str(e)}"
        )


@router.delete("/session/{session_id}")
async def clear_session(session_id: str):
    """Clear chatbot session"""
    if session_id in chatbot_sessions:
        chatbot_sessions[session_id].clear_history()
        del chatbot_sessions[session_id]
    return {"message": "Session cleared"}


@router.get("/health")
async def chatbot_health():
    """Check chatbot service health"""
    return {
        "status": "healthy",
        "active_sessions": len(chatbot_sessions),
        "gemini_available": os.getenv('GEMINI_API_KEY') is not None
    }

