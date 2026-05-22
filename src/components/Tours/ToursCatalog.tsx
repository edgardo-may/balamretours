import type { FC } from "react";
import { useToursCatalog } from "../../hooks/useToursCatalog";
import ToursFilters from "./ToursFilters";
import { TourCardPro } from "./TourCardPro";
import { List, LayoutGrid, SearchX, SlidersHorizontal, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";
import FloatingWhatsApp from "../Ui/FloatingWhatsApp";
import { useState } from "react";
import { Link } from "react-router-dom";

const ToursCatalog: FC = () => {
  const {
    tours,
    loading,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
  } = useToursCatalog();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-caliza-50 font-sans overflow-hidden">
      <Navbar />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden pt-[64px] lg:pt-[72px]">

        {/* ══ Sidebar filtros ══ */}
        <aside className="hidden lg:flex flex-col w-76 xl:w-80 flex-shrink-0 h-full overflow-hidden border-r border-caliza-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4 border-b border-caliza-200 flex-shrink-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cenote-600" />
              <span className="font-bold text-noche-800 text-sm uppercase tracking-widest">Filtros</span>
            </div>
            {(filters.category !== "all" || filters.tourType !== "all" || filters.maxPrice < 5000 || searchTerm) && (
              <span className="bg-cenote-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Activos
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-5">
              <ToursFilters
                filters={filters}
                setFilters={setFilters}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>
        </aside>

        {/* ══ Área principal ══ */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* Barra superior */}
          <div className="flex-shrink-0 bg-white border-b border-caliza-200 px-5 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                {/* Back link */}
                <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-noche-400 hover:text-cenote-600 font-medium mb-1 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Inicio
                </Link>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-noche-900 tracking-tight leading-tight">
                  Explorar Tours
                </h1>
                <p className="text-noche-400 text-sm font-medium mt-0.5">
                  {loading ? (
                    <span className="inline-block w-28 h-4 bg-caliza-200 rounded animate-pulse" />
                  ) : (
                    <>
                      <span className="text-cenote-600 font-bold">{tours.length}</span> tours encontrados
                      {filters.tourType !== "all" && (
                        <span className="ml-1 text-noche-400">
                          · {filters.tourType === "colectivo" ? "Colectivos" : "Privados"}
                        </span>
                      )}
                    </>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Mobile filter button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-caliza-100 hover:bg-caliza-200 px-4 py-2.5 rounded-xl transition-colors text-xs font-bold uppercase tracking-wider text-noche-700"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtros
                  {(filters.category !== "all" || filters.tourType !== "all") && (
                    <span className="bg-cenote-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">!</span>
                  )}
                </button>

                {/* View mode + Sort */}
                <div className="flex items-center gap-2 bg-caliza-100 p-1.5 rounded-xl">
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-cenote-600 shadow-sm" : "text-noche-400 hover:text-noche-600"}`}
                      title="Vista cuadrícula"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-cenote-600 shadow-sm" : "text-noche-400 hover:text-noche-600"}`}
                      title="Vista lista"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-px h-5 bg-caliza-200" />
                  <select
                    className="bg-transparent text-xs font-bold uppercase tracking-wider text-noche-600 outline-none cursor-pointer pr-1"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="popularity">Popularidad</option>
                    <option value="price_asc">Precio ↑</option>
                    <option value="price_desc">Precio ↓</option>
                    <option value="duration">Duración</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {(filters.category !== "all" || filters.tourType !== "all" || filters.maxPrice < 5000) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {filters.tourType !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-cenote-50 text-cenote-700 border border-cenote-100 px-3 py-1 rounded-full text-xs font-bold">
                    {filters.tourType === "colectivo" ? "Colectivos" : "Privados"}
                    <button onClick={() => setFilters({ ...filters, tourType: "all" })}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.category !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-cenote-50 text-cenote-700 border border-cenote-100 px-3 py-1 rounded-full text-xs font-bold capitalize">
                    {filters.category}
                    <button onClick={() => setFilters({ ...filters, category: "all" })}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.maxPrice < 5000 && (
                  <span className="inline-flex items-center gap-1.5 bg-cenote-50 text-cenote-700 border border-cenote-100 px-3 py-1 rounded-full text-xs font-bold">
                    Hasta ${filters.maxPrice}
                    <button onClick={() => setFilters({ ...filters, maxPrice: 5000 })}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Grid de tours */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-5">
              {loading ? (
                <div className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-3xl h-80 animate-pulse border border-caliza-200" />
                  ))}
                </div>
              ) : tours.length > 0 ? (
                <motion.div
                  layout
                  className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 max-w-2xl"}`}
                >
                  <AnimatePresence mode="popLayout">
                    {tours.map((tour) => (
                      <motion.div
                        key={tour.id}
                        layout
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TourCardPro tour={tour} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-28 bg-white rounded-3xl border border-dashed border-caliza-300">
                  <SearchX className="w-12 h-12 text-caliza-400 mb-4" />
                  <h3 className="text-xl font-extrabold text-noche-900 mb-2">Sin resultados</h3>
                  <p className="text-noche-500 mb-7 max-w-xs text-center text-sm">
                    Intenta ajustando los filtros o buscando algo diferente.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilters({ search: "", category: "all", tourType: "all", minPrice: 0, maxPrice: 5000, duration: "all", date: "" });
                    }}
                    className="btn-reserva"
                  >
                    Reiniciar filtros
                  </button>
                </div>
              )}
            </div>

            <Footer />
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-[85] bg-noche-950/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 z-[90] w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-caliza-200">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-cenote-600" />
                  <span className="font-bold text-noche-800 text-sm uppercase tracking-widest">Filtros</span>
                </div>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-2 rounded-xl hover:bg-caliza-100 transition-colors">
                  <X className="w-5 h-5 text-noche-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="p-5">
                  <ToursFilters filters={filters} setFilters={setFilters} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
              </div>
              <div className="flex-shrink-0 p-5 border-t border-caliza-200">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="btn-reserva w-full justify-center py-4"
                >
                  Ver {tours.length} resultado{tours.length !== 1 ? "s" : ""}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <FloatingWhatsApp />
    </div>
  );
};

export default ToursCatalog;
