import type { FC } from "react";
import { useToursCatalog } from "../../hooks/useToursCatalog";
import ToursFilters from "./ToursFilters";
import { TourCardPro } from "./TourCardPro";
import { List, LayoutGrid, SearchX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";

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
    setViewMode 
  } = useToursCatalog();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <main className="pt-32 pb-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filtros */}
          <aside className="lg:w-80 flex-shrink-0">
            <ToursFilters 
              filters={filters} 
              setFilters={setFilters} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </aside>

          {/* Listado Principal */}
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                  Explorar Experiencias
                </h1>
                <p className="text-slate-500 font-medium">
                  {tours.length} tours encontrados en la Riviera Maya
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-1 border-r border-slate-100 pr-4">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-xl transition-all ${viewMode === "grid" ? "bg-teal-50 text-teal-600" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-xl transition-all ${viewMode === "list" ? "bg-teal-50 text-teal-600" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
                
                <select 
                  className="bg-transparent text-xs font-black uppercase tracking-widest text-slate-600 outline-none cursor-pointer pr-4"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="popularity">Popularidad</option>
                  <option value="price_asc">Precio: Menor a Mayor</option>
                  <option value="price_desc">Precio: Mayor a Menor</option>
                  <option value="duration">Duración</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-[2rem] h-96 animate-pulse border border-slate-100" />
                ))}
              </div>
            ) : tours.length > 0 ? (
              <motion.div 
                layout
                className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}
              >
                <AnimatePresence mode="popLayout">
                  {tours.map((tour) => (
                    <motion.div
                      key={tour.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TourCardPro tour={tour} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
                <SearchX className="w-16 h-16 text-slate-300 mb-6" />
                <h3 className="text-2xl font-black text-slate-900 mb-2">No encontramos resultados</h3>
                <p className="text-slate-500 mb-8 max-w-sm text-center">
                  Intenta ajustando tus filtros o buscando algo diferente. ¡La aventura te espera!
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({ search: "", category: "all", minPrice: 0, maxPrice: 5000, duration: "all", date: "" });
                  }}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-colors"
                >
                  Reiniciar Búsqueda
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToursCatalog;
