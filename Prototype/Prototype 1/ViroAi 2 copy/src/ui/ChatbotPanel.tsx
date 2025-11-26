import { useState } from 'react';

export default function ChatbotPanel() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m ViroAI Assistant. I can help you with viral research questions, mutation analysis, and antidote development. How can I assist you today?',
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "What are the latest SARS-CoV-2 mutations?",
    "Explain the spike protein structure",
    "Show me antidote development progress",
    "How do viral mutations affect drug efficacy?",
    "What are the key binding sites for therapeutics?"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (question: string) => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('mutation') || lowerQ.includes('variant')) {
      return `Based on our latest analysis, the most significant mutations include:\n\n🧬 **Spike protein D614G**: Increases transmissibility by ~50%\n🧬 **Omicron BA.5**: Contains 36 mutations in spike protein\n🧬 **Delta plus**: Enhanced immune escape capabilities\n\nWould you like detailed structural analysis of any specific mutation?`;
    } else if (lowerQ.includes('spike') || lowerQ.includes('protein')) {
      return `The SARS-CoV-2 spike protein is a trimeric class I fusion protein with key domains:\n\n🔬 **Receptor Binding Domain (RBD)**: Binds to ACE2 receptor\n🔬 **N-Terminal Domain**: Involved in host cell recognition\n🔬 **Fusion peptide**: Facilitates membrane fusion\n\nYou can explore the 3D structure in our visualization panel. Would you like me to explain any specific domain?`;
    } else if (lowerQ.includes('antidote') || lowerQ.includes('drug') || lowerQ.includes('treatment')) {
      return `Current antidote development status:\n\n💊 **Paxlovid**: 89% efficacy against severe disease\n💊 **Molnupiravir**: Reduces hospitalization by 30%\n💊 **Bebtelovimab**: Effective against Omicron variants\n\nOur AI models are identifying 23 potential new therapeutic targets. Would you like details on any specific treatment?`;
    } else if (lowerQ.includes('binding') || lowerQ.includes('site')) {
      return `Key therapeutic binding sites identified:\n\n🎯 **ACE2-RBD interface**: Primary target for blocking viral entry\n🎯 **Furin cleavage site**: Critical for viral activation\n🎯 **RNA polymerase active site**: Target for replication inhibitors\n\nOur machine learning models predict 15 additional druggable sites. Would you like structural details?`;
    } else {
      return `I understand you're asking about "${question}". I can help with:\n\n🔬 Viral mutation analysis and predictions\n💊 Antidote development and drug interactions\n📊 Research data interpretation\n🧬 Protein structure analysis\n📈 Epidemiological trends\n\nCould you be more specific about what aspect interests you most?`;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="panel-body" style={{height: '400px', display: 'flex', flexDirection: 'column'}}>
      <div className="chat-header" style={{marginBottom: '15px'}}>
        <h3>ViroAI Assistant</h3>
        <p>Ask questions about viral research, mutations, and treatments</p>
      </div>

      {/* Suggested Questions */}
      <div className="suggested-questions" style={{marginBottom: '15px'}}>
        <div style={{fontSize: '12px', color: '#666', marginBottom: '8px'}}>
          💡 Suggested Questions:
        </div>
        <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
          {suggestedQuestions.slice(0, 3).map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(question)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ddd',
                borderRadius: '12px',
                fontSize: '10px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages" style={{
        flex: 1,
        overflowY: 'auto',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: '#fafafa',
        marginBottom: '15px'
      }}>
        {messages.map(message => (
          <div key={message.id} style={{
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: message.type === 'bot' ? '#4ecdc4' : '#6bcf7f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              flexShrink: 0
            }}>
              {message.type === 'bot' ? '🤖' : '👤'}
            </div>
            <div style={{flex: 1}}>
              <div style={{
                backgroundColor: message.type === 'bot' ? 'white' : '#e3f2fd',
                padding: '8px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                lineHeight: '1.4',
                whiteSpace: 'pre-line'
              }}>
                {message.content}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#666',
                marginTop: '4px',
                marginLeft: '12px'
              }}>
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#4ecdc4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}>
              🤖
            </div>
            <div style={{
              backgroundColor: 'white',
              padding: '8px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontStyle: 'italic',
              color: '#666'
            }}>
              ViroAI is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="chat-input" style={{display: 'flex', gap: '8px'}}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about viral mutations, antidotes, research..."
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '12px'
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          style={{
            padding: '10px 15px',
            backgroundColor: inputMessage.trim() ? '#4ecdc4' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
            fontSize: '12px'
          }}
        >
          Send
        </button>
      </div>

      {/* Chat Features */}
      <div style={{
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        color: '#666'
      }}>
        <div>🔬 Powered by ViroAI Research Models</div>
        <button style={{
          padding: '4px 8px',
          backgroundColor: 'transparent',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '10px',
          cursor: 'pointer',
          color: '#666'
        }}>
          Clear Chat
        </button>
      </div>
    </div>
  );
}
