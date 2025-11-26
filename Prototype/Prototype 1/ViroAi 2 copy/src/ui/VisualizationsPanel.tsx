import { useState } from 'react';

export default function VisualizationsPanel() {
  const [activeViz, setActiveViz] = useState('phylogenetic');

  const visualizations = [
    {
      id: 'phylogenetic',
      name: 'Phylogenetic Tree',
      icon: '🌳',
      description: 'Evolutionary relationships between viral strains'
    },
    {
      id: 'network',
      name: 'Protein Network',
      icon: '🕸️',
      description: 'Protein-protein interaction networks'
    },
    {
      id: 'geographic',
      name: 'Geographic Spread',
      icon: '🗺️',
      description: 'Global distribution of viral variants'
    },
    {
      id: 'timeline',
      name: 'Mutation Timeline',
      icon: '📅',
      description: 'Temporal evolution of key mutations'
    },
    {
      id: 'structure',
      name: 'Structure Comparison',
      icon: '🧬',
      description: 'Comparative structural analysis'
    },
    {
      id: 'binding',
      name: 'Drug Binding Sites',
      icon: '💊',
      description: 'Potential therapeutic target sites'
    }
  ];

  const generateMockData = (vizType: string) => {
    switch (vizType) {
      case 'phylogenetic':
        return (
          <div style={{
            height: '300px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '1px solid #e9ecef'
          }}>
            <div style={{position: 'absolute', top: '20px', left: '20px', fontSize: '12px', color: '#666'}}>
              Phylogenetic Analysis - SARS-CoV-2 Variants
            </div>
            <svg width="260" height="200" style={{marginTop: '20px'}}>
              {/* Main trunk */}
              <line x1="20" y1="100" x2="80" y2="100" stroke="#333" strokeWidth="3"/>
              
              {/* Alpha branch */}
              <line x1="80" y1="100" x2="140" y2="60" stroke="#ff6b6b" strokeWidth="2"/>
              <circle cx="140" cy="60" r="4" fill="#ff6b6b"/>
              <text x="145" y="65" fontSize="10" fill="#ff6b6b">Alpha</text>
              
              {/* Beta branch */}
              <line x1="80" y1="100" x2="140" y2="80" stroke="#ffd93d" strokeWidth="2"/>
              <circle cx="140" cy="80" r="4" fill="#ffd93d"/>
              <text x="145" y="85" fontSize="10" fill="#ffd93d">Beta</text>
              
              {/* Delta branch */}
              <line x1="80" y1="100" x2="180" y2="40" stroke="#4ecdc4" strokeWidth="2"/>
              <circle cx="180" cy="40" r="4" fill="#4ecdc4"/>
              <text x="185" y="45" fontSize="10" fill="#4ecdc4">Delta</text>
              
              {/* Omicron branch */}
              <line x1="80" y1="100" x2="220" y2="120" stroke="#ff9f43" strokeWidth="3"/>
              <circle cx="220" cy="120" r="5" fill="#ff9f43"/>
              <text x="225" y="125" fontSize="10" fill="#ff9f43">Omicron</text>
              
              {/* Original */}
              <circle cx="20" cy="100" r="5" fill="#333"/>
              <text x="25" y="105" fontSize="10" fill="#333">Original</text>
            </svg>
          </div>
        );
      case 'network':
        return (
          <div style={{
            height: '300px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '1px solid #e9ecef'
          }}>
            <div style={{position: 'absolute', top: '20px', left: '20px', fontSize: '12px', color: '#666'}}>
              Protein Interaction Network
            </div>
            <svg width="280" height="220" style={{marginTop: '20px'}}>
              {/* Central node */}
              <circle cx="140" cy="110" r="20" fill="#ff6b6b" opacity="0.8"/>
              <text x="125" y="115" fontSize="10" fill="white" fontWeight="bold">Spike</text>
              
              {/* Connected nodes */}
              <circle cx="80" cy="70" r="15" fill="#4ecdc4" opacity="0.8"/>
              <text x="70" y="75" fontSize="9" fill="white">ACE2</text>
              <line x1="120" y1="95" x2="95" y2="80" stroke="#ccc" strokeWidth="2"/>
              
              <circle cx="200" cy="70" r="15" fill="#ffd93d" opacity="0.8"/>
              <text x="185" y="75" fontSize="9" fill="white">Furin</text>
              <line x1="160" y1="95" x2="185" y2="80" stroke="#ccc" strokeWidth="2"/>
              
              <circle cx="80" cy="150" r="15" fill="#6bcf7f" opacity="0.8"/>
              <text x="68" y="155" fontSize="9" fill="white">TMPRSS2</text>
              <line x1="120" y1="125" x2="95" y2="140" stroke="#ccc" strokeWidth="2"/>
              
              <circle cx="200" cy="150" r="15" fill="#ff9f43" opacity="0.8"/>
              <text x="187" y="155" fontSize="9" fill="white">Neuropilin</text>
              <line x1="160" y1="125" x2="185" y2="140" stroke="#ccc" strokeWidth="2"/>
            </svg>
          </div>
        );
      case 'geographic':
        return (
          <div style={{
            height: '300px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '1px solid #e9ecef'
          }}>
            <div style={{position: 'absolute', top: '20px', left: '20px', fontSize: '12px', color: '#666'}}>
              Global Variant Distribution
            </div>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <div style={{fontSize: '60px', marginBottom: '20px'}}>🗺️</div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', maxWidth: '300px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{width: '12px', height: '12px', backgroundColor: '#ff6b6b', borderRadius: '50%'}}></div>
                  <span style={{fontSize: '12px'}}>Alpha - Europe (45%)</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{width: '12px', height: '12px', backgroundColor: '#4ecdc4', borderRadius: '50%'}}></div>
                  <span style={{fontSize: '12px'}}>Delta - Asia (38%)</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{width: '12px', height: '12px', backgroundColor: '#ff9f43', borderRadius: '50%'}}></div>
                  <span style={{fontSize: '12px'}}>Omicron - Global (67%)</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{width: '12px', height: '12px', backgroundColor: '#ffd93d', borderRadius: '50%'}}></div>
                  <span style={{fontSize: '12px'}}>Beta - Africa (23%)</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'timeline':
        return (
          <div style={{
            height: '300px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            padding: '20px',
            position: 'relative',
            border: '1px solid #e9ecef'
          }}>
            <div style={{fontSize: '12px', color: '#666', marginBottom: '20px'}}>
              Mutation Timeline - Key Events
            </div>
            <div style={{position: 'relative', height: '220px'}}>
              {/* Timeline line */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                right: '20px',
                height: '2px',
                backgroundColor: '#ddd'
              }}></div>
              
              {/* Timeline events */}
              {[
                {date: 'Dec 2019', event: 'Original strain', color: '#333', pos: '10%'},
                {date: 'Sep 2020', event: 'D614G', color: '#ff6b6b', pos: '30%'},
                {date: 'Dec 2020', event: 'Alpha variant', color: '#ffd93d', pos: '50%'},
                {date: 'May 2021', event: 'Delta variant', color: '#4ecdc4', pos: '70%'},
                {date: 'Nov 2021', event: 'Omicron', color: '#ff9f43', pos: '90%'}
              ].map((item, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  left: item.pos,
                  top: '45%',
                  transform: 'translateX(-50%)'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: item.color,
                    borderRadius: '50%',
                    marginBottom: '10px'
                  }}></div>
                  <div style={{
                    textAlign: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    marginBottom: '4px'
                  }}>
                    {item.date}
                  </div>
                  <div style={{
                    textAlign: 'center',
                    fontSize: '9px',
                    color: '#666',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div style={{
            height: '300px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e9ecef'
          }}>
            <div style={{textAlign: 'center', color: '#666'}}>
              <div style={{fontSize: '48px', marginBottom: '15px'}}>📊</div>
              <div>Visualization loading...</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="panel-body">
      <div className="viz-header" style={{marginBottom: '20px'}}>
        <h3>Data Visualizations</h3>
        <p>Interactive charts and graphs for viral data analysis</p>
      </div>

      <div className="viz-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        {visualizations.map(viz => (
          <button
            key={viz.id}
            onClick={() => setActiveViz(viz.id)}
            style={{
              padding: '15px',
              border: activeViz === viz.id ? '2px solid #4ecdc4' : '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: activeViz === viz.id ? '#4ecdc420' : '#fff',
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s'
            }}
          >
            <div style={{fontSize: '24px', marginBottom: '8px'}}>{viz.icon}</div>
            <div style={{fontSize: '12px', fontWeight: 'bold', marginBottom: '4px'}}>
              {viz.name}
            </div>
            <div style={{fontSize: '10px', color: '#666'}}>
              {viz.description}
            </div>
          </button>
        ))}
      </div>

      <div className="active-visualization">
        {generateMockData(activeViz)}
      </div>

      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
          <span style={{fontSize: '16px'}}>⚙️</span>
          <strong style={{fontSize: '14px'}}>Visualization Controls</strong>
        </div>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <button style={{
            padding: '6px 12px',
            backgroundColor: '#4ecdc4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            📥 Export Data
          </button>
          <button style={{
            padding: '6px 12px',
            backgroundColor: '#6bcf7f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            🎨 Customize
          </button>
          <button style={{
            padding: '6px 12px',
            backgroundColor: '#ff9f43',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            📊 Full Screen
          </button>
        </div>
      </div>
    </div>
  );
}
