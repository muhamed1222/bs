import React from 'react';
import { BaseBlock, BaseBlockProps } from './BaseBlock';

interface LinkBlockContent {
  url: string;
  title: string;
  description?: string;
  icon?: string;
}

export const LinkBlock: React.FC<BaseBlockProps> = ({
  block,
  isEditing,
  onUpdate,
}) => {
  const content = block.content as LinkBlockContent;

  const handleChange = (
    field: keyof LinkBlockContent,
    value: string
  ) => {
    if (!onUpdate) return;
    
    onUpdate({
      ...block,
      content: {
        ...content,
        [field]: value,
      },
    });
  };

  return (
    <BaseBlock block={block} isEditing={isEditing} onUpdate={onUpdate}>
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={content.url}
            onChange={(e) => handleChange('url', e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="URL"
          />
          <input
            type="text"
            value={content.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Заголовок"
          />
          <textarea
            value={content.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Описание (необязательно)"
          />
        </div>
      ) : (
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-3">
            {content.icon && (
              <img
                src={content.icon}
                alt=""
                className="w-8 h-8 rounded"
              />
            )}
            <div>
              <h3 className="font-medium text-gray-900">{content.title}</h3>
              {content.description && (
                <p className="text-sm text-gray-500">{content.description}</p>
              )}
            </div>
          </div>
        </a>
      )}
    </BaseBlock>
  );
}; 