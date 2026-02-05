import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ToursPage from './pages/Destination';
import ContactPage from './pages/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-background-light dark:bg-background-dark text-[#181411] font-display antialiased overflow-x-hidden relative min-h-screen">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;