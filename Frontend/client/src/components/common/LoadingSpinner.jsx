import React from 'react';
import pawImage from '../../assets/paw.png';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img 
        src={pawImage} 
        alt="Loading..." 
        className="w-16 h-16 origin-center animate-[spin_3s_linear_infinite] drop-shadow-[0_0_8px_rgba(107,70,193,0.5)]"
      />
    </div>
  );
};

export default LoadingSpinner;