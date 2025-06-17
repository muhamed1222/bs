import React from 'react';
import { BlockComponentProps, ButtonBlock as ButtonBlockType } from '../../../../shared/types/block';

export const ButtonBlock: React.FC<BlockComponentProps> = ({ block, style }) => {
  const buttonBlock = block as ButtonBlockType;
  return (
    <button
      className="px-4 py-2 rounded"
      style={style}
      onClick={buttonBlock.onClick}
    >
      {buttonBlock.content}
    </button>
  );
}; 