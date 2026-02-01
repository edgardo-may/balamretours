import React from 'react';
import Navigation from './components/Layout/Navigation';
import FloatingCTA from './components/Layout/FlotingCTA';
import Footer from './components/Layout/Footer';
import Hero from './components/Sections/Hero';
import Intro from './components/Sections/Intro';
import Tours from './components/Sections/Tour';
import MapStats from './components/Sections/MapStats';
import Testimonials from './components/Sections/Testimonials';
import OurStorySimple from './components/Sections/OurStory';

const App: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#181411] font-display antialiased overflow-x-hidden relative">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grain opacity-50 mix-blend-multiply"></div>
      
      <Navigation />
      <FloatingCTA />
      
      <main>
        <Hero />
        <Intro />
        <OurStorySimple />
        <Tours />
        <MapStats />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default App;