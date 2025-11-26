import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SideImage from '../components/SideImage';
import Navigation from '../components/Navigation';
import MoleculeCard from '../components/MoleculeCard';
import DescriptionCard from '../components/DescriptionCard';
import DrugTable from '../components/DrugTable';
import Footer from '../components/Footer';
import { predictBinding, getTopDrugs } from '../services/api';
import '../styles/DrugAntidotePage.css';

const DrugAntidotePage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [drugData, setDrugData] = useState(null);
  const [error, setError] = useState(null);
  
  // Get virus and mutation info from navigation state
  const virus = location.state?.virus;
  const mutation = location.state?.mutation;

  useEffect(() => {
    const fetchDrugPredictions = async () => {
      try {
        setLoading(true);
        setError(null);

        // If we have a virus from the mutation dashboard, use it
        if (virus && virus.backend_id) {
          // Get the first available protein for this virus
          const proteinIds = Object.keys(virus.proteins || {});
          const proteinPdbId = proteinIds[0];

          if (proteinPdbId) {
            // Fetch drug predictions from backend
            const result = await predictBinding({
              virus_id: virus.backend_id,
              protein_pdb_id: proteinPdbId,
              top_n: 10,
            });

            if (result.success) {
              setDrugData(result.data);
            } else {
              console.error('Failed to fetch drug predictions:', result.error);
              setError(result.error);
            }
          }
        } else {
          // Fallback: Get top drugs for SARS-CoV-2 if no virus specified
          const result = await getTopDrugs('SARS-CoV-2', 10);
          if (result.success) {
            setDrugData(result.data);
          } else {
            setError(result.error);
          }
        }
      } catch (err) {
        console.error('Error fetching drug predictions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugPredictions();
  }, [virus, mutation]);

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
      <div className="drug-antidote-page">
        <div className="page-header">
          <h1>Drug / Antidote Prediction</h1>
          <p>AI-powered drug analysis for {virus ? virus.name : 'selected virus mutation'}</p>
          {drugData && (
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ color: '#4A90E2', fontSize: '0.9rem' }}>
                ✓ Analysis complete • {drugData.drugs_screened} drugs screened • {drugData.processing_time_ms}ms
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#5a6c7d' }}>
            <div className="loading-spinner" style={{ margin: '0 auto 1rem', width: '50px', height: '50px', border: '5px solid rgba(74, 144, 226, 0.3)', borderTop: '5px solid #4A90E2', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <h3>Running AI Drug Screening...</h3>
            <p>Analyzing drug-virus binding affinities</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: '#e67e22', fontSize: '1.1rem' }}>⚠️ Backend offline - using fallback data</p>
            <div className="drug-visualization-section">
              <div className="visualization-grid">
                <MoleculeCard drugData={null} />
                <DescriptionCard drugData={null} />
              </div>
            </div>
            <div className="drugs-table-section">
              <h2>Available Drugs in Market</h2>
              <DrugTable drugs={null} />
            </div>
          </div>
        ) : (
          <>
            {/* Top Section - Drug Visualization */}
            <div className="drug-visualization-section">
              <div className="visualization-grid">
                <MoleculeCard drugData={drugData?.top_candidates[0]} />
                <DescriptionCard drugData={drugData} />
              </div>
            </div>

            {/* Middle Section - Available Drugs Table */}
            <div className="drugs-table-section">
              <h2>Available Drugs in Market</h2>
              <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                Ranked by predicted binding affinity • Model: {drugData?.model_version}
              </p>
              <DrugTable drugs={drugData?.top_candidates} />
            </div>
          </>
        )}

        {/* Bottom Section - Disclaimer */}
        <div className="disclaimer-section">
          <p className="disclaimer-text">
            ⚠️ The suggested drug is an AI-predicted candidate and is <strong>not deployment-ready</strong>. 
            Laboratory validation and clinical research are required before use.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default DrugAntidotePage;
