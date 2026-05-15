import type { FC } from "react";
import { useToursCatalog } from "../../hooks/useToursCatalog";
import ToursFilters from "./ToursFilters";
import { TourCardPro } from "./TourCardPro";
import { List, LayoutGrid, SearchX, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";
import { useState } from "react";

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

  // Mobile filter drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans overflow-hidden">
      {/* ── Navbar fijo ── */}
      <Navbar />

      {/* ── Layout principal: fijo debajo del navbar ── */}
      <div className="flex flex-1 overflow-hidden pt-[72px] lg:pt-[80px]">

        {/* ══ SIDEBAR FILTROS — sticky, no se mueve ══ */}
        <aside className="hidden lg:flex flex-col w-80 xl:w-88 flex-shrink-0 h-full overflow-hidden border-r border-slate-100 bg-white">
          {/* Header del sidebar */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-teal-600" />
              <span className="font-black text-slate-900 text-sm uppercase tracking-widest">
                Filtros
              </span>
            </div>
            {/* Contador de filtros activos */}
            {(filters.category !== "all" || filters.tourType !== "all" || filters.maxPrice < 5000 || searchTerm) && (
              <span className="bg-teal-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                Activos
              </span>
            )}
          </div>

          {/* Filtros con scroll propio */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-6">
              <ToursFilters
                filters={filters}
                setFilters={setFilters}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>
          </div>
        </aside>

        {/* ══ ÁREA PRINCIPAL — scroll solo aquí ══ */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* ── Barra superior: título + controles ── */}
          <div className="flex-shrink-0 bg-white border-b border-slate-100 px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Explorar Experiencias
                </h1>
                <p className="text-slate-500 text-sm font-medium mt-0.5">
                  {loading ? (
                    <span className="inline-block w-32 h-4 bg-slate-100 rounded animate-pulse" />
                  ) : (
                    <>
                      <span className="text-teal-600 font-black">{tours.length}</span> tours encontrados
                      {filters.tourType !== "all" && (
                        <span className="ml-1 text-slate-400">
                          · {filters.tourType === "colectivo" ? "Colectivos" : "Privados"}
                        </span>
                      )}
                    </>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Botón filtros móvil */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors text-xs font-black uppercase tracking-wider text-slate-700"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtros
                  {(filters.category !== "all" || filters.tourType !== "all") && (
                    <span className="bg-teal-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">!</span>
                  )}
                </button>

                {/* View mode + Sort */}
                <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-xl">
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "grid"
                          ? "bg-white text-teal-600 shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                      title="Vista cuadrícula"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "list"
                          ? "bg-white text-teal-600 shadow-sm"
                          : "text-slate-400 hover:text-slate-600"
                      }`}
                      title="Vista lista"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-px h-5 bg-slate-200" />

                  <select
                    className="bg-transparent text-xs font-black uppercase tracking-widest text-slate-600 outline-none cursor-pointer pr-1"
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

            {/* ── Chips de filtros activos ── */}
            {(filters.category !== "all" || filters.tourType !== "all" || filters.maxPrice < 5000) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {filters.tourType !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 rounded-full text-[11px] font-bold">
                    {filters.tourType === "colectivo" ? "Colectivos" : "Privados"}
                    <button onClick={() => setFilters({ ...filters, tourType: "all" })}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.category !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 rounded-full text-[11px] font-bold capitalize">
                    {filters.category}
                    <button onClick={() => setFilters({ ...filters, category: "all" })}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.maxPrice < 5000 && (
                  <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-700 border border-teal-100 px-3 py-1 rounded-full text-[11px] font-bold">
                    Hasta ${filters.maxPrice}
                    <button onClick={() => setFilters({ ...filters, maxPrice: 5000 })}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── Grid de tours — ÚNICO con scroll ── */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-6">
              {loading ? (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-[2rem] h-80 animate-pulse border border-slate-100"
                    />
                  ))}
                </div>
              ) : tours.length > 0 ? (
                <motion.div
                  layout
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1 max-w-3xl"
                  }`}
                >
                  <AnimatePresence mode="popLayout">
                    {tours.map((tour) => (
                      <motion.div
                        key={tour.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                      >
                        <TourCardPro tour={tour} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                  <SearchX className="w-14 h-14 text-slate-300 mb-5" />
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    Sin resultados
                  </h3>
                  <p className="text-slate-500 mb-8 max-w-xs text-center text-sm">
                    Intenta ajustando los filtros o buscando algo diferente.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilters({
                        search: "",
                        category: "all",
                        tourType: "all",
                        minPrice: 0,
                        maxPrice: 5000,
                        duration: "all",
                        date: "",
                      });
                    }}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-colors"
                  >
                    Reiniciar filtros
                  </button>
                </div>
              )}
            </div>

            {/* Footer dentro del scroll area */}
            <Footer />
          </div>
        </main>
      </div>

      {/* ══ DRAWER FILTROS MÓVIL ══ */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 z-[85] bg-slate-900/50 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-[90] w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-teal-600" />
                  <span className="font-black text-slate-900 text-sm uppercase tracking-widest">
                    Filtros
                  </span>
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* Filtros con scroll */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="p-6">
                  <ToursFilters
                    filters={filters}
                    setFilters={setFilters}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                </div>
              </div>

              {/* Botón aplicar */}
              <div className="flex-shrink-0 p-6 border-t border-slate-100">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-teal-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-teal-700 transition-colors"
                >
                  Ver {tours.length} resultado{tours.length !== 1 ? "s" : ""}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToursCatalog;
