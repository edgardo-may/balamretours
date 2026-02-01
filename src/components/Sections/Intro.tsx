import React from 'react';

const Intro: React.FC = () => {
  return (
    <section className="py-24 bg-background-light relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-start justify-between">
          <div className="md:w-1/3">
            <h2 className="text-secondary text-sm font-bold tracking-[0.2em] uppercase mb-4">
              La Experiencia 
            </h2>
            <h3 className="text-3xl font-bold leading-tight text-[#181411]">
              Donde la Historia Antigua Se Encuentra con la Maravilla Natural
            </h3>
          </div>
          
          <div className="md:w-2/3 md:pl-12 border-l border-gray-200">
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
              Creamos viajes que combinan la emoción intelectual de la historia maya con la belleza visceral 
              de los santuarios naturales ocultos. Olvídate de los autobuses llenos de gente; 
              descubre la peninsula tal como debe ser visto: salvaje, sagrado y sereno.
            </p>
            
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">diversity_3</span>
                <span className="font-medium text-sm">Grupos Pequeños</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">verified_user</span>
                <span className="font-medium text-sm">Guias Certificados</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">local_activity</span>
                <span className="font-medium text-sm">Boletos Incluidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;