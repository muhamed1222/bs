import React from 'react';
import { BlockComponentProps, ImageBlock as ImageBlockType } from '../../../../shared/types/block';

export const ImageBlock: React.FC<BlockComponentProps> = ({ block, style }) => {
  const imageBlock = block as ImageBlockType;
  return (
    <img
      src={imageBlock.content}
      alt={imageBlock.alt || 'Block content'}
      className="w-full h-auto"
      style={style}
    />
  );
}; 