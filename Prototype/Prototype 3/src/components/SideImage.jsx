import React from 'react';

const SideImage = ({ src, alt, position }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`side-image ${position}`}
    />
  );
};

export default SideImage;

