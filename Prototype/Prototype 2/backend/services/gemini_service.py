"""
Gemini AI Chatbot Service
Integrates Google's Gemini API for intelligent assistance in Viro-AI
"""

import os
import google.generativeai as genai
from typing import List, Dict, Optional
import json
import hashlib
from datetime import datetime, timedelta

class GeminiChatbot:
    """AI Chatbot powered by Google Gemini for Viro-AI assistance"""
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize Gemini chatbot
        
        Args:
            api_key: Google Gemini API key (defaults to env variable)
        """
        self.api_key = api_key or os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found. Please set it in environment variables.")
        
        # Configure Gemini
        genai.configure(api_key=self.api_key)
        
        # Configure for fastest response
        self.generation_config = {
            'temperature': 0.7,  # Lower = faster, more focused
            'top_p': 0.8,
            'top_k': 40,
            'max_output_tokens': 500,  # Limit response length for speed
            'candidate_count': 1,
        }
        
        # Initialize model (use gemini-1.5-flash for better performance)
        try:
            self.model = genai.GenerativeModel(
                'gemini-1.5-flash',
                generation_config=self.generation_config
            )
        except Exception:
            # Fallback to gemini-pro if flash is not available
            self.model = genai.GenerativeModel(
                'gemini-pro',
                generation_config=self.generation_config
            )
        
        # Optimized system context (shorter = faster)
        self.system_context = """You are ViroBot, an AI assistant for Viro-AI (viral analysis & drug discovery).
        
        Help users with: platform usage, virus analysis, results interpretation, and biological terms.
        Features: Mutation prediction, Deadliness scoring, Drug screening (190+ compounds).
        Viruses: SARS-CoV-2, Influenza, Ebola.
        
        Be concise, friendly, use emojis. Explain simply."""
        
        # Conversation history
        self.chat_history: List[Dict[str, str]] = []
        
        # Response cache for speed (stores recent responses for 5 minutes)
        self.response_cache: Dict[str, tuple] = {}  # {query_hash: (response, timestamp)}
    
    def start_conversation(self, user_name: str = "User") -> str:
        """
        Start a conversation with welcome message
        
        Args:
            user_name: User's name for personalization
            
        Returns:
            Welcome message
        """
        welcome_message = f"""
        👋 Hi {user_name}! I'm ViroBot, your AI assistant for viral analysis!
        
        What would you like to do today?
        
        I can help you with:
        • 🧬 Understanding how to analyze viruses
        • 📊 Uploading and processing data
        • 💊 Interpreting drug screening results
        • 🔬 Explaining biological terms
        • 📈 Summarizing analysis outputs
        
        Just ask me anything!
        """
        
        self.chat_history = []
        return welcome_message.strip()
    
    def get_contextual_prompt(self, 
                             user_message: str,
                             context: Optional[Dict] = None) -> str:
        """
        Build contextual prompt based on user's current page/data
        
        Args:
            user_message: User's question
            context: Additional context (page, results, etc.)
            
        Returns:
            Enhanced prompt with context
        """
        prompt_parts = [self.system_context]
        
        if context:
            # Add page context
            if 'page' in context:
                prompt_parts.append(f"\nUser is currently on: {context['page']} page")
            
            # Add results context
            if 'results' in context:
                results = context['results']
                prompt_parts.append(f"\nUser has analysis results available:")
                prompt_parts.append(f"- Virus: {results.get('virus', 'N/A')}")
                prompt_parts.append(f"- Deadliness Score: {results.get('deadliness_score', {}).get('overall_score', 'N/A')}/100")
                if 'top_candidates' in results and results['top_candidates']:
                    top_drug = results['top_candidates'][0]
                    prompt_parts.append(f"- Top Drug: {top_drug.get('drug_name', 'N/A')}")
            
            # Add file upload context
            if 'uploaded_file' in context:
                prompt_parts.append(f"\nUser has uploaded: {context['uploaded_file']}")
        
        # Add conversation history (reduced to last 2 for speed)
        if self.chat_history:
            prompt_parts.append("\nRecent context:")
            for exchange in self.chat_history[-2:]:  # Last 2 exchanges only
                prompt_parts.append(f"User: {exchange['user']}")
                prompt_parts.append(f"Bot: {exchange['assistant']}")
        
        # Add current user message
        prompt_parts.append(f"\nUser: {user_message}")
        prompt_parts.append("\nRespond in 2-3 sentences:")
        
        return "\n".join(prompt_parts)
    
    def _get_cache_key(self, message: str) -> str:
        """Generate cache key from message"""
        return hashlib.md5(message.lower().strip().encode()).hexdigest()
    
    def _get_cached_response(self, cache_key: str) -> Optional[str]:
        """Get cached response if available and not expired"""
        if cache_key in self.response_cache:
            response, timestamp = self.response_cache[cache_key]
            # Cache expires after 5 minutes
            if datetime.now() - timestamp < timedelta(minutes=5):
                return response
            else:
                # Remove expired cache
                del self.response_cache[cache_key]
        return None
    
    def _cache_response(self, cache_key: str, response: str):
        """Cache response with timestamp"""
        self.response_cache[cache_key] = (response, datetime.now())
        # Keep cache size manageable (max 50 entries)
        if len(self.response_cache) > 50:
            # Remove oldest entry
            oldest_key = min(self.response_cache.keys(), 
                           key=lambda k: self.response_cache[k][1])
            del self.response_cache[oldest_key]
    
    async def get_response(self, 
                          user_message: str,
                          context: Optional[Dict] = None) -> str:
        """
        Get AI response to user message (with caching for speed)
        
        Args:
            user_message: User's message
            context: Current context (page, results, etc.)
            
        Returns:
            AI assistant response
        """
        try:
            # Check cache for common questions (if no specific context)
            if not context or not context.get('results'):
                cache_key = self._get_cache_key(user_message)
                cached = self._get_cached_response(cache_key)
                if cached:
                    return cached
            
            # Build contextual prompt
            full_prompt = self.get_contextual_prompt(user_message, context)
            
            # Generate response
            response = self.model.generate_content(full_prompt)
            assistant_message = response.text
            
            # Cache response for common questions
            if not context or not context.get('results'):
                cache_key = self._get_cache_key(user_message)
                self._cache_response(cache_key, assistant_message)
            
            # Save to history
            self.chat_history.append({
                'user': user_message,
                'assistant': assistant_message
            })
            
            return assistant_message
            
        except Exception as e:
            error_msg = f"I apologize, I encountered an error: {str(e)}. Please try again!"
            return error_msg
    
    def summarize_results(self, results: Dict) -> str:
        """
        Summarize analysis results in simple terms
        
        Args:
            results: Analysis results dictionary
            
        Returns:
            Human-friendly summary
        """
        prompt = f"""Summarize in 2-3 sentences:
        
        Virus: {results.get('virus', 'N/A')}
        Deadliness: {results.get('deadliness_score', {}).get('overall_score', 'N/A')}/100 ({results.get('deadliness_score', {}).get('risk_level', 'N/A')})
        Top Drug: {results.get('top_candidates', [{}])[0].get('drug_name', 'N/A')} (Score: {results.get('top_candidates', [{}])[0].get('predicted_affinity', 0):.2f})
        
        Brief summary with key insight:"""
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except:
            return f"✅ Analysis complete for {results.get('virus', 'virus')}! Deadliness: {results.get('deadliness_score', {}).get('overall_score', 'N/A')}/100. Top drug: {results.get('top_candidates', [{}])[0].get('drug_name', 'N/A')}. Check results page for details!"
    
    def explain_term(self, term: str) -> str:
        """
        Explain biological/medical terminology
        
        Args:
            term: Term to explain
            
        Returns:
            Simple explanation
        """
        prompt = f"""Explain '{term}' in viral analysis/drug discovery (2 sentences, simple terms):"""
        
        try:
            response = self.model.generate_content(prompt)
            return f"🔬 **{term}**: {response.text}"
        except:
            # Fallback to dictionary
            from backend.services.gemini_service import BIOLOGICAL_TERMS
            return BIOLOGICAL_TERMS.get(term, f"🔍 '{term}' - Please try asking again!")
    
    def get_help_for_page(self, page: str) -> str:
        """
        Provide context-specific help based on current page
        
        Args:
            page: Current page name
            
        Returns:
            Helpful guidance
        """
        help_messages = {
            'dashboard': """
            📊 **Dashboard Help**
            
            Here you can:
            1. Upload virus data files (CSV, FASTA, JSON)
            2. Select a virus from the dropdown (SARS-CoV-2, Influenza, Ebola)
            3. Click "Quick Screen" for fast analysis
            4. Click "Start Full Analysis" for comprehensive results
            
            Tip: Start with "Quick Screen" if you're new! 🚀
            """,
            
            'results': """
            📈 **Results Help**
            
            Your analysis includes 7 sections:
            1. 🧬 Mutation Prediction - What's coming next
            2. ⚠️ Deadliness Score - How dangerous is it
            3. 💊 Symptoms - What to expect
            4. 💉 Top Drugs - Best treatment options
            5. 📦 3D View - Molecular binding
            6. 🧪 Modifications - Drug improvements
            7. ✅ Recommendations - What to do
            
            Need help understanding any section? Just ask! 🤔
            """,
            
            'history': """
            📜 **History Help**
            
            View all your past analyses:
            • Search by virus name
            • Filter by date or deadliness
            • Download results as JSON
            • Re-open any previous analysis
            
            Your data is saved locally in your browser! 💾
            """,
            
            'login': """
            🔐 **Login Help**
            
            Demo Mode is active!
            • Use any email and password
            • No account needed for testing
            • Your session will be saved locally
            
            Example: demo@viroai.com / password123 ✨
            """
        }
        
        return help_messages.get(page, 
            "I'm here to help! Ask me anything about using Viro-AI! 😊")
    
    def clear_history(self):
        """Clear conversation history"""
        self.chat_history = []
    
    def get_conversation_history(self) -> List[Dict[str, str]]:
        """Get full conversation history"""
        return self.chat_history


# Biological terms dictionary for quick reference
BIOLOGICAL_TERMS = {
    'IC50': 'The concentration of a drug needed to inhibit 50% of virus activity. Lower is better!',
    'Binding Affinity': 'How strongly a drug attaches to a virus protein. Higher score = stronger binding.',
    'SARS-CoV-2': 'The virus that causes COVID-19. It attacks respiratory cells.',
    'Spike Protein': 'The protein on virus surface that helps it enter human cells.',
    'Mutation': 'A change in virus genetic code that can make it more dangerous or resistant.',
    'Deadliness Score': 'Overall risk rating (0-100) based on transmissibility, severity, and mortality.',
    'RBD': 'Receptor Binding Domain - the part of spike protein that binds to human cells.',
    'Transmissibility': 'How easily the virus spreads from person to person.',
    'Antiviral': 'A drug that fights viruses by blocking their reproduction.',
    'Variant': 'A version of the virus with genetic mutations.',
    'Protein Target': 'A specific virus protein that drugs can attack.',
    'Molecular Weight': 'The size of a drug molecule. Affects how it moves in the body.',
    'LogP': 'Measures how well a drug dissolves in fat vs water. Affects absorption.',
    'SMILES': 'A text format for writing chemical structures.',
    'PDB': 'Protein Data Bank - database of 3D protein structures.',
}

