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
          .select(
            `
            *,
            prices:precio_tours(*),
            images:tour_images(*),
            availability:tour_fechas_disponibilidad(*)
          `,
          )
          .eq("principal", true)
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;
        setTours(data || []);
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
        query = query.eq("category", filters.category);
      }

      // Note: Price filtering is tricky with nested structures in Supabase JS client
      // Often better to filter price in-memory or use a view/RPC if performance is an issue.
      // For now, we'll fetch and then filter if needed, or just let the query handle basic fields.

      const { data, error: supabaseError } = await query;

      if (supabaseError) throw supabaseError;

      let processedData = (data as TourWithDetails[]) || [];

      // Manual filtering for prices if provided
      if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
        processedData = processedData.filter(tour => {
          const minAdultPrice = Math.min(...tour.prices.map(p => p.precio_adulto || Infinity));
          const matchesMin = filters.minPrice !== undefined ? minAdultPrice >= filters.minPrice : true;
          const matchesMax = filters.maxPrice !== undefined ? minAdultPrice <= filters.maxPrice : true;
          return matchesMin && matchesMax;
        });
      }

      // Date availability filtering
      if (filters?.date) {
        processedData = processedData.filter(tour => 
          tour.availability.some(a => a.date === filters.date && a.spots_available > 0)
        );
      }

      // Sorting
      processedData.sort((a, b) => {
        const getMinPrice = (t: TourWithDetails) => Math.min(...t.prices.map(p => p.precio_adulto || 0));
        
        switch (sortBy) {
          case "price_asc":
            return getMinPrice(a) - getMinPrice(b);
          case "price_desc":
            return getMinPrice(b) - getMinPrice(a);
          case "popularity":
            return (b.rating || 0) - (a.rating || 0);
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
        setTour(data);
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
