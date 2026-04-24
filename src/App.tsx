import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ToursCatalog from './components/Tours/ToursCatalog';
import TourDetailPagePro from './components/Tours/TourDetailPagePro';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tours" element={<ToursCatalog />} />
      <Route path="/tours/:id" element={<TourDetailPagePro />} />
    </Routes>
  );
};

export default App;