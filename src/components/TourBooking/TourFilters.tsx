import type { FC } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import type { TourFilters as TourFiltersType, TourSortOrder } from "../../hooks/useTours";

interface FiltersProps {
  filters: TourFiltersType;
  setFilters: (filters: TourFiltersType) => void;
  sortBy: TourSortOrder;
  setSortBy: (sort: TourSortOrder) => void;
}

const TourFilters: FC<FiltersProps> = ({ filters, setFilters, sortBy, setSortBy }) => {
  const categories = ["all", "arqueología", "cenotes", "playa", "selva", "aventura"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Category Filter */}
        <div className="flex-grow">
          <label className="block text-sm font-bold text-slate-700 mb-2">Categoría</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  (filters.category || "all") === cat
                    ? "bg-teal-600 text-white shadow-md shadow-teal-100"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Date Filter */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-bold text-slate-700 mb-2">Disponibilidad</label>
          <input
            type="date"
            value={filters.date || ""}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        {/* Sort Order */}
        <div className="w-full lg:w-56">
          <label className="block text-sm font-bold text-slate-700 mb-2">Ordenar por</label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as TourSortOrder)}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
            >
              <option value="newest">Más recientes</option>
              <option value="popularity">Popularidad</option>
              <option value="price_asc">Precio: Menor a Mayor</option>
              <option value="price_desc">Precio: Mayor a Menor</option>
            </select>
            <SlidersHorizontal className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-6 border-t border-slate-50 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-auto flex items-center gap-4">
          <span className="text-sm font-bold text-slate-700">Rango de Precio:</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) || undefined })}
              className="w-24 bg-slate-50 border-none rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <span className="text-slate-400">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) || undefined })}
              className="w-24 bg-slate-50 border-none rounded-xl px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>
        
        <button 
          onClick={() => {
            setFilters({ category: "all" });
            setSortBy("newest");
          }}
          className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default TourFilters;
