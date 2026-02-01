import React from 'react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-20 bg-white/80 backdrop-blur-md border-b border-[#f4f2f0]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">temple_buddhist</span>
          <span className="font-bold text-xl tracking-tight text-[#181411]">BalamRETours</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Inicio</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="destinations">Tours</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Contacto</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="md:hidden text-[#181411]">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;