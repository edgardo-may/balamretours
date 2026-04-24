import { useState, type FC } from "react";
import { LayoutGrid, List, Search, Loader2 } from "lucide-react";
import {
  useTours,
  type TourFilters,
  type TourSortOrder,
} from "../../hooks/useTours";
import TourFiltersComp from "./TourFilters";
import { TourCard, TourListItem } from "./TourItems";
import { TourSkeletonCard, TourSkeletonList } from "./TourSkeleton";
import { motion, AnimatePresence } from "framer-motion";

interface TourListProps {
  onSelectTour: (id: string) => void;
}

const TourList: FC<TourListProps> = ({ onSelectTour }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<TourFilters>({ category: "all" });
  const [sortBy, setSortBy] = useState<TourSortOrder>("newest");
  const { tours, loading, error } = useTours(filters, sortBy);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header & Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
            Aventuras Disponibles
          </h1>
          <p className="text-slate-500 font-medium italic">
            Descubre los rincones más mágicos de la Riviera Maya
          </p>
        </div>

        <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">
              Mosaico
            </span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              viewMode === "list"
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <List className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">
              Lista
            </span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <TourFiltersComp
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Results */}
      <div className="min-h-[400px]">
        {loading ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-4"
            }
          >
            {[...Array(6)].map((_, i) =>
              viewMode === "grid" ? (
                <TourSkeletonCard key={i} />
              ) : (
                <TourSkeletonList key={i} />
              ),
            )}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Error al cargar tours
            </h3>
            <p className="text-slate-500">{error}</p>
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No encontramos tours
            </h3>
            <p className="text-slate-500">
              Intenta ajustando los filtros de búsqueda.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-4"
              }
            >
              {tours.map((tour) =>
                viewMode === "grid" ? (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    onClick={() => onSelectTour(tour.id)}
                  />
                ) : (
                  <TourListItem
                    key={tour.id}
                    tour={tour}
                    onClick={() => onSelectTour(tour.id)}
                  />
                ),
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default TourList;
