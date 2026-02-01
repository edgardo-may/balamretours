// src/types/index.ts
export interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
  duration: string;
  rating: number;
}

export interface Package {
  id: number;
  name: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  popular: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
}

// src/types/index.ts - Agrega estos tipos
export interface TourDetail extends Destination {
  included: string[];
  notIncluded: string[];
  itinerary: DayItinerary[];
  highlights: string[];
  requirements: string[];
  faqs: FAQ[];
  availability: Availability[];
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Availability {
  date: string;
  availableSpots: number;
  price: number;
}

export interface ReservationFormData {
  tourId: number;
  date: string;
  adults: number;
  children: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
  agreeToTerms: boolean;
}