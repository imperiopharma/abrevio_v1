
// User types
export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

// Link types
export interface Link {
  id: string;
  user_id: string;
  original_url: string;
  slug: string;
  short_url: string;
  clicks: number;
  created_at: string;
}

// Click statistics types
export interface ClickStats {
  id: string;
  link_id: string;
  date_time: string;
  ip?: string;
  user_agent?: string;
  referer?: string;
  location?: string;
  device?: string;
}

// Bio page types
export interface BioPage {
  id: string;
  user_id: string;
  username: string;
  bio: string;
  avatar_url?: string;
  background_color?: string;
  button_color?: string;
  created_at: string;
  updated_at: string;
}

export interface BioLink {
  id: string;
  bio_id: string;
  title: string;
  url: string;
  order: number;
  icon?: string;
  created_at: string;
}
