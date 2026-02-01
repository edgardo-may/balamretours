import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden z-10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
           style={{ 
             backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCSu9F8BRtdBLwhb95FiOk15pCPcB_wHIJYy9b9BBvL8FRioix5SdQzxbGPyQ187aHV2kxWMOHU5OpSoICEhdQzBuAIt3EA3bAAu6EioRYe6FVpn5g8TLMo1n9EgUYfdh4IZyPGfgLHgNag91JmHjR273pfqKtLtVnQ1OS9vWgfgvx0PPi0DEiPjkqVkbHCRvYGx-pXQ002qltCYFeQZdHnmv7qTH8tEP8Od_drzJ-WGllhrC5CvhGmHjN_lkeushLSfLKz9QVakgc')` 
           }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center text-white max-w-4xl pt-20">
        <h1 className="text-5xl md:text-7xl lg:text-7xl font-bold leading-none tracking-tighter mb-6 drop-shadow-lg scroll-reveal" style={{ animationDelay: '0.1s' }}>
          Descubre el mundo con nuestras <span className="text-primary italic">experiencias</span>.
        </h1>
        <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold leading-none tracking-tighter mb-8 drop-shadow-lg scroll-reveal" style={{ animationDelay: '0.3s' }}>
          únicas.
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 text-white/90 scroll-reveal" style={{ animationDelay: '0.5s' }}>
          Excursiones arqueológicas exclusivas e inmersiones privadas en cenotes en el corazón de la Peninsula de Yucatán.
        </p>
        <div className="scroll-reveal" style={{ animationDelay: '0.7s' }}>
          <button className="bg-white text-primary hover:bg-gray-100 transition-colors px-8 py-4 rounded-full font-bold text-lg tracking-wide inline-flex items-center gap-2">
            Explorar Tours
            <span className="material-symbols-outlined text-sm">arrow_downward</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;