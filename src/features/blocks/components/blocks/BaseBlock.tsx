import React from 'react';
import { Block } from '@/shared/types';

export interface BaseBlockProps {
  block: Block;
  isEditing?: boolean;
  onUpdate?: (block: Block) => void;
  onDelete?: (blockId: string) => void;
}

export interface BlockComponentProps extends BaseBlockProps {
  children: React.ReactNode;
}

export const BaseBlock: React.FC<BlockComponentProps> = ({
  block,
  isEditing,
  onUpdate,
  onDelete,
  children,
}) => {
  return (
    <div
      className={`
        relative
        p-4
        rounded-lg
        transition-all
        duration-200
        ${isEditing ? 'hover:ring-2 hover:ring-blue-500' : ''}
      `}
      style={block.style}
    >
      {children}
    </div>
  );
}; 