import React from 'react';

const FloatingCTA: React.FC = () => {
  return (
    <a 
      className="floating-cta fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-full text-white shadow-xl cursor-pointer group"
      href="tours"
    >
      <span className="font-bold tracking-wide">Explorar Tours</span>
      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
    </a>
  );
};

export default FloatingCTA;