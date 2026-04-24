import { useState, type FC } from "react";
import TourList from "./TourList";
import TourDetail from "./TourDetail";
import { useTourDetails } from "../../hooks/useTours";
import { Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const TourBookingModule: FC = () => {
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const { tour, loading: detailLoading } = useTourDetails(selectedTourId);

  const handleSelectTour = (id: string) => {
    setSelectedTourId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedTourId(null);
  };

  return (
    <section id="experiencias" className="bg-slate-50 min-h-[600px]">
      <Toaster position="top-right" expand={true} richColors />
      
      <AnimatePresence mode="wait">
        {!selectedTourId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TourList onSelectTour={handleSelectTour} />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {detailLoading ? (
              <div className="flex items-center justify-center min-h-[600px]">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
                  <p className="text-slate-500 font-bold">Cargando detalles...</p>
                </div>
              </div>
            ) : tour ? (
              <TourDetail tour={tour} onBack={handleBack} />
            ) : (
              <div className="text-center py-24">
                <p className="text-red-500 font-bold">No se encontró el tour seleccionado.</p>
                <button onClick={handleBack} className="mt-4 text-teal-600 font-bold">Volver al listado</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TourBookingModule;
