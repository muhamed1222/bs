import React from 'react';
import { BlockPreviewProps } from '../../../shared/types/block';

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

  const renderBlock = () => {
    switch (block.type) {
      case 'text':
        return <p style={getBlockStyles()}>{block.content}</p>;
      case 'image':
        return (
          <img
            src={block.content}
            alt="Block content"
            className="w-full h-auto"
            style={getBlockStyles()}
          />
        );
      case 'button':
        return (
          <button
            className="px-4 py-2 rounded"
            style={getBlockStyles()}
          >
            {block.content}
          </button>
        );
      case 'video':
        return (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={block.content}
              title="Video content"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
              style={getBlockStyles()}
            />
          </div>
        );
      case 'form':
        return (
          <form className="space-y-4" style={getBlockStyles()}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded"
            >
              Отправить
            </button>
          </form>
        );
      case 'map':
        return (
          <iframe
            src={block.content}
            width="100%"
            height="300"
            className="rounded"
            style={{ ...getBlockStyles(), border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        );
      default:
        return <p className="text-red-500">Неизвестный тип блока</p>;
    }
  };

  return (
    <div className={`block-preview ${className}`}>
      {renderBlock()}
    </div>
  );
}; 