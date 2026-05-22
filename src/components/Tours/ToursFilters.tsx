import type { FC } from "react";
import { Search, X, Users, Lock, Layers, Filter } from "lucide-react";
import type { CatalogFilters } from "../../hooks/useToursCatalog";

interface ToursFiltersProps {
  filters: CatalogFilters;
  setFilters: (f: CatalogFilters) => void;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

const CATEGORIES = [
  "arqueología",
  "cenotes",
  "playa",
  "aventura",
  "naturaleza",
  "cultura",
];

const TOUR_TYPES = [
  {
    value: "all" as const,
    label: "Todos",
    icon: <Layers className="w-3.5 h-3.5" />,
    description: "Colectivos y privados",
  },
  {
    value: "colectivo" as const,
    label: "Colectivos",
    icon: <Users className="w-3.5 h-3.5" />,
    description: "Grupos y compartidos",
  },
  {
    value: "privado" as const,
    label: "Privados",
    icon: <Lock className="w-3.5 h-3.5" />,
    description: "Exclusivos y personalizados",
  },
];

const ToursFilters: FC<ToursFiltersProps> = ({
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
}) => {
  const activeCount = [
    filters.category !== "all",
    filters.tourType !== "all",
    filters.maxPrice < 5000,
    !!searchTerm,
  ].filter(Boolean).length;

  return (
    <div className="space-y-7">

      {/* ── Buscador ── */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <Search className="w-3.5 h-3.5 text-cenote-600" />
          <h4 className="font-bold uppercase tracking-widest text-2xs text-noche-600">Buscar</h4>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Ej. Chichén Itzá, cenotes..."
            className="w-full px-4 py-3 rounded-xl bg-caliza-50 border border-caliza-200 focus:outline-none focus:ring-2 focus:ring-cenote-400 focus:border-transparent transition-all text-sm text-noche-800 placeholder:text-noche-400 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-caliza-200 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-noche-400" />
            </button>
          )}
        </div>
      </div>

      {/* ── Tipo de Tour ── */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <Users className="w-3.5 h-3.5 text-cenote-600" />
          <h4 className="font-bold uppercase tracking-widest text-2xs text-noche-600">Tipo de Tour</h4>
        </div>
        <div className="flex flex-col gap-2">
          {TOUR_TYPES.map(({ value, label, icon, description }) => {
            const isActive = filters.tourType === value;
            const isPrivado = value === "privado";
            return (
              <button
                key={value}
                onClick={() => setFilters({ ...filters, tourType: value })}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border ${
                  isActive
                    ? isPrivado
                      ? "bg-tierra-500 text-white border-tierra-500 shadow-md shadow-tierra-500/20"
                      : "bg-cenote-600 text-white border-cenote-600 shadow-md shadow-cenote-600/20"
                    : "bg-caliza-50 text-noche-600 border-caliza-200 hover:bg-caliza-100 hover:border-caliza-300"
                }`}
              >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? "bg-white/20" : isPrivado ? "bg-tierra-50" : "bg-cenote-50"
                }`}>
                  <span className={isActive ? "text-white" : isPrivado ? "text-tierra-600" : "text-cenote-600"}>
                    {icon}
                  </span>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider leading-none mb-0.5">{label}</p>
                  <p className={`text-[10px] leading-none ${isActive ? "text-white/70" : "text-noche-400"}`}>
                    {description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Categorías ── */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <Filter className="w-3.5 h-3.5 text-cenote-600" />
          <h4 className="font-bold uppercase tracking-widest text-2xs text-noche-600">Categoría</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilters({ ...filters, category: "all" })}
            className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
              filters.category === "all"
                ? "bg-cenote-600 text-white border-cenote-600"
                : "bg-caliza-50 text-noche-500 border-caliza-200 hover:bg-caliza-100"
            }`}
          >
            Todos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border capitalize ${
                filters.category === cat
                  ? "bg-cenote-600 text-white border-cenote-600"
                  : "bg-caliza-50 text-noche-500 border-caliza-200 hover:bg-caliza-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Precio ── */}
      <div>
        <div className="flex justify-between items-center mb-2.5">
          <h4 className="font-bold uppercase tracking-widest text-2xs text-noche-600">Precio Máximo</h4>
          <span className="text-cenote-600 font-extrabold text-sm">${filters.maxPrice.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          className="w-full h-2 bg-caliza-200 rounded-lg appearance-none cursor-pointer accent-cenote-600"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
        />
        <div className="flex justify-between mt-2 text-[10px] font-bold text-noche-400 uppercase tracking-tighter">
          <span>$0</span>
          <span>$5,000+</span>
        </div>
      </div>

      {/* ── Limpiar ── */}
      {activeCount > 0 && (
        <button
          onClick={() => {
            setSearchTerm("");
            setFilters({ search: "", category: "all", tourType: "all", minPrice: 0, maxPrice: 5000, duration: "all", date: "" });
          }}
          className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-xl transition-colors border border-rose-100"
        >
          <X className="w-3.5 h-3.5" />
          Limpiar {activeCount} filtro{activeCount !== 1 ? "s" : ""}
        </button>
      )}
    </div>
  );
};

export default ToursFilters;
