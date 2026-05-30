import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { TourWithDetails } from "../types/tour";

// ─── Helper: build base tour query ───────────────────────────────────────────
const buildTourQuery = () =>
  supabase.from("tours").select(`
    *,
    prices:precio_tours(*),
    images:tour_images(*),
    availability:tour_fechas_disponibilidad(*)
  `);

// ─── Home: tours marcados para mostrarse en Home (mostrar_home = true) ─────────
export function useHomeTours() {
  const [tours, setTours] = useState<TourWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await buildTourQuery()
          .eq("mostrar_home", true)
          .eq("activo", true)
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

// ─── Tours Generales (colectivos) para Home ──────────────────────────────────
export function useGeneralTours() {
  const [tours, setTours] = useState<TourWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await buildTourQuery()
          .eq("activo", true)
          .eq("mostrar_home", true)
          .eq("tipo_tour", "colectivo")
          .order("created_at", { ascending: false })
          .limit(6);

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

// ─── Tours Privados para Home ─────────────────────────────────────────────────
export function usePrivateTours() {
  const [tours, setTours] = useState<TourWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await buildTourQuery()
          .eq("activo", true)
          .eq("mostrar_home", true)
          .eq("tipo_tour", "privado")
          .order("created_at", { ascending: false })
          .limit(6);

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

// ─── Ofertas activas (con filtro de vigencia por fecha) ───────────────────────
export function useOfferTours() {
  const [tours, setTours] = useState<TourWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await buildTourQuery()
          .eq("activo", true)
          .eq("oferta", true)
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;

        // Filtrar ofertas vigentes según fecha_inicio_oferta y fecha_fin_oferta
        const now = new Date();
        const vigentes = ((data as TourWithDetails[]) || []).filter((tour) => {
          const inicio = tour.fecha_inicio_oferta ? new Date(tour.fecha_inicio_oferta) : null;
          const fin = tour.fecha_fin_oferta ? new Date(tour.fecha_fin_oferta) : null;
          const inicioOk = !inicio || now >= inicio;
          const finOk = !fin || now <= fin;
          return inicioOk && finOk;
        });

        setTours(vigentes.slice(0, 6));
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

// ─── Hook para obtener ofertas de la tabla independiente 'ofertas' ─────────────
import type { DBOffer } from "../types/tour";

export function useOffers() {
  const [offers, setOffers] = useState<DBOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOffers() {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from("ofertas")
          .select("*")
          .eq("activa", true)
          .order("created_at", { ascending: false });

        if (supabaseError) throw supabaseError;
        setOffers((data as DBOffer[]) || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  return { offers, loading, error };
}

// ─── Interfaces y tipos ───────────────────────────────────────────────────────
export interface TourFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  date?: string;
}

export type TourSortOrder = "price_asc" | "price_desc" | "popularity" | "newest";

// ─── Hook genérico con filtros ────────────────────────────────────────────────
export function useTours(filters?: TourFilters, sortBy: TourSortOrder = "newest") {
  const [tours, setTours] = useState<TourWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);

      let query = buildTourQuery();

      if (filters?.category && filters.category !== "all") {
        query = query.eq("categoria", filters.category);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) throw supabaseError;

      let processedData = (data as TourWithDetails[]) || [];

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

      if (filters?.date) {
        processedData = processedData.filter(tour => {
          const avail = Array.isArray(tour.availability) ? tour.availability : (tour.availability ? [tour.availability] : []);
          return avail.some(a => a.date === filters.date && a.spots_available > 0);
        });
      }

      processedData.sort((a, b) => {
        const getMinPrice = (t: TourWithDetails) => {
          const prices = Array.isArray(t.prices) ? t.prices : (t.prices ? [t.prices] : []);
          return prices.length > 0 ? Math.min(...prices.map(p => p.precio_adulto || 0)) : 0;
        };

        switch (sortBy) {
          case "price_asc": return getMinPrice(a) - getMinPrice(b);
          case "price_desc": return getMinPrice(b) - getMinPrice(a);
          case "popularity": return (b.mostrar_home ? 1 : 0) - (a.mostrar_home ? 1 : 0);
          case "newest":
          default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
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

// ─── Detalle de un tour ───────────────────────────────────────────────────────
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
