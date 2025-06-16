import React from 'react';
import { Block } from '@/shared/types';
import { BlockRenderer } from './BlockRenderer';

interface BlockListProps {
  blocks: Block[];
  layout?: 'grid' | 'list';
  theme?: 'light' | 'dark';
  isEditing?: boolean;
  onDelete?: (blockId: string) => void;
  onReorder?: (index: number, direction: number) => void;
}

export const BlockList: React.FC<BlockListProps> = ({
  blocks,
  layout = 'list',
  theme = 'light',
  isEditing = false,
  onDelete,
  onReorder,
}) => {
  const containerClasses = [
    'blocks-container',
    layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4',
    `theme-${theme}`,
  ].join(' ');

  return (
    <div className={containerClasses} data-testid="blocks-container">
      {blocks.map((block, index) => (
        <div key={block.id} className="relative">
          <BlockRenderer
            block={block}
            isEditing={isEditing}
            onDelete={onDelete}
          />
          {isEditing && onReorder && (
            <div className="absolute right-2 top-2 flex space-x-2">
              {index > 0 && (
                <button
                  data-testid="reorder-button"
                  onClick={() => onReorder(index, -1)}
                  className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ↑
                </button>
              )}
              {index < blocks.length - 1 && (
                <button
                  data-testid="reorder-button"
                  onClick={() => onReorder(index, 1)}
                  className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  ↓
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}; 