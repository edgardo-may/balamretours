import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "../lib/supabase";
import type { TourWithDetails } from "../types/tour";

export interface CatalogFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  duration: string;
  date: string;
}

export type SortOption = "popularity" | "price_asc" | "price_desc" | "duration";

export function useToursCatalog() {
  const [tours, setTours] = useState<TourWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<CatalogFilters>({
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: 10000,
    duration: "all",
    date: "",
  });
  
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from("tours")
        .select(`
          *,
          prices:precio_tours(*),
          images:tour_images(*),
          availability:tour_fechas_disponibilidad(*)
        `)
        .eq('activo', true);

      if (supabaseError) throw supabaseError;
      setTours(data as TourWithDetails[] || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const filteredTours = useMemo(() => {
    let result = [...tours];

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(t => 
        t.nombre.toLowerCase().includes(searchLower) || 
        t.descripcion.toLowerCase().includes(searchLower)
      );
    }

    // Category
    if (filters.category !== "all") {
      result = result.filter(t => t.categoria === filters.category);
    }

    // Prices
    result = result.filter((t) => {
      const pricesArray = Array.isArray(t.prices) ? t.prices : (t.prices ? [t.prices] : []);
      if (pricesArray.length === 0) return true; 
      
      const minAdultPrice = Math.min(
        ...pricesArray.map((p) => p.precio_adulto || 0)
      );
      return (
        minAdultPrice >= filters.minPrice && minAdultPrice <= filters.maxPrice
      );
    });

    // Date
    if (filters.date) {
      result = result.filter((t) => {
        const avail = Array.isArray(t.availability) ? t.availability : [];
        return avail.some(
          (a) => a.date === filters.date && a.spots_available > 0,
        );
      });
    }

    // Sorting
    result.sort((a, b) => {
      const getMinPrice = (t: TourWithDetails) => {
        const prices = Array.isArray(t.prices) ? t.prices : (t.prices ? [t.prices] : []);
        return prices.length > 0 
          ? Math.min(...prices.map((p) => p.precio_adulto || 0))
          : 0;
      };
      
      switch (sortBy) {
        case "price_asc": return getMinPrice(a) - getMinPrice(b);
        case "price_desc": return getMinPrice(b) - getMinPrice(a);
        case "duration": return a.duracion - b.duracion;
        case "popularity":
        default: return (b.principal ? 1 : 0) - (a.principal ? 1 : 0);
      }
    });

    return result;
  }, [tours, filters, sortBy]);

  return {
    tours: filteredTours,
    loading,
    error,
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    refetch: fetchTours
  };
}
