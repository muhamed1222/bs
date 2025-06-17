export interface PageView {
  id: string;
  pageId: string;
  ip: string | null;
  userAgent: string | null;
  referer: string | null;
  country: string | null;
  city: string | null;
  createdAt: Date;
}

export interface PageStats {
  total: number;
  unique: number;
  countries: number;
} 