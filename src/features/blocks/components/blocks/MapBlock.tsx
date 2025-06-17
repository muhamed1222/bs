import React from 'react';
import { BlockComponentProps, MapBlock as MapBlockType } from '../../../../shared/types/block';

export const MapBlock: React.FC<BlockComponentProps> = ({ block, style }) => {
  const mapBlock = block as MapBlockType;
  return (
    <iframe
      src={mapBlock.content}
      width="100%"
      height="300"
      className="rounded"
      style={{ ...style, border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}; 