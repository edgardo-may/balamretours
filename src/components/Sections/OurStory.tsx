import React from 'react';

const WatchOurStory: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Fondo con mar y arena */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.1&auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
      </div>
      
      {/* Contenido centrado */}
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        
        {/* Badge/Tag */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-full mb-10">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="text-sm font-medium tracking-wide">MIRA NUESTRA HISTORIA</span>
        </div>
        
        {/* Título principal */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-none tracking-tight">
          Inolvidables
          <br />
          <span className="text-amber-400">Experiencias de viaje</span>
        </h1>
        
        {/* Botones centrados */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-full text-lg font-semibold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 min-w-[200px]">
            <span className="flex items-center justify-center gap-3">
              Contactanos 
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WatchOurStory;
