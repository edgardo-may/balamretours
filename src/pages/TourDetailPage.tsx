import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTourDetails } from "../hooks/useTours";
import TourDetail from "../components/TourBooking/TourDetail";
import { Loader2, ArrowLeft } from "lucide-react";
import { Toaster } from "sonner";

const TourDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tour, loading, error } = useTourDetails(id || null);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold">Cargando la aventura...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <div className="bg-red-50 p-6 rounded-3xl border border-red-100 max-w-md">
          <h2 className="text-2xl font-black text-red-600 mb-2">¡Oops! Algo salió mal</h2>
          <p className="text-slate-600 mb-6">{error || "No pudimos encontrar el tour que buscas."}</p>
          <button 
            onClick={() => navigate('/tours')}
            className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-teal-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a los tours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Toaster position="top-right" expand={true} richColors />
      <TourDetail 
        tour={tour} 
        onBack={() => navigate(-1)} 
      />
    </div>
  );
};

export default TourDetailPage;
