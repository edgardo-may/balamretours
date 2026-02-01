import React from 'react';

interface CenoteIconProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const CenoteIcon: React.FC<CenoteIconProps> = ({ 
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
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="6" fill={color} fillOpacity="0.3" />
      <circle cx="12" cy="12" r="3" fill={color} />
      <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
};

export default CenoteIcon;