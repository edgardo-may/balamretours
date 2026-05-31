import type { FC } from 'react';
import Navbar from '../components/Sections/Navbar';
import HeroCarousel from '../components/Sections/HeroCarousel';
import OfertasEspeciales from '../components/Sections/OfertasEspeciales';
import Tours from '../components/Sections/Tours';
import Benefits from '../components/Sections/Benefits';
import Testimonials from '../components/Sections/Testimonials';
import FinalCTA from '../components/Sections/FinalCTA';
import MapSection from '../components/Sections/MapSection';
import Footer from '../components/Sections/Footer';
import FloatingWhatsApp from '../components/Ui/FloatingWhatsApp';

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-caliza-50 font-sans selection:bg-cenote-100 selection:text-cenote-900">
      <Navbar />
      
      <main>
        <HeroCarousel />
        <OfertasEspeciales />
        <Tours />
        <Benefits />
        <MapSection />
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
      
      <FloatingWhatsApp />
    </div>
  );
};

export default Home;
