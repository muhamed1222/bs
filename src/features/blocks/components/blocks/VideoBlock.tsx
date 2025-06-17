import React from 'react';
import { BlockComponentProps, VideoBlock as VideoBlockType } from '../../../../shared/types/block';

export const VideoBlock: React.FC<BlockComponentProps> = ({ block, style }) => {
  const videoBlock = block as VideoBlockType;
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={videoBlock.content}
        title="Video content"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded"
        style={style}
      />
    </div>
  );
}; 