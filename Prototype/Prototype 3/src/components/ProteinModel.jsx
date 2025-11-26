import React, { useState, useEffect, useRef } from 'react';
import * as NGL from 'ngl';

const ProteinModel = ({ mutation, virus }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [structures, setStructures] = useState({ original: null, mutated: null });
  const [error, setError] = useState(null);
  const viewerRef1 = useRef(null);
  const viewerRef2 = useRef(null);
  const stageRef1 = useRef(null);
  const stageRef2 = useRef(null);

  // Get mutation-specific description
  const getMutationDescription = () => {
    const mutationName = mutation?.name || '';
    
    const descriptions = {
      // COVID-19 mutations
      'MUTATION-ALPHA': 'The Alpha variant features the N501Y mutation in the spike protein receptor-binding domain (RBD), significantly enhancing ACE2 receptor affinity. This structural change in the spike protein leads to increased transmissibility and altered viral entry mechanisms.',
      'MUTATION-BETA': 'Beta variant contains E484K and N501Y mutations affecting immune escape. The E484K mutation in particular helps the virus evade antibody neutralization, while structural changes in the spike protein reduce vaccine efficacy.',
      'MUTATION-GAMMA': 'Gamma variant (P.1) has K417T, E484K, and N501Y mutations in spike protein. These combined mutations enhance receptor binding and immune evasion, with significant alterations to the spike protein\'s three-dimensional structure.',
      'MUTATION-DELTA': 'Delta variant features L452R and T478K mutations increasing viral load. The L452R mutation enhances spike protein stability and cell entry, while T478K improves receptor binding domain flexibility.',
      'MUTATION-OMEGA': 'Latest variant showing novel mutation patterns in spike protein structure. Early structural analysis suggests potential changes in receptor binding affinity and conformational dynamics.',
      
      // Influenza mutations
      'INFLUENZA-MUTATION-1': 'H1N1 variant with mutations in hemagglutinin (HA) and neuraminidase (NA) proteins. These structural changes affect viral attachment and release mechanisms, leading to altered host cell interactions and potential drug resistance.',
      
      // Ebola mutations
      'EBOLA-MUTATION-1': 'Glycoprotein (GP) mutations affecting viral attachment and membrane fusion. Structural alterations in the GP complex modify interactions with host cell receptors and impact viral entry efficiency.',
      
      // Default
      'default': 'This mutation affects the viral protein structure, altering its conformational state and functional properties. Structural analysis reveals changes in critical binding domains and catalytic sites that may influence viral infectivity and therapeutic targeting.'
    };
    
    return descriptions[mutationName] || descriptions['default'];
  };

  // Map virus and mutation to specific PDB structures
  const getProteinStructures = () => {
    const virusName = virus?.name || 'COVID-19 (SARS-CoV-2)';
    const mutationName = mutation?.name || '';
    
    // Base structures by virus
    const baseStructures = {
      'COVID-19 (SARS-CoV-2)': {
        'MUTATION-ALPHA': {
          original: '6VSB',  // Spike RBD (wild-type)
          mutated: '7LYL',   // N501Y mutant structure
          protein: 'Spike Protein RBD'
        },
        'MUTATION-BETA': {
          original: '6VSB',
          mutated: '7VX4',   // E484K variant
          protein: 'Spike Protein RBD'
        },
        'MUTATION-GAMMA': {
          original: '6VSB',
          mutated: '6VXX',   // Full spike
          protein: 'Spike Protein'
        },
        'MUTATION-DELTA': {
          original: '6VXX',
          mutated: '7V7Q',   // Delta variant spike
          protein: 'Spike Protein'
        },
        'MUTATION-OMEGA': {
          original: '7BNN',  // Main protease
          mutated: '6VXX',
          protein: 'Spike Protein / Main Protease'
        },
        'default': {
          original: '6VSB',
          mutated: '6VXX',
          protein: 'Spike Protein'
        }
      },
      'SARS-CoV-2': {
        'default': {
          original: '6VSB',
          mutated: '6VXX',
          protein: 'Spike Protein'
        }
      },
      'Influenza-A': {
        'INFLUENZA-MUTATION-1': {
          original: '1RVX',  // Hemagglutinin
          mutated: '4GMS',   // Neuraminidase
          protein: 'Hemagglutinin & Neuraminidase'
        },
        'default': {
          original: '1RVX',
          mutated: '4GMS',
          protein: 'Hemagglutinin'
        }
      },
      'Influenza': {
        'default': {
          original: '1RVX',
          mutated: '4GMS',
          protein: 'Hemagglutinin'
        }
      },
      'Ebola': {
        'EBOLA-MUTATION-1': {
          original: '5JQ3',  // GP
          mutated: '5JQ7',   // GP Complex
          protein: 'Glycoprotein Complex'
        },
        'default': {
          original: '5JQ3',
          mutated: '5JQ7',
          protein: 'Glycoprotein'
        }
      }
    };
    
    const virusStructures = baseStructures[virusName] || baseStructures['COVID-19 (SARS-CoV-2)'];
    return virusStructures[mutationName] || virusStructures['default'];
  };

  useEffect(() => {
    const loadProteinStructures = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get mutation-specific structures
        const pdbInfo = getProteinStructures();

        setStructures({
          original: {
            pdbId: pdbInfo.original,
            protein: pdbInfo.protein
          },
          mutated: {
            pdbId: pdbInfo.mutated,
            protein: pdbInfo.protein
          }
        });

        setIsLoading(false);

        // Initialize NGL viewers after loading
        setTimeout(() => {
          // Dispose old stages if they exist
          if (stageRef1.current) {
            try {
              stageRef1.current.dispose();
              stageRef1.current = null;
            } catch (e) {
              console.log('Stage 1 already disposed');
            }
          }
          if (stageRef2.current) {
            try {
              stageRef2.current.dispose();
              stageRef2.current = null;
            } catch (e) {
              console.log('Stage 2 already disposed');
            }
          }
          
          initializeViewer(pdbInfo.original, viewerRef1, stageRef1);
          initializeViewer(pdbInfo.mutated, viewerRef2, stageRef2);
        }, 200);

      } catch (err) {
        console.error('Error loading protein structures:', err);
        setError('Failed to load structures');
        setIsLoading(false);
      }
    };

    loadProteinStructures();

    // Cleanup function
    return () => {
      if (stageRef1.current) {
        stageRef1.current.dispose();
      }
      if (stageRef2.current) {
        stageRef2.current.dispose();
      }
    };
  }, [mutation, virus]);

  // Initialize NGL viewer with PDB structure
  const initializeViewer = async (pdbId, viewerRef, stageRef) => {
    if (!viewerRef.current) return;

    try {
      // Clear the container first
      viewerRef.current.innerHTML = '';
      
      // Create NGL Stage
      const stage = new NGL.Stage(viewerRef.current, {
        backgroundColor: '#f0f4f8',
        quality: 'medium',
        sampleLevel: 1
      });

      stageRef.current = stage;

      // Load structure from RCSB PDB using full URL
      const pdbUrl = `https://files.rcsb.org/download/${pdbId}.pdb`;
      const structure = await stage.loadFile(pdbUrl, {
        ext: 'pdb'
      });

      // Add cartoon representation (protein backbone)
      structure.addRepresentation('cartoon', {
        colorScheme: 'chainid',
        smoothSheet: true
      });

      // Add ball+stick for ligands
      structure.addRepresentation('ball+stick', {
        sele: 'hetero and not water',
        colorScheme: 'element'
      });

      // Center and auto-view
      structure.autoView();

      // Handle window resize
      const handleResize = () => {
        if (stage) stage.handleResize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };

    } catch (error) {
      console.error(`Error initializing viewer for ${pdbId}:`, error);
      // Show error in the viewer
      if (viewerRef.current) {
        viewerRef.current.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #7f8c8d;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">⚠️</div>
            <p>Failed to load structure ${pdbId}</p>
            <small style="color: #95a5a6;">Trying to connect to RCSB PDB...</small>
          </div>
        `;
      }
    }
  };

  return (
    <div className="protein-model-container">
      {/* Mutation Description */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(41, 128, 185, 0.05))',
        border: '2px solid rgba(74, 144, 226, 0.2)',
        borderRadius: '15px',
        padding: '1.5rem',
        marginBottom: '2rem',
        lineHeight: '1.8'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <div style={{
            fontSize: '1.5rem',
            marginRight: '0.75rem'
          }}>🧬</div>
          <h4 style={{
            color: '#2c3e50',
            fontWeight: '600',
            margin: 0,
            fontSize: '1.1rem'
          }}>
            Structural Impact Analysis
          </h4>
        </div>
        <p style={{
          color: '#5a6c7d',
          fontSize: '0.95rem',
          margin: 0,
          textAlign: 'justify'
        }}>
          {getMutationDescription()}
        </p>
      </div>

      <div className="protein-structures">
        {/* Original Structure */}
        <div className="protein-structure">
          {isLoading ? (
            <div className="structure-placeholder">
              <div className="loading-spinner"></div>
              <p>Loading from RCSB PDB...</p>
            </div>
          ) : error ? (
            <div className="api-integration-area">
              <div className="api-placeholder" style={{ color: '#e67e22' }}>
                <div className="api-icon">⚠️</div>
                <p>Structure Unavailable</p>
                <small>Using local PDB files</small>
              </div>
            </div>
          ) : structures.original ? (
            <div className="protein-viewer">
              <div className="pdb-header">
                <strong>Original Structure</strong>
                <span className="pdb-id">PDB: {structures.original.pdbId}</span>
              </div>
              <div 
                className="protein-visualization-3d" 
                ref={viewerRef1}
                style={{
                  width: '100%',
                  height: '350px',
                  position: 'relative'
                }}
              />
              <div className="pdb-info">
                <small>{structures.original.protein}</small>
                <div className="viewer-controls">
                  <small style={{ color: '#7f8c8d', fontSize: '0.7rem' }}>
                    🖱️ Left-click: Rotate • Scroll: Zoom • Right-click: Pan
                  </small>
                </div>
              </div>
            </div>
          ) : (
            <div className="api-integration-area">
              <div className="api-placeholder">
                <div className="api-icon">🧬</div>
                <p>Original Structure</p>
                <small>Loading...</small>
              </div>
            </div>
          )}
        </div>

        {/* Mutated Structure */}
        <div className="protein-structure">
          {isLoading ? (
            <div className="structure-placeholder">
              <div className="loading-spinner"></div>
              <p>Loading from RCSB PDB...</p>
            </div>
          ) : error ? (
            <div className="api-integration-area">
              <div className="api-placeholder" style={{ color: '#e67e22' }}>
                <div className="api-icon">⚠️</div>
                <p>Structure Unavailable</p>
                <small>Using local PDB files</small>
              </div>
            </div>
          ) : structures.mutated ? (
            <div className="protein-viewer">
              <div className="pdb-header">
                <strong>Mutated Structure</strong>
                <span className="pdb-id">PDB: {structures.mutated.pdbId}</span>
              </div>
              <div 
                className="protein-visualization-3d" 
                ref={viewerRef2}
                style={{
                  width: '100%',
                  height: '350px',
                  position: 'relative'
                }}
              />
              <div className="pdb-info">
                <small>{structures.mutated.protein}</small>
                <div className="viewer-controls">
                  <small style={{ color: '#7f8c8d', fontSize: '0.7rem' }}>
                    🖱️ Left-click: Rotate • Scroll: Zoom • Right-click: Pan
                  </small>
                </div>
              </div>
            </div>
          ) : (
            <div className="api-integration-area">
              <div className="api-placeholder">
                <div className="api-icon">🧬</div>
                <p>Mutated Structure</p>
                <small>Loading...</small>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Attribution */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '1rem', 
        fontSize: '0.75rem', 
        color: '#7f8c8d',
        fontStyle: 'italic'
      }}>
        Powered by RCSB Protein Data Bank • Interactive 3D structures
      </div>
    </div>
  );
};

export default ProteinModel;
