import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { TourWithDetails } from "../types/tour";

export function useHomeTours() {
  const [tours, setTours] = useState<TourWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);

        const { data, error: supabaseError } = await supabase
          .from("tours")
          .select(`
            *,
            prices:precio_tours(*),
            images:tour_images(*),
            availability:tour_fechas_disponibilidad(*)
          `)
          .eq("principal", true)
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;
        setTours(data as TourWithDetails[] || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  return { tours, loading, error };
}

export interface TourFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  date?: string;
}

export type TourSortOrder = "price_asc" | "price_desc" | "popularity" | "newest";

export function useTours(filters?: TourFilters, sortBy: TourSortOrder = "newest") {
  const [tours, setTours] = useState<TourWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from("tours")
        .select(`
          *,
          prices:precio_tours(*),
          images:tour_images(*),
          availability:tour_fechas_disponibilidad(*)
        `);

      if (filters?.category && filters.category !== "all") {
        query = query.eq("categoria", filters.category);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) throw supabaseError;

      let processedData = (data as TourWithDetails[]) || [];

      // Manual filtering for prices if provided
      if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
        processedData = processedData.filter(tour => {
          const prices = Array.isArray(tour.prices) ? tour.prices : (tour.prices ? [tour.prices] : []);
          if (prices.length === 0) return true;
          const minAdultPrice = Math.min(...prices.map(p => p.precio_adulto || Infinity));
          const matchesMin = filters.minPrice !== undefined ? minAdultPrice >= filters.minPrice : true;
          const matchesMax = filters.maxPrice !== undefined ? minAdultPrice <= filters.maxPrice : true;
          return matchesMin && matchesMax;
        });
      }

      // Date availability filtering
      if (filters?.date) {
        processedData = processedData.filter(tour => {
          const avail = Array.isArray(tour.availability) ? tour.availability : (tour.availability ? [tour.availability] : []);
          return avail.some(a => a.date === filters.date && a.spots_available > 0);
        });
      }

      // Sorting
      processedData.sort((a, b) => {
        const getMinPrice = (t: TourWithDetails) => {
          const prices = Array.isArray(t.prices) ? t.prices : (t.prices ? [t.prices] : []);
          return prices.length > 0 ? Math.min(...prices.map(p => p.precio_adulto || 0)) : 0;
        };
        
        switch (sortBy) {
          case "price_asc":
            return getMinPrice(a) - getMinPrice(b);
          case "price_desc":
            return getMinPrice(b) - getMinPrice(a);
          case "popularity":
            return (b.principal ? 1 : 0) - (a.principal ? 1 : 0);
          case "newest":
          default:
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
      });

      setTours(processedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters?.category, filters?.minPrice, filters?.maxPrice, filters?.date, sortBy]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  return { tours, loading, error, refetch: fetchTours };
}

export function useTourDetails(id: string | null) {
  const [tour, setTour] = useState<TourWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchTour() {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from("tours")
          .select(`
            *,
            prices:precio_tours(*),
            images:tour_images(*),
            availability:tour_fechas_disponibilidad(*)
          `)
          .eq("id", id)
          .single();

        if (supabaseError) throw supabaseError;
        setTour(data as TourWithDetails);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTour();
  }, [id]);

  return { tour, loading, error };
}
