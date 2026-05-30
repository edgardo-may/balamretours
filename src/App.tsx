import type { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ToursCatalog from './components/Tours/ToursCatalog';
import TourDetailPagePro from './components/Tours/TourDetailPagePro';
import PoliticasCancelacion from './pages/PoliticasCancelacion';
import TerminosCondiciones from './pages/TerminosCondiciones';
import ExencionResponsabilidad from './pages/ExencionResponsabilidad';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tours" element={<ToursCatalog />} />
      <Route path="/tours/:id" element={<TourDetailPagePro />} />
      <Route path="/politicas-de-cancelacion" element={<PoliticasCancelacion />} />
      <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
      <Route path="/exencion-de-responsabilidad" element={<ExencionResponsabilidad />} />
    </Routes>
  );
};

export default App;