import type { FC } from "react";
import { Search, Filter, X } from "lucide-react";
import type { CatalogFilters } from "../../hooks/useToursCatalog";

interface ToursFiltersProps {
  filters: CatalogFilters;
  setFilters: (f: CatalogFilters) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

const ToursFilters: FC<ToursFiltersProps> = ({ filters, setFilters, searchTerm, setSearchTerm }) => {
  const categories = ["arqueología", "cenotes", "playa", "aventura", "naturaleza", "cultura"];

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-4 text-slate-900">
          <Search className="w-5 h-5 text-teal-600" />
          <h4 className="font-black uppercase tracking-widest text-sm">Buscar Aventura</h4>
        </div>
        <div className="relative">
          <input 
            type="text"
            placeholder="Ej. Chichén Itzá..."
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4 text-slate-900">
          <Filter className="w-5 h-5 text-teal-600" />
          <h4 className="font-black uppercase tracking-widest text-sm">Categorías</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilters({ ...filters, category: "all" })}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filters.category === "all" 
                ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20" 
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                filters.category === cat 
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20" 
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-black uppercase tracking-widest text-sm text-slate-900">Rango de Precio</h4>
          <span className="text-teal-600 font-bold text-sm">${filters.maxPrice}</span>
        </div>
        <input 
          type="range"
          min="0"
          max="5000"
          step="100"
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
        />
        <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
          <span>$0</span>
          <span>$5000+</span>
        </div>
      </div>

      <button 
        onClick={() => {
          setSearchTerm("");
          setFilters({ search: "", category: "all", minPrice: 0, maxPrice: 5000, duration: "all", date: "" });
        }}
        className="w-full py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors border-t border-slate-50 pt-6"
      >
        Limpiar Filtros
      </button>
    </div>
  );
};

export default ToursFilters;
