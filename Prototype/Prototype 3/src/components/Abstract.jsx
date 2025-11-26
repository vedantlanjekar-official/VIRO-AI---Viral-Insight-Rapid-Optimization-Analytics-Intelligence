import React from 'react';

const Abstract = ({ onAnalyzeClick }) => {
  const handleAnalyzeClick = () => {
    if (onAnalyzeClick) {
      onAnalyzeClick();
    } else {
      console.log('Navigate to analysis page - to be implemented');
    }
  };

  return (
    <section className="abstract-section">
      <div className="abstract-box">
        <h2>Revolutionizing Viral Research with AI</h2>
        <p>
          Viro-AI combines cutting-edge artificial intelligence with bioinformatics to predict viral mutations, 
          analyze their potential threat levels, and identify the most effective drug candidates. Our platform 
          empowers researchers and healthcare professionals with rapid, accurate insights for pandemic preparedness 
          and response.
        </p>
      </div>
      <button className="cta-button" onClick={handleAnalyzeClick}>
        ANALYZE VIRUSES
      </button>
    </section>
  );
};

export default Abstract;

