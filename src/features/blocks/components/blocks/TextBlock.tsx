import React from 'react';
import { BaseBlock, BaseBlockProps } from './BaseBlock';

interface TextBlockContent {
  text: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export const TextBlock: React.FC<BaseBlockProps> = ({
  block,
  isEditing,
  onUpdate,
}) => {
  const content = block.content as TextBlockContent;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!onUpdate) return;
    
    onUpdate({
      ...block,
      content: {
        ...content,
        text: e.target.value,
      },
    });
  };

  return (
    <BaseBlock block={block} isEditing={isEditing} onUpdate={onUpdate}>
      {isEditing ? (
        <textarea
          value={content.text}
          onChange={handleTextChange}
          className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Введите текст..."
        />
      ) : (
        <div
          style={{
            fontSize: content.fontSize,
            fontWeight: content.fontWeight,
            textAlign: content.textAlign,
          }}
        >
          {content.text}
        </div>
      )}
    </BaseBlock>
  );
}; 