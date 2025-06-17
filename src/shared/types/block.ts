import { ReactNode } from 'react';

export type BlockType = 'text' | 'image' | 'button' | 'video' | 'form' | 'map';

export interface BlockStyle {
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  width?: string;
  height?: string;
}

export interface BaseBlock {
  id: string;
  type: BlockType;
  content: string;
  style: BlockStyle;
  order: number;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  alt?: string;
}

export interface ButtonBlock extends BaseBlock {
  type: 'button';
  onClick?: () => void;
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  url: string;
}

export interface FormBlock extends BaseBlock {
  type: 'form';
  fields: Array<{
    name: string;
    type: string;
    placeholder?: string;
    required?: boolean;
  }>;
}

export interface MapBlock extends BaseBlock {
  type: 'map';
  location: {
    lat: number;
    lng: number;
  };
}

export type Block = TextBlock | ImageBlock | ButtonBlock | VideoBlock | FormBlock | MapBlock;

export interface BlockPreviewProps {
  block: Block;
  className?: string;
}

export interface BlockComponentProps {
  block: Block;
  style?: React.CSSProperties;
}

export type BlockComponent = React.FC<BlockComponentProps>;

export interface BlockRegistry {
  [key: string]: BlockComponent;
} 