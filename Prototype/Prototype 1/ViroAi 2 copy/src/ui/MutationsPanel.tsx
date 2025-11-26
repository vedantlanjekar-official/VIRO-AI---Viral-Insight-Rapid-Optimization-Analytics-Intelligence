import { useState } from 'react';

export default function MutationsPanel() {
  const [selectedMutation, setSelectedMutation] = useState('spike');

  const mutations = [
    {
      id: 'spike',
      name: 'Spike Protein D614G',
      severity: 'High',
      frequency: '85%',
      impact: 'Increased transmissibility',
      color: '#ff6b6b'
    },
    {
      id: 'nucleocapsid',
      name: 'Nucleocapsid R203K',
      severity: 'Medium',
      frequency: '67%',
      impact: 'Enhanced viral packaging',
      color: '#ffd93d'
    },
    {
      id: 'nsp6',
      name: 'NSP6 L37F',
      severity: 'Low',
      frequency: '42%',
      impact: 'Membrane remodeling',
      color: '#4ecdc4'
    },
    {
      id: 'orf3a',
      name: 'ORF3a Q57H',
      severity: 'Medium',
      frequency: '38%',
      impact: 'Ion channel function',
      color: '#ff9f43'
    }
  ];

  const selectedMutationData = mutations.find(m => m.id === selectedMutation);

  return (
    <div className="panel-body">
      <div className="mutations-header" style={{marginBottom: '20px'}}>
        <h3>Viral Mutation Analysis</h3>
        <p>Track and analyze key mutations across different viral proteins</p>
      </div>

      <div className="mutation-selector" style={{marginBottom: '20px'}}>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          {mutations.map(mutation => (
            <button
              key={mutation.id}
              onClick={() => setSelectedMutation(mutation.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                border: selectedMutation === mutation.id ? `2px solid ${mutation.color}` : '1px solid #ddd',
                backgroundColor: selectedMutation === mutation.id ? `${mutation.color}20` : '#fff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: selectedMutation === mutation.id ? 'bold' : 'normal'
              }}
            >
              {mutation.name}
            </button>
          ))}
        </div>
      </div>

      {selectedMutationData && (
        <div className="mutation-details">
          <div className="mutation-card" style={{
            border: `2px solid ${selectedMutationData.color}`,
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: `${selectedMutationData.color}10`
          }}>
            <h4 style={{color: selectedMutationData.color, marginBottom: '15px'}}>
              {selectedMutationData.name}
            </h4>
            
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
              <div className="stat-box">
                <div style={{fontSize: '12px', color: '#666', marginBottom: '5px'}}>Severity Level</div>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: selectedMutationData.color}}>
                  {selectedMutationData.severity}
                </div>
              </div>
              
              <div className="stat-box">
                <div style={{fontSize: '12px', color: '#666', marginBottom: '5px'}}>Population Frequency</div>
                <div style={{fontSize: '18px', fontWeight: 'bold', color: selectedMutationData.color}}>
                  {selectedMutationData.frequency}
                </div>
              </div>
              
              <div className="stat-box">
                <div style={{fontSize: '12px', color: '#666', marginBottom: '5px'}}>Functional Impact</div>
                <div style={{fontSize: '14px', fontWeight: 'bold', color: selectedMutationData.color}}>
                  {selectedMutationData.impact}
                </div>
              </div>
            </div>

            <div style={{marginTop: '20px'}}>
              <h5>Structural Analysis</h5>
              <div style={{
                height: '120px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #e9ecef',
                marginTop: '10px'
              }}>
                <div style={{textAlign: 'center', color: '#666'}}>
                  <div style={{fontSize: '24px', marginBottom: '8px'}}>🧬</div>
                  <div>3D structural comparison available</div>
                  <div style={{fontSize: '12px', marginTop: '4px'}}>
                    Wild-type vs {selectedMutationData.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mutation-timeline" style={{marginTop: '20px'}}>
        <h5>Mutation Timeline</h5>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          marginTop: '10px'
        }}>
          <div style={{fontSize: '20px'}}>📅</div>
          <div>
            <div style={{fontWeight: 'bold', fontSize: '14px'}}>First Detection</div>
            <div style={{fontSize: '12px', color: '#666'}}>March 2020 - Present</div>
          </div>
          <div style={{fontSize: '20px'}}>📈</div>
          <div>
            <div style={{fontWeight: 'bold', fontSize: '14px'}}>Global Spread</div>
            <div style={{fontSize: '12px', color: '#666'}}>Tracking across 195 countries</div>
          </div>
        </div>
      </div>
    </div>
  );
}
