import React, { useState, useEffect } from 'react';
import SideImage from './SideImage';
import Navigation from './Navigation';
import VirusUploader from './VirusUploader';
import VirusCard from './VirusCard';
import MutationDashboard from './MutationDashboard';
import Footer from './Footer';
import { getViruses, getVirusMutations, checkHealth } from '../services/api';
import '../Analyze.css';

const Analyze = () => {
  const [currentView, setCurrentView] = useState('upload'); // 'upload' or 'dashboard'
  const [selectedVirus, setSelectedVirus] = useState(null);
  const [selectedMutation, setSelectedMutation] = useState(null);
  const [backendViruses, setBackendViruses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendAvailable, setBackendAvailable] = useState(false);

  // Check backend health and fetch viruses on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Check if backend is available
        const healthCheck = await checkHealth();
        setBackendAvailable(healthCheck.success);

        if (healthCheck.success) {
          // Fetch viruses from backend
          const virusesResponse = await getViruses();
          if (virusesResponse.success) {
            // Map backend virus data to frontend format
            const mappedViruses = mapBackendViruses(virusesResponse.data);
            setBackendViruses(mappedViruses);
          }
        }
      } catch (error) {
        console.error('Failed to initialize backend data:', error);
        setBackendAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Map backend virus names to frontend display format
  const mapBackendViruses = (backendData) => {
    const virusMapping = {
      'SARS-CoV-2': {
        id: 'covid19',
        name: 'COVID-19 (SARS-CoV-2)',
        type: 'Coronavirus',
        backend_id: 'SARS-CoV-2',
      },
      'Influenza': {
        id: 'influenza',
        name: 'Influenza-A',
        type: 'Orthomyxovirus',
        backend_id: 'Influenza',
      },
      'Ebola': {
        id: 'ebola',
        name: 'Ebola',
        type: 'Filovirus',
        backend_id: 'Ebola',
      },
    };

    const supportedViruses = backendData.supported_viruses || [];
    const proteins = backendData.proteins || {};

    return supportedViruses.map((virusId) => {
      const mapping = virusMapping[virusId];
      const virusProteins = proteins[virusId] || {};
      const mutations = getVirusMutations(virusId);

      return {
        ...mapping,
        proteins: virusProteins,
        mutations: mutations,
        mutationCount: mutations.length,
      };
    });
  };

  const handleVirusSelect = (virus) => {
    setSelectedVirus(virus);
    setCurrentView('dashboard');
  };

  const handleFileUpload = (fileData) => {
    setSelectedVirus({
      id: 'uploaded',
      name: 'Uploaded Virus',
      type: 'Custom',
      backend_id: null,
      mutations: [
        {
          id: 'mut1',
          name: 'MUTATION-ALPHA',
          description: 'Primary mutation detected in uploaded sequence',
          deadlinessScore: 78,
          affectedOrgans: ['Lungs', 'Heart', 'Brain', 'Liver'],
          symptoms: ['Fever', 'Cough', 'Difficulty Breathing', 'Headache'],
          proteinChange: 'Spike protein mutation affecting receptor binding'
        },
        {
          id: 'mut2',
          name: 'MUTATION-BETA',
          description: 'Secondary mutation with increased transmissibility',
          deadlinessScore: 65,
          affectedOrgans: ['Lungs', 'Kidneys', 'Immune System', 'Blood'],
          symptoms: ['Fatigue', 'Body Aches', 'Loss of Taste', 'Nausea'],
          proteinChange: 'Envelope protein modification'
        }
      ]
    });
    setCurrentView('dashboard');
  };

  const handleMutationSelect = (mutation) => {
    setSelectedMutation(mutation);
  };

  const storedViruses = [
    {
      id: 'covid19',
      name: 'COVID-19 (SARS-CoV-2)',
      type: 'Coronavirus',
      mutations: [
        {
          id: 'alpha',
          name: 'MUTATION-ALPHA',
          description: 'Alpha variant with increased transmissibility',
          deadlinessScore: 78,
          affectedOrgans: ['Lungs', 'Heart', 'Brain', 'Liver'],
          symptoms: ['Fever', 'Cough', 'Difficulty Breathing', 'Headache'],
          proteinChange: 'Spike protein N501Y mutation'
        },
        {
          id: 'beta',
          name: 'MUTATION-BETA',
          description: 'Beta variant with immune escape properties',
          deadlinessScore: 85,
          affectedOrgans: ['Lungs', 'Kidneys', 'Immune System', 'Blood'],
          symptoms: ['Fatigue', 'Body Aches', 'Loss of Taste', 'Nausea'],
          proteinChange: 'Multiple spike protein mutations'
        },
        {
          id: 'gamma',
          name: 'MUTATION-GAMMA',
          description: 'Gamma variant from Brazil',
          deadlinessScore: 72,
          affectedOrgans: ['Lungs', 'Heart', 'Digestive System', 'Nervous System'],
          symptoms: ['Fever', 'Cough', 'Gastrointestinal Issues', 'Confusion'],
          proteinChange: 'P.1 lineage mutations'
        },
        {
          id: 'delta',
          name: 'MUTATION-DELTA',
          description: 'Delta variant with high viral load',
          deadlinessScore: 88,
          affectedOrgans: ['Lungs', 'Heart', 'Blood Vessels', 'Muscles'],
          symptoms: ['High Fever', 'Severe Cough', 'Blood Clots', 'Muscle Pain'],
          proteinChange: 'L452R and T478K mutations'
        },
        {
          id: 'omega',
          name: 'MUTATION-OMEGA',
          description: 'Latest variant under investigation',
          deadlinessScore: 45,
          affectedOrgans: ['Lungs', 'Skin', 'Eyes', 'Ears'],
          symptoms: ['Mild Fever', 'Skin Rash', 'Eye Irritation', 'Hearing Loss'],
          proteinChange: 'Novel mutation pattern'
        }
      ]
    },
    {
      id: 'ebola',
      name: 'Ebola',
      type: 'Filovirus',
      mutations: [
        {
          id: 'ebola1',
          name: 'EBOLA-MUTATION-1',
          description: 'Primary Ebola mutation affecting glycoprotein',
          deadlinessScore: 95,
          affectedOrgans: ['Liver', 'Spleen', 'Kidneys', 'Blood'],
          symptoms: ['Hemorrhagic Fever', 'Vomiting', 'Diarrhea', 'Bleeding'],
          proteinChange: 'GP protein structural changes'
        }
      ]
    },
    {
      id: 'influenza',
      name: 'Influenza-A',
      type: 'Orthomyxovirus',
      mutations: [
        {
          id: 'flu1',
          name: 'INFLUENZA-MUTATION-1',
          description: 'H1N1 variant with increased severity',
          deadlinessScore: 55,
          affectedOrgans: ['Lungs', 'Throat', 'Muscles', 'Immune System'],
          symptoms: ['High Fever', 'Sore Throat', 'Body Aches', 'Weakness'],
          proteinChange: 'Hemagglutinin and Neuraminidase mutations'
        }
      ]
    }
  ];

  return (
    <>
      {/* Background DNA Animation - stays in the back */}
      <iframe 
        id="dna-background" 
        src="https://my.spline.design/dnaparticles-KjocSiUnOi078lOnI6RISNof/" 
        frameBorder="0"
        title="DNA Background Animation"
      />

      {/* Left and Right Side Components - kept intact */}
      <SideImage 
        src="/bg_component1_viro.png" 
        alt="DNA Helix Left" 
        position="left" 
      />
      <SideImage 
        src="/bg_component1_viro.png" 
        alt="DNA Helix Right" 
        position="right" 
      />

      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content */}
      <div className="analyze-page">
        {currentView === 'upload' ? (
          <div className="virus-selection-view">
            <div className="virus-selection-container">
              <h1 className="page-title">Analyze Virus</h1>
              <p className="page-subtitle">Upload a file or select from stored viruses</p>
              
              {/* Backend Status Indicator */}
              {!loading && (
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  {backendAvailable ? (
                    <span style={{ color: '#4A90E2', fontSize: '0.9rem' }}>
                      ✓ Connected to Viro-AI Backend
                    </span>
                  ) : (
                    <span style={{ color: '#e67e22', fontSize: '0.9rem' }}>
                      ⚠ Backend offline - using fallback data
                    </span>
                  )}
                </div>
              )}
              
              <VirusUploader onFileUpload={handleFileUpload} />
              
              <div className="stored-viruses">
                <h2>Stored Viruses</h2>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#5a6c7d' }}>
                    <div className="loading-spinner" style={{ margin: '0 auto 1rem', width: '40px', height: '40px', border: '4px solid rgba(74, 144, 226, 0.3)', borderTop: '4px solid #4A90E2', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p>Loading virus data...</p>
                  </div>
                ) : (
                  <div className="virus-cards-grid">
                    {(backendAvailable && backendViruses.length > 0 ? backendViruses : storedViruses).map((virus) => (
                      <VirusCard
                        key={virus.id}
                        virus={virus}
                        onSelect={() => handleVirusSelect(virus)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <MutationDashboard
            virus={selectedVirus}
            selectedMutation={selectedMutation}
            onMutationSelect={handleMutationSelect}
            backendAvailable={backendAvailable}
          />
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Analyze;
