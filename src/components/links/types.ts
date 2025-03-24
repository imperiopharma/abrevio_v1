
export interface LinkType {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  dateCreated: string;
  tags?: string[];
  isActive?: boolean;
  expiresAt?: string | null;
  metadata?: Record<string, any>;
}

export interface QRCodeSettings {
  width?: number;
  margin?: number;
  dark?: string;
  light?: string;
}
