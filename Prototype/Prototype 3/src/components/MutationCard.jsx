import React from 'react';

const MutationCard = ({ mutation, isSelected, onClick, isAnimating }) => {
  // Get mutation image URL (using virus/variant images)
  const getMutationImage = () => {
    const mutationName = mutation.name || mutation.id;
    
    // Map mutations to virus particle images
    const imageMap = {
      'ALPHA': 'https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_1280.png',
      'BETA': 'https://cdn.pixabay.com/photo/2020/03/19/21/35/covid-4948866_1280.png',
      'GAMMA': 'https://cdn.pixabay.com/photo/2020/04/10/17/39/bacteria-5026907_1280.png',
      'DELTA': 'https://cdn.pixabay.com/photo/2020/03/12/15/00/virus-4925461_1280.png',
      'OMICRON': 'https://cdn.pixabay.com/photo/2021/12/03/13/32/omicron-6843408_1280.png',
      'default': 'https://cdn.pixabay.com/photo/2020/04/18/08/33/coronavirus-5058247_1280.png'
    };
    
    // Extract variant name
    const variantKey = mutationName.toUpperCase().includes('ALPHA') ? 'ALPHA' :
                       mutationName.toUpperCase().includes('BETA') ? 'BETA' :
                       mutationName.toUpperCase().includes('GAMMA') ? 'GAMMA' :
                       mutationName.toUpperCase().includes('DELTA') ? 'DELTA' :
                       mutationName.toUpperCase().includes('OMICRON') ? 'OMICRON' :
                       'default';
    
    return imageMap[variantKey] || imageMap.default;
  };

  return (
    <div 
      className={`mutation-card-vertical ${isSelected ? 'selected' : ''} ${isAnimating ? 'sliding-to-sidebar' : ''}`}
      onClick={onClick}
    >
      <div className="mutation-card-image">
        <img 
          src={getMutationImage()}
          alt={mutation.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x150/4A90E2/FFFFFF?text=Virus';
          }}
        />
      </div>
      <div className="mutation-card-content">
        <h4>{mutation.name}</h4>
        <p className="mutation-brief">{mutation.description}</p>
      </div>
    </div>
  );
};

export default MutationCard;
