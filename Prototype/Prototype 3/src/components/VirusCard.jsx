import React from 'react';

const VirusCard = ({ virus, onSelect }) => {
  return (
    <div className="virus-card" onClick={onSelect}>
      <div className="virus-icon">🦠</div>
      <h3>{virus.name}</h3>
      <p className="virus-type">{virus.type}</p>
      <div className="mutation-count">
        {virus.mutations.length} mutation{virus.mutations.length !== 1 ? 's' : ''} detected
      </div>
    </div>
  );
};

export default VirusCard;
