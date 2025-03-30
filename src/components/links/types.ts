
export interface LinkType {
  id: string;
  user_id: string;
  short_url: string;
  original_url: string;
  slug: string;
  title?: string;
  clicks: number;
  is_active: boolean;
  expires_at?: string | null;
  created_at: string;
  tags?: string[];
}

export interface QRCodeSettings {
  width?: number;
  margin?: number;
  dark?: string;
  light?: string;
}
