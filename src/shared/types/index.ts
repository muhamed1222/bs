export interface User {
  id: string;
  email: string;
  name: string;
  plan: PlanType;
  stripe_customer_id?: string;
  subscription_id?: string;
  subscription_status?: 'active' | 'canceled' | 'past_due';
  subscription_interval?: 'monthly' | 'yearly';
  subscription_start_date?: string;
  subscription_current_period_end?: string;
  two_factor_enabled: boolean;
  two_factor_secret?: string;
  two_factor_backup_codes?: string[];
  created_at: string;
  updated_at: string;
}

export enum PlanType {
  FREE = 'free',
  PRO = 'pro',
  BUSINESS = 'business',
}

export interface Profile {
  id: string;
  userId: string;
  slug: string;
  title: string;
  description?: string;
  coverImage?: string;
  theme: Theme;
  layout: Layout;
  blocks: Block[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Block {
  id: string;
  page_id: string;
  type: BlockType;
  content: any;
  order: number;
  created_at: string;
  updated_at: string;
}

export enum BlockType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  FORM = 'form',
  MAP = 'map',
  CALENDAR = 'calendar',
  GALLERY = 'gallery',
  QUOTE = 'quote',
  DIVIDER = 'divider',
  BUTTON = 'button',
  SOCIAL = 'social',
}

export interface BlockStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
}

export type Theme = 'light' | 'dark' | 'custom';
export type Layout = 'grid' | 'list' | 'bento';

export interface Analytics {
  pageId: string;
  views: number;
  uniqueVisitors: number;
  averageTimeOnPage: number;
  bounceRate: number;
  referrers: {
    source: string;
    count: number;
  }[];
  devices: {
    type: string;
    count: number;
  }[];
  browsers: {
    name: string;
    count: number;
  }[];
  countries: {
    code: string;
    count: number;
  }[];
  lastUpdated: string;
}

export interface Settings {
  userId: string;
  notifications: boolean;
  theme: Theme;
  language: string;
}

export interface Page {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  slug: string;
  is_private: boolean;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export interface PageView {
  id: string;
  page_id: string;
  user_id?: string;
  referrer?: string;
  user_agent?: string;
  ip?: string;
  country?: string;
  city?: string;
  viewed_at: string;
}

export interface BlockInteraction {
  id: string;
  page_id: string;
  block_id: string;
  user_id?: string;
  event_type: string;
  data: any;
  created_at: string;
}

export interface ApiKey {
  id: string;
  user_id: string;
  name: string;
  key: string;
  last_used_at?: string;
  created_at: string;
  expires_at?: string;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: string;
  created: string;
}

export interface TeamInvitation {
  id: string;
  team_id: string;
  email: string;
  role: UserRole;
  status: 'pending' | 'accepted' | 'expired';
  expires_at: string;
  created_at: string;
} 