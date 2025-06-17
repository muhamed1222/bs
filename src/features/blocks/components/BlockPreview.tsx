import React from 'react';
import { BlockPreviewProps } from '../../../shared/types/block';
import { blockRegistry } from './BlockRegistry';

export const BlockPreview: React.FC<BlockPreviewProps> = ({ block, className = '' }) => {
  const getBlockStyles = () => {
    const styles: React.CSSProperties = {};
    if (block.style) {
      if (block.style.backgroundColor) styles.backgroundColor = block.style.backgroundColor;
      if (block.style.textColor) styles.color = block.style.textColor;
      if (block.style.borderRadius) styles.borderRadius = block.style.borderRadius;
      if (block.style.padding) styles.padding = block.style.padding;
      if (block.style.margin) styles.margin = block.style.margin;
    }
    return styles;
  };

  const BlockComponent = blockRegistry[block.type];

  if (!BlockComponent) {
    return <p className="text-red-500">Неизвестный тип блока: {block.type}</p>;
  }

  return (
    <div className={`block-preview ${className}`}>
      <BlockComponent block={block} style={getBlockStyles()} />
    </div>
  );
}; 