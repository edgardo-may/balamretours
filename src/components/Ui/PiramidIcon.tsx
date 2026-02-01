import React from 'react';

interface PyramidIconProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const PyramidIcon: React.FC<PyramidIconProps> = ({ 
  size = 'md', 
  color = 'currentColor',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <svg 
      className={`${sizeClasses[size]} ${className}`}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L2 22H22L12 2ZM12 5L19 19H5L12 5Z" />
      <path d="M12 8L15 14H9L12 8Z" fillOpacity="0.7" />
    </svg>
  );
};

export default PyramidIcon;