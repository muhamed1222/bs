export type BlockType = 'text' | 'image' | 'button' | 'video' | 'form' | 'map';

export interface BlockStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
}

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  style?: BlockStyle;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlockPreviewProps {
  block: Block;
  className?: string;
} 