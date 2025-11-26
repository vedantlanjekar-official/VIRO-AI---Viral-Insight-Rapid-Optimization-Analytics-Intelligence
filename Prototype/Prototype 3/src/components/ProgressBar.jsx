import React from 'react';

const ProgressBar = ({ score, color = 'blue', size = 'normal' }) => {
  const getColorClass = () => {
    switch (color) {
      case 'red': return 'progress-red';
      case 'orange': return 'progress-orange';
      case 'green': return 'progress-green';
      default: return 'progress-blue';
    }
  };

  return (
    <div className={`progress-bar ${getColorClass()} ${size === 'small' ? 'progress-small' : ''}`}>
      <div 
        className="progress-fill"
        style={{ width: `${score}%` }}
      />
    </div>
  );
};

export default ProgressBar;
