import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader, Sparkles, HelpCircle, FileText, Minimize2, Trash2, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const AIChatbot = ({ results = null }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize session ID
  useEffect(() => {
    const sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(sid);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show welcome message when user logs in
  useEffect(() => {
    if (user && sessionId && messages.length === 0) {
      setTimeout(() => {
        setIsOpen(true);
        sendWelcomeMessage();
      }, 1000);
    }
  }, [user, sessionId]);

  // Proactive help when results are ready
  useEffect(() => {
    if (results && sessionId) {
      setTimeout(() => {
        const helpMessage = {
          role: 'assistant',
          content: `🎉 Your analysis is complete! Would you like me to help you understand the results for ${results.virus}? I can explain:
          
• Deadliness score (${results.deadliness_score?.overall_score}/100)
• Top drug candidates
• Mutation predictions
• Any biological terms
          
Just ask me anything! 😊`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, helpMessage]);
        if (!isOpen) {
          setIsOpen(true);
          // Show notification
          toast.success('ViroBot has insights about your results!', {
            icon: '🤖',
          });
        }
      }, 2000);
    }
  }, [results]);

  const sendWelcomeMessage = async () => {
    try {
      const response = await fetch('http://localhost:8000/chatbot/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: user?.full_name || user?.username || 'User',
          session_id: sessionId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([{
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        }]);
      }
    } catch (error) {
      // Fallback welcome message
      setMessages([{
        role: 'assistant',
        content: `👋 Hi ${user?.full_name || 'there'}! I'm ViroBot, your AI assistant!

What would you like to do today?

I can help you with:
• 🧬 Analyzing viruses
• 📊 Understanding results
• 💊 Finding drug candidates
• 🔬 Explaining terms

Just ask me anything! 😊`,
        timestamp: new Date(),
      }]);
    }
  };

  const getCurrentContext = () => {
    const path = location.pathname;
    const context = {};

    // Detect current page
    if (path.includes('dashboard')) {
      context.page = 'dashboard';
    } else if (path.includes('results')) {
      context.page = 'results';
    } else if (path.includes('history')) {
      context.page = 'history';
    } else if (path.includes('login')) {
      context.page = 'login';
    }

    // Add results if available
    if (results) {
      context.results = results;
    }

    return context;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const context = getCurrentContext();
      const response = await fetch('http://localhost:8000/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          context,
          session_id: sessionId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Show specific error message
      let errorMsg = '😅 Oops! I had trouble processing that.\n\n';
      
      if (error.message.includes('fetch')) {
        errorMsg += '🔌 Cannot connect to backend. Please make sure the backend server is running on http://localhost:8000';
      } else if (error.message.includes('GEMINI_API_KEY')) {
        errorMsg += '🔑 API key not configured. Please run SETUP_CHATBOT.bat to set it up!';
      } else {
        errorMsg += 'Could you try again? Or click "Help with this page" for guidance.';
      }
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('Clear all chat messages?')) {
      setMessages([]);
      sendWelcomeMessage();
      toast.success('Chat cleared!');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const explainTerm = async (term) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/chatbot/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          term,
          session_id: sessionId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        }]);
      }
    } catch (error) {
      toast.error('Failed to explain term');
    } finally {
      setIsLoading(false);
    }
  };

  const getPageHelp = async () => {
    setIsLoading(true);
    try {
      const context = getCurrentContext();
      const response = await fetch('http://localhost:8000/chatbot/help', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: context.page || 'dashboard',
          session_id: sessionId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        }]);
      }
    } catch (error) {
      toast.error('Failed to get help');
    } finally {
      setIsLoading(false);
    }
  };

  const summarizeResults = async () => {
    if (!results) {
      toast.error('No results to summarize');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/chatbot/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          results,
          session_id: sessionId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        }]);
      }
    } catch (error) {
      toast.error('Failed to summarize results');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick action buttons
  const QuickActions = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={getPageHelp}
        disabled={isLoading}
        className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors flex items-center space-x-1"
      >
        <HelpCircle className="h-3 w-3" />
        <span>Help with this page</span>
      </button>
      {results && (
        <button
          onClick={summarizeResults}
          disabled={isLoading}
          className="text-xs px-3 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-200 hover:bg-green-100 transition-colors flex items-center space-x-1"
        >
          <FileText className="h-3 w-3" />
          <span>Summarize results</span>
        </button>
      )}
      <button
        onClick={() => explainTerm('IC50')}
        disabled={isLoading}
        className="text-xs px-3 py-1.5 bg-purple-50 text-purple-600 rounded-full border border-purple-200 hover:bg-purple-100 transition-colors flex items-center space-x-1"
      >
        <Sparkles className="h-3 w-3" />
        <span>Explain IC50</span>
      </button>
    </div>
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group"
        style={{ zIndex: 9999 }}
        title="Chat with ViroBot"
      >
        <MessageCircle className="h-6 w-6" />
        <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        <div className="absolute -top-12 right-0 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask ViroBot! 🤖
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed ${isMinimized ? 'bottom-6 right-6' : 'bottom-6 right-6'} transition-all duration-300`} style={{ zIndex: 9999, position: 'fixed' }}>
      {/* Chat Window */}
      <div className={`bg-white border-2 border-blue-300 rounded-2xl shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`} style={{ overflow: 'visible' }}>
        {/* Header - Always visible with close button */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-3 flex items-center justify-between rounded-t-2xl" style={{ position: 'relative', zIndex: 10000, minHeight: '60px' }}>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-sm">ViroBot AI</h3>
              <p className="text-xs text-blue-100">Your viral analysis assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={clearChat}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              title="Clear chat"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={sendWelcomeMessage}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              title="Restart conversation"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              title={isMinimized ? 'Maximize' : 'Minimize'}
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200 hover:scale-110 bg-white/10 border border-white/30"
              title="Close Chatbot"
              style={{ position: 'relative', zIndex: 10001 }}
            >
              <X className="h-5 w-5 font-bold text-white" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-[420px] overflow-y-auto p-4 space-y-4 bg-gray-50" style={{ marginTop: '0' }}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white border-2 border-blue-200 text-gray-800 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-blue-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <Loader className="h-5 w-5 text-blue-600 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 pt-2 bg-gray-50">
              <QuickActions />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t-2 border-blue-100">
              <div className="flex items-end space-x-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  rows="2"
                  className="flex-1 px-4 py-2 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChatbot;

