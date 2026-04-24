import { useState } from 'react';
import type { FC } from 'react';
import Navbar from '../components/Sections/Navbar';
import Hero from '../components/Sections/Hero';
import Tours from '../components/Sections/Tours';
import Benefits from '../components/Sections/Benefits';
import Testimonials from '../components/Sections/Testimonials';
import FinalCTA from '../components/Sections/FinalCTA';
import MapSection from '../components/Sections/MapSection';
import Footer from '../components/Sections/Footer';
import FloatingWhatsApp from '../components/Ui/FloatingWhatsApp';
import Modal from '../components/Ui/Modal';
import BookingForm from '../components/Sections/BookingForm';

const Home: FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<string | undefined>(undefined);

  const handleOpenBooking = (tourId?: string) => {
    setSelectedTourId(tourId);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      
      <main>
        <Hero />
        <Tours />
        <MapSection />
        <Benefits />
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
      
      <FloatingWhatsApp />

      {/* Booking Modal */}
      <Modal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
        title="Reserva tu Experiencia"
      >
        <BookingForm 
          selectedTourId={selectedTourId} 
          onSuccess={() => setIsBookingModalOpen(false)} 
        />
      </Modal>
    </div>
  );
};

export default Home;
