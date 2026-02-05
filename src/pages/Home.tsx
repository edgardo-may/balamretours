import React, { useState } from 'react';
import ChatWidget from '../components/Layout/ChatWidget';
import Hero from '../components/Sections/Hero';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Intro from '../components/Sections/Intro';
import Tours from '../components/Sections/Tour';
import MapStats from '../components/Sections/MapStats';
import Testimonials from '../components/Sections/Testimonials';
import OurStorySimple from '../components/Sections/OurStory';
import ContactForm from '../components/ContactForm';

const Home: React.FC = () => {
   const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  return (
    <>
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grain opacity-50 mix-blend-multiply"></div>
      
      <Header onOpenContact={() => setContactModalOpen(true)} />
      <ChatWidget />
      
      <main>
        <Hero />
        <Intro />
        <OurStorySimple />
        <Tours />
        <MapStats />
        <Testimonials />
      </main>

      <ContactForm 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
      />
      <Footer />
    </>
  );
};

export default Home;