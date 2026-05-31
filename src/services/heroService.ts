import { supabase } from '../lib/supabase';

export interface HeroSlide {
  id: string;
  title: string | null;
  subtitle: string | null;
  media_type: 'image' | 'video';
  media_url: string;
  display_order: number;
  show_in_hero: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Fetches all active hero slides visible in the hero section.
 * Filters: show_in_hero = true AND is_active = true
 * Ordered by: display_order ASC
 */
export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('show_in_hero', true)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[heroService] Error fetching hero slides:', error.message);
    return [];
  }

  return data as HeroSlide[];
}
