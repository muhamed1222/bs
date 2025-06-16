export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
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
  type: BlockType;
  content: any;
  order: number;
  style?: BlockStyle;
}

export type BlockType = 
  | 'text'
  | 'link'
  | 'image'
  | 'video'
  | 'social'
  | 'embed'
  | 'gallery';

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
  profileId: string;
  views: number;
  clicks: number;
  lastViewed: Date;
}

export interface Settings {
  userId: string;
  notifications: boolean;
  theme: Theme;
  language: string;
} 