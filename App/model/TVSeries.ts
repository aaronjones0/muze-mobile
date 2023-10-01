export interface TVSeries {
  id?: string;
  user_id?: string;
  created_at?: string;
  full_title: string | null;
  short_title: string | null;
  synopsis: string | null;
  episode_count: number | null;
  season_count: number | null;
  content_rating: string | null;
  release_date_us: string | null;
  release_date_jpn: string | null;
  release_date_uk: string | null;
  release_date_kor: string | null;
}
