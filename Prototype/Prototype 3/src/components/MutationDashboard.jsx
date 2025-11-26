import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MutationCard from './MutationCard';
import ProgressBar from './ProgressBar';
import ProteinModel from './ProteinModel';

const MutationDashboard = ({ virus, selectedMutation, onMutationSelect }) => {
  const [localSelectedMutation, setLocalSelectedMutation] = useState(selectedMutation || virus.mutations[0]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMutation) {
      setLocalSelectedMutation(selectedMutation);
      setShowSidebar(true);
    }
  }, [selectedMutation]);

  const handleMutationClick = (mutation) => {
    setIsAnimating(true);
    setLocalSelectedMutation(mutation);
    
    // Start animation
    setTimeout(() => {
      setShowSidebar(true);
      setIsAnimating(false);
      onMutationSelect(mutation);
    }, 1000); // Animation duration - 1 second
  };

  const currentMutation = localSelectedMutation || virus.mutations[0];

  // Helper function to get organ-specific icons
  const getOrganIcon = (organName) => {
    const icons = {
      'Lungs': '🫁',
      'Respiratory System': '🫁',
      'Upper Respiratory Tract': '👃',
      'Heart': '❤️',
      'Cardiovascular System': '❤️',
      'Brain': '🧠',
      'Nervous System': '🧠',
      'Liver': '🩸',
      'Kidneys': '🩸',
      'Immune System': '🛡️',
      'Blood': '🩸',
      'Blood Vessels': '🫀',
      'Vascular System': '🫀',
      'Digestive System': '🍽️',
      'Bronchi': '🫁',
      'Lymph Nodes': '🔬',
      'default': '🏥'
    };
    return icons[organName] || icons.default;
  };

  // Helper function to get symptom-specific icons
  const getSymptomIcon = (symptomText) => {
    const symptom = symptomText.toLowerCase();
    if (symptom.includes('cough')) return '🫁';
    if (symptom.includes('fever') || symptom.includes('temperature')) return '🌡️';
    if (symptom.includes('breath') || symptom.includes('hypoxia')) return '😮‍💨';
    if (symptom.includes('heart') || symptom.includes('cardiac')) return '💓';
    if (symptom.includes('headache')) return '🤕';
    if (symptom.includes('fatigue') || symptom.includes('weakness')) return '😴';
    if (symptom.includes('taste') || symptom.includes('smell')) return '👃';
    if (symptom.includes('throat')) return '🗣️';
    if (symptom.includes('muscle') || symptom.includes('body ache')) return '💪';
    if (symptom.includes('gastro') || symptom.includes('nausea') || symptom.includes('diarrhea')) return '🤢';
    if (symptom.includes('clot') || symptom.includes('bleed')) return '🩸';
    if (symptom.includes('congestion')) return '👃';
    if (symptom.includes('viral load')) return '🦠';
    if (symptom.includes('infection')) return '🔬';
    if (symptom.includes('hospital')) return '🏥';
    return '🩺';
  };

  return (
    <div className="mutation-dashboard">
      {!showSidebar ? (
        // Initial view - mutation cards in center
        <div className={`mutations-grid-view ${isAnimating ? 'animating' : ''}`}>
          <div className="virus-header">
            <h1>{virus.name}</h1>
            <p>Select a mutation to analyze</p>
          </div>
          <div className="mutations-grid">
            {virus.mutations.map((mutation) => (
              <MutationCard
                key={mutation.id}
                mutation={mutation}
                isSelected={mutation.id === currentMutation.id}
                onClick={() => handleMutationClick(mutation)}
                isAnimating={isAnimating && mutation.id === currentMutation.id}
              />
            ))}
          </div>
        </div>
      ) : (
        // Dashboard view with sidebar
        <div className="dashboard-layout">
          {/* Sidebar */}
          <div className="mutations-sidebar">
            <div className="sidebar-header">
              <h3>{virus.name}</h3>
              <p>Mutations</p>
            </div>
            <div className="mutation-list">
              {virus.mutations.map((mutation) => (
                <div
                  key={mutation.id}
                  className={`sidebar-mutation-card ${mutation.id === currentMutation.id ? 'active' : ''}`}
                  onClick={() => handleMutationClick(mutation)}
                >
                  {mutation.name}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="dashboard-main">
            {/* Overview Section */}
            <div className="dashboard-section">
              <h2>{currentMutation.name}</h2>
              <p className="mutation-description">{currentMutation.description}</p>
              
              {/* Detailed Mutation Information */}
              {currentMutation.lineage && (
                <div className="mutation-details-box">
                  <div className="mutation-detail-row">
                    <strong>Lineage:</strong> {currentMutation.lineage}
                  </div>
                  <div className="mutation-detail-row">
                    <strong>First Detected:</strong> {currentMutation.firstDetected} in {currentMutation.region}
                  </div>
                  <div className="mutation-detail-row">
                    <strong>Prevalence:</strong> {currentMutation.prevalence} global circulation
                  </div>
                  <div className="mutation-detail-row">
                    <strong>Key Mutation:</strong> {currentMutation.type}
                  </div>
                </div>
              )}
            </div>

            {/* Mutation Impact Description */}
            <div className="dashboard-section mutation-impact-section">
              <h3>Mutation Impact & Characteristics</h3>
              <p style={{ lineHeight: '1.8', color: '#2c3e50', fontSize: '1rem' }}>
                {currentMutation.proteinChange || 
                 `This ${currentMutation.name} variant represents a significant evolutionary step in viral adaptation, 
                 with structural modifications that enhance its ability to infect host cells, evade immune responses, 
                 and potentially resist therapeutic interventions.`}
              </p>
            </div>

            {/* Deadliness Score Section */}
            <div className="dashboard-section">
              <h3>Deadliness Score</h3>
              <div className="deadliness-container">
                <div className="hazard-icon">⚠️</div>
                <ProgressBar 
                  score={currentMutation.deadlinessScore}
                  color={currentMutation.deadlinessScore >= 70 ? 'red' : 
                         currentMutation.deadlinessScore >= 40 ? 'orange' : 'green'}
                />
                <span className="score-text">{currentMutation.deadlinessScore}%</span>
              </div>
            </div>

            {/* Affected Organs & Symptoms Section */}
            <div className="dashboard-section">
              <div className="organs-symptoms-container">
                <div className="human-body-model">
                  <video 
                    className="body-rotation-video"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source 
                      src="/human_body_3d.mp4" 
                      type="video/mp4" 
                    />
                    <div className="body-fallback">
                      <div className="body-icon">👤</div>
                      <p>3D Human Body Model</p>
                    </div>
                  </video>
                </div>
                
                <div className="organs-symptoms-info">
                  <div className="info-box">
                    <h4>Affected Organs</h4>
                    <div className="organs-list-detailed">
                      {typeof currentMutation.affectedOrgans === 'object' && !Array.isArray(currentMutation.affectedOrgans) ? (
                        // New detailed format
                        Object.entries(currentMutation.affectedOrgans).map(([organ, effect], index) => (
                          <div key={index} className="organ-detail-card">
                            <div className="organ-header">
                              <div className="organ-icon-detailed">{getOrganIcon(organ)}</div>
                              <strong>{organ}</strong>
                            </div>
                            <p className="organ-effect">{effect}</p>
                          </div>
                        ))
                      ) : (
                        // Fallback for old format
                        (currentMutation.affectedOrgans || []).map((organ, index) => (
                          <div key={index} className="organ-detail-card">
                            <div className="organ-header">
                              <div className="organ-icon-detailed">🫁</div>
                              <strong>{organ}</strong>
                            </div>
                            <p className="organ-effect">Affected by viral infection</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div className="info-box">
                    <h4>Severe Symptoms</h4>
                    <div className="symptoms-list-detailed">
                      {Array.isArray(currentMutation.symptoms) && currentMutation.symptoms.length > 0 && currentMutation.symptoms[0].symptom ? (
                        // New detailed format
                        currentMutation.symptoms.map((item, index) => (
                          <div key={index} className="symptom-detail-card">
                            <div className="symptom-icon-detailed">{getSymptomIcon(item.symptom)}</div>
                            <div className="symptom-text">
                              <strong>{item.symptom}</strong>
                              <p>{item.explanation}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        // Fallback for old format
                        (currentMutation.symptoms || []).map((symptom, index) => (
                          <div key={index} className="symptom-detail-card">
                            <div className="symptom-icon-detailed">🩺</div>
                            <div className="symptom-text">
                              <strong>{symptom}</strong>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Protein Mutation Section */}
            <div className="dashboard-section">
              <h3>Protein Mutation Details</h3>
              <p>{currentMutation.proteinChange}</p>
              <p className="protein-source">Interactive 3D structures from RCSB Protein Data Bank</p>
              <ProteinModel mutation={currentMutation} virus={virus} />
            </div>

            {/* Predict Antidote Button */}
            <div className="predict-antidote-container">
              <button 
                className="predict-antidote-btn"
                onClick={() => navigate('/drug-antidote', { state: { virus, mutation: currentMutation } })}
              >
                PREDICT ANTIDOTE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MutationDashboard;
