import { useEffect, useRef, useState } from 'react';

// @ts-ignore
import * as $3Dmol from '3dmol';

export default function ThreeDPanel() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewer, setViewer] = useState<any>(null);
  const [currentProtein, setCurrentProtein] = useState('6vsb'); // SARS-CoV-2 Spike protein
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationId, setAnimationId] = useState<number | null>(null);
  const [storyMode, setStoryMode] = useState(false);
  const [storyPhase, setStoryPhase] = useState(0); // 0: normal, 1: virus attack, 2: mutation, 3: antidote, 4: cure

  useEffect(() => {
    if (viewerRef.current && !viewer) {
      // Initialize 3Dmol viewer
      const mol3dViewer = $3Dmol.createViewer(viewerRef.current, {
        backgroundColor: 'black'
      });
      
      setViewer(mol3dViewer);
      
      // Load real protein structure from PDB
      loadProteinStructure(mol3dViewer, currentProtein);
    }
  }, []);

  const loadProteinStructure = async (mol3dViewer: any, pdbId: string) => {
    setIsLoading(true);
    
    try {
      // Fetch PDB structure
      const response = await fetch(`https://files.rcsb.org/view/${pdbId}.pdb`);
      const pdbData = await response.text();
      
      // Clear previous structure
      mol3dViewer.clear();
      
      // Add the protein structure
      mol3dViewer.addModel(pdbData, "pdb");
      
      // Set visual style - cartoon representation for proteins
      mol3dViewer.setStyle({}, {
        cartoon: {
          color: 'spectrum',
          thickness: 0.8
        },
        stick: {
          radius: 0.2,
          colorscheme: 'Jmol'
        }
      });
      
      // Add surface representation
      mol3dViewer.addSurface($3Dmol.SurfaceType.VDW, {
        opacity: 0.3,
        color: 'white'
      });
      
      // Center and zoom to fit
      mol3dViewer.zoomTo();
      mol3dViewer.render();
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading protein:', error);
      setIsLoading(false);
    }
  };

  const handleZoom = (factor: number) => {
    if (viewer) {
      viewer.zoom(factor > 1 ? 0.8 : 1.2);
      viewer.render();
    }
  };

  const handleRotate = () => {
    if (viewer) {
      viewer.rotate(45, 'y');
      viewer.render();
    }
  };

  const handleReset = () => {
    if (viewer) {
      // Stop animation if playing
      if (isPlaying) {
        handlePlayPause();
      }
      // Stop story mode if active
      if (storyMode) {
        if (animationId) {
          cancelAnimationFrame(animationId);
          setAnimationId(null);
        }
        setStoryMode(false);
        setStoryPhase(0);
        loadProteinStructure(viewer, currentProtein);
      } else {
        viewer.zoomTo();
        viewer.render();
      }
    }
  };

  const handlePlayPause = () => {
    if (!viewer) return;

    if (isPlaying) {
      // Stop animation
      if (animationId) {
        cancelAnimationFrame(animationId);
        setAnimationId(null);
      }
      setIsPlaying(false);
    } else {
      // Start animation
      setIsPlaying(true);
      const animate = () => {
        if (viewer) {
          viewer.rotate(2, 'y'); // Rotate 2 degrees per frame
          viewer.render();
          const id = requestAnimationFrame(animate);
          setAnimationId(id);
        }
      };
      animate();
    }
  };

  const handleStoryAnimation = () => {
    if (!viewer) return;

    if (storyMode) {
      // Stop story animation
      if (animationId) {
        cancelAnimationFrame(animationId);
        setAnimationId(null);
      }
      setStoryMode(false);
      setStoryPhase(0);
      // Reset to normal protein view
      loadProteinStructure(viewer, currentProtein);
    } else {
      // Start story animation
      setStoryMode(true);
      setStoryPhase(1);
      runStoryAnimation();
    }
  };

  const runStoryAnimation = () => {
    if (!viewer) return;

    let phase = 1;
    const storyDuration = 20000; // 20 seconds total
    const phaseDuration = storyDuration / 5; // 4 seconds per phase

    const animateStory = (timestamp: number, startTime: number = timestamp) => {
      const elapsed = timestamp - startTime;
      const currentPhase = Math.floor(elapsed / phaseDuration) + 1;

      if (currentPhase !== phase) {
        phase = currentPhase;
        setStoryPhase(phase);
        updateStoryVisuals(phase);
      }

      // Continue rotating during story
      viewer.rotate(1, 'y');
      viewer.render();

      if (elapsed < storyDuration && storyMode) {
        const id = requestAnimationFrame((ts) => animateStory(ts, startTime));
        setAnimationId(id);
      } else {
        // Story finished
        setStoryMode(false);
        setStoryPhase(0);
        loadProteinStructure(viewer, currentProtein);
      }
    };

    requestAnimationFrame(animateStory);
  };

  const updateStoryVisuals = async (phase: number) => {
    if (!viewer) return;

    try {
      // Use the current protein structure for story
      const response = await fetch(`https://files.rcsb.org/view/${currentProtein}.pdb`);
      const pdbData = await response.text();
      
      viewer.clear();
      viewer.addModel(pdbData, "pdb");

      switch (phase) {
        case 1: // Virus attack - protein under stress (red, enlarged)
          viewer.setStyle({}, {
            cartoon: { color: 'red', thickness: 1.2 },
            stick: { radius: 0.3, colorscheme: 'redCarbon' }
          });
          viewer.addSurface($3Dmol.SurfaceType.VDW, { opacity: 0.6, color: 'red' });
          break;

        case 2: // Mutation occurs - unstable structure (orange, distorted)
          viewer.setStyle({}, {
            cartoon: { color: 'orange', thickness: 1.0 },
            stick: { radius: 0.25, colorscheme: 'orangeCarbon' }
          });
          viewer.addSurface($3Dmol.SurfaceType.VDW, { opacity: 0.5, color: 'orange' });
          break;

        case 3: // Antidote arrives - neutralization begins (yellow)
          viewer.setStyle({}, {
            cartoon: { color: 'yellow', thickness: 0.9 },
            stick: { radius: 0.2, colorscheme: 'yellowCarbon' }
          });
          viewer.addSurface($3Dmol.SurfaceType.VDW, { opacity: 0.4, color: 'yellow' });
          break;

        case 4: // Healing begins - structure stabilizing (cyan)
          viewer.setStyle({}, {
            cartoon: { color: 'cyan', thickness: 0.8 },
            stick: { radius: 0.2, colorscheme: 'cyanCarbon' }
          });
          viewer.addSurface($3Dmol.SurfaceType.VDW, { opacity: 0.3, color: 'cyan' });
          break;

        case 5: // Fully cured - healthy protein (green)
          viewer.setStyle({}, {
            cartoon: { color: 'green', thickness: 0.8 },
            stick: { radius: 0.2, colorscheme: 'greenCarbon' }
          });
          viewer.addSurface($3Dmol.SurfaceType.VDW, { opacity: 0.3, color: 'green' });
          break;
      }
      
      viewer.zoomTo();
      viewer.render();
    } catch (error) {
      console.error('Error updating story visuals:', error);
    }
  };

  const getStoryPhaseColor = (phase: number) => {
    switch (phase) {
      case 1: return '#ff6b6b'; // Red for virus attack
      case 2: return '#ff9f43'; // Orange for mutation
      case 3: return '#ffd93d'; // Yellow for antidote arrival
      case 4: return '#4ecdc4'; // Cyan for healing
      case 5: return '#6bcf7f'; // Green for cure
      default: return '#666';
    }
  };

  const getStoryPhaseTitle = (phase: number) => {
    switch (phase) {
      case 1: return '🦠 Virus Attack Phase';
      case 2: return '🧬 Mutation Occurring';
      case 3: return '💊 Antidote Deployment';
      case 4: return '🔄 Healing Process';
      case 5: return '✅ Protein Restored';
      default: return 'Ready to Start';
    }
  };

  const getStoryPhaseDescription = (phase: number) => {
    switch (phase) {
      case 1: return 'Virus particles are binding to the protein surface, causing structural stress';
      case 2: return 'Protein structure is changing due to viral interference, mutations are forming';
      case 3: return 'Therapeutic antidote molecules are approaching the infected protein';
      case 4: return 'Antidote is neutralizing viral effects and restoring protein function';
      case 5: return 'Protein has been fully restored to its healthy, functional state';
      default: return 'Watch the complete virus attack and cure animation';
    }
  };

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [animationId]);

  const switchProtein = (pdbId: string) => {
    if (viewer && pdbId !== currentProtein) {
      // Stop animation when switching proteins
      if (isPlaying) {
        handlePlayPause();
      }
      setCurrentProtein(pdbId);
      loadProteinStructure(viewer, pdbId);
    }
  };

  return (
    <div className="panel-body">
      <div className="viewer-controls">
        <button className="btn small" onClick={() => handleZoom(1.3)} disabled={isLoading}>🔍+ Zoom</button>
        <button className="btn small" onClick={() => handleZoom(0.7)} disabled={isLoading}>🔍− Zoom</button>
        <button className="btn small" onClick={handleRotate} disabled={isLoading}>🔄 Rotate</button>
        <button 
          className="btn small" 
          onClick={handlePlayPause} 
          disabled={isLoading || storyMode}
          style={{
            backgroundColor: isPlaying ? '#ff6b6b' : '#4ecdc4',
            color: 'white',
            border: 'none'
          }}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button 
          className="btn small" 
          onClick={handleStoryAnimation} 
          disabled={isLoading}
          style={{
            backgroundColor: storyMode ? '#ff9f43' : '#6bcf7f',
            color: 'white',
            border: 'none'
          }}
        >
          {storyMode ? '⏹️ Stop Story' : '🎬 Story Mode'}
        </button>
        <button className="btn small" onClick={handleReset} disabled={isLoading}>⚡ Reset</button>
      </div>

      <div className="protein-selector" style={{marginBottom: '10px'}}>
        <select 
          onChange={(e) => switchProtein(e.target.value)} 
          value={currentProtein}
          disabled={isLoading}
          style={{
            padding: '5px 10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '12px'
          }}
        >
          <option value="6vsb">SARS-CoV-2 Spike Protein</option>
          <option value="1bna">DNA Double Helix</option>
          <option value="3dna">DNA-Protein Complex</option>
          <option value="2hb1">Hemoglobin</option>
          <option value="1crn">Crambin (Small Protein)</option>
        </select>
      </div>

      <div 
        ref={viewerRef}
        style={{ 
          width: '100%', 
          height: '350px', 
          border: '1px solid #e6edf7',
          borderRadius: '8px',
          backgroundColor: '#000000',
          position: 'relative'
        }}
      >
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#fff',
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.8)',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <div style={{fontSize: '24px', marginBottom: '8px', animation: 'pulse 2s infinite'}}>⏳</div>
            <p>Loading real protein structure...</p>
          </div>
        )}
      </div>
      
      <div className="legend" style={{marginTop: '12px', fontSize: '12px'}}>
        <span className="dot red" /> α-helices
        <span className="dot blue" /> β-sheets  
        <span className="dot yellow" /> Active sites
      </div>
      
      <div className="protein-info" style={{marginTop: '12px', fontSize: '13px'}}>
        {storyMode ? (
          <div>
            <p><strong>🎬 Interactive Story Mode</strong></p>
            <div style={{
              padding: '10px',
              backgroundColor: getStoryPhaseColor(storyPhase),
              borderRadius: '6px',
              marginTop: '8px',
              color: 'white'
            }}>
              <strong>{getStoryPhaseTitle(storyPhase)}</strong>
              <div style={{fontSize: '12px', marginTop: '4px'}}>
                {getStoryPhaseDescription(storyPhase)}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p><strong>Real Molecular Structure from PDB</strong></p>
            <p>Interactive 3D visualization using actual research data</p>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
