// src/types/tour.ts

export interface DBTour {
  id: string;
  name: string;
  description: string;
  duration: string;
  rating: number;
  category: string;
  principal: boolean;
  created_at: string;
}

type DBTourPrice = {
  id: string;
  tour_id: string;
  precio_adulto: number | null;
  precio_menor: number | null;
  moneda: string;
  temporada_id?: string | null;
  label?: string;
};

export interface DBTourImage {
  id: string;
  tour_id: string;
  url: string;
  is_main: boolean;
}

export interface DBTourAvailability {
  id: string;
  tour_id: string;
  date: string;
  spots_available: number;
}

// Composite Type for Frontend
export interface TourWithDetails extends DBTour {
  prices: DBTourPrice[];
  images: DBTourImage[];
  availability: DBTourAvailability[];
}
