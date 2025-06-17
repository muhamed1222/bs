import React from 'react';
import { Block } from '@/shared/types';
import { getBlockComponent } from '../registry/blockRegistry';

interface BlockRendererProps {
  block: Block;
  isEditing?: boolean;
  onUpdate?: (blockId: string, content: any) => void;
  onDelete?: (blockId: string) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isEditing = false,
  onUpdate,
  onDelete,
}) => {
  const { component: BlockComponent } = getBlockComponent(block.type);

  return (
    <BlockComponent
      id={block.id}
      content={block.content}
      isEditing={isEditing}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}; 