import React, { useEffect, useState } from 'react';

const MoleculeCard = ({ drugData }) => {
  const drug = drugData || {};
  const drugName = drug.drug_name || 'Predicted Drug';
  const smiles = drug.smiles || 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O';
  const [imageError, setImageError] = useState(false);

  // Generate 2D molecular structure image from SMILES using PubChem API
  const getMoleculeImageUrl = () => {
    if (!smiles || smiles === 'Structure pending AI generation') {
      return null;
    }
    
    // Use PubChem Image API to generate 2D structure from SMILES
    // This is a free, public API that converts SMILES to images
    const encodedSmiles = encodeURIComponent(smiles);
    return `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodedSmiles}/PNG?image_size=large`;
  };

  const imageUrl = getMoleculeImageUrl();

  return (
    <div className="molecule-card">
      <h3>Top Drug Structure</h3>
      <div className="drug-name-header" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ color: '#4A90E2', marginBottom: '0.5rem' }}>{drugName}</h2>
        {drug.approval_status && (
          <span style={{ 
            backgroundColor: '#4A90E2', 
            color: 'white', 
            padding: '0.25rem 0.75rem', 
            borderRadius: '15px', 
            fontSize: '0.8rem' 
          }}>
            {drug.approval_status}
          </span>
        )}
      </div>
      <div className="molecule-visualization" style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '15px',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #e9ecef'
      }}>
        {imageUrl && !imageError ? (
          <img 
            src={imageUrl}
            alt={`Molecular structure of ${drugName}`}
            style={{
              maxWidth: '100%',
              maxHeight: '280px',
              objectFit: 'contain'
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="molecule-placeholder">
            <div className="molecule-icon" style={{ fontSize: '4rem', marginBottom: '1rem' }}>💊</div>
            <p style={{ color: '#7f8c8d' }}>Molecular structure rendering...</p>
          </div>
        )}
      </div>
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f4f8', borderRadius: '10px' }}>
        <p style={{ fontSize: '0.85rem', color: '#5a6c7d', marginBottom: '0.5rem' }}>
          <strong>SMILES:</strong>
        </p>
        <p style={{ 
          fontSize: '0.75rem', 
          color: '#7f8c8d', 
          fontFamily: 'monospace', 
          wordBreak: 'break-all',
          maxHeight: '100px',
          overflow: 'auto'
        }}>
          {smiles}
        </p>
      </div>
      <p className="molecule-subtext">
        {drug.molecular_weight && drug.logP 
          ? `MW: ${drug.molecular_weight.toFixed(1)} Da • LogP: ${drug.logP.toFixed(2)}`
          : 'AI-generated molecular structure based on predicted viral binding sites.'}
      </p>
    </div>
  );
};

export default MoleculeCard;
