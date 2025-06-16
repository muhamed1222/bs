import React from 'react';
import { Block, BlockType } from '@/shared/types';
import { TextBlock } from './blocks/TextBlock';
import { LinkBlock } from './blocks/LinkBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { VideoBlock } from './blocks/VideoBlock';
import { SocialBlock } from './blocks/SocialBlock';
import { EmbedBlock } from './blocks/EmbedBlock';
import { GalleryBlock } from './blocks/GalleryBlock';

const blockComponents: Record<BlockType, React.ComponentType<{ block: Block }>> = {
  text: TextBlock,
  link: LinkBlock,
  image: ImageBlock,
  video: VideoBlock,
  social: SocialBlock,
  embed: EmbedBlock,
  gallery: GalleryBlock,
};

interface BlockRendererProps {
  block: Block;
  isEditing?: boolean;
  onUpdate?: (block: Block) => void;
  onDelete?: (blockId: string) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isEditing = false,
  onUpdate,
  onDelete,
}) => {
  const BlockComponent = blockComponents[block.type];

  if (!BlockComponent) {
    console.warn(`Unknown block type: ${block.type}`);
    return null;
  }

  return (
    <div
      className="relative group"
      style={{
        ...block.style,
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <BlockComponent
        block={block}
        isEditing={isEditing}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
      
      {isEditing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onDelete?.(block.id)}
            className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}; 