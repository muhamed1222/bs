import React from 'react';
import { BlockComponentProps, TextBlock as TextBlockType } from '../../../../shared/types/block';

export const TextBlock: React.FC<BlockComponentProps> = ({ block, style }) => {
  const textBlock = block as TextBlockType;
  return <p style={style}>{textBlock.content}</p>;
}; 