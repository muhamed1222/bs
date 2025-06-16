import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlockRenderer } from '../BlockRenderer';
import { Block } from '@/shared/types';

describe('BlockRenderer', () => {
  const mockBlock: Block = {
    id: '1',
    type: 'text',
    content: { text: 'Test text block' },
    order: 0,
  };

  it('рендерит текстовый блок', () => {
    render(<BlockRenderer block={mockBlock} />);
    expect(screen.getByText('Test text block')).toBeInTheDocument();
  });

  it('рендерит ссылку', () => {
    const linkBlock: Block = {
      id: '2',
      type: 'link',
      content: { url: 'https://example.com', text: 'Test link' },
      order: 1,
    };

    render(<BlockRenderer block={linkBlock} />);
    const link = screen.getByText('Test link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('рендерит изображение', () => {
    const imageBlock: Block = {
      id: '3',
      type: 'image',
      content: { url: 'https://example.com/image.jpg', alt: 'Test image' },
      order: 2,
    };

    render(<BlockRenderer block={imageBlock} />);
    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('применяет стили к блоку', () => {
    const blockWithStyles: Block = {
      ...mockBlock,
      style: {
        backgroundColor: '#f0f0f0',
        textColor: '#333',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
      },
    };

    render(<BlockRenderer block={blockWithStyles} />);
    const block = screen.getByTestId('block');
    expect(block).toHaveStyle({
      backgroundColor: '#f0f0f0',
      color: '#333',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
    });
  });

  it('отображает кнопку удаления в режиме редактирования', () => {
    const onDelete = jest.fn();
    render(<BlockRenderer block={mockBlock} isEditing onDelete={onDelete} />);
    
    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
    
    deleteButton.click();
    expect(onDelete).toHaveBeenCalledWith(mockBlock.id);
  });

  it('не отображает кнопку удаления в режиме просмотра', () => {
    render(<BlockRenderer block={mockBlock} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('обрабатывает неизвестный тип блока', () => {
    const unknownBlock: Block = {
      id: '1',
      type: 'unknown' as any,
      content: {},
      order: 0,
    };

    render(<BlockRenderer block={unknownBlock} />);
    expect(screen.queryByTestId('block')).not.toBeInTheDocument();
  });
}); 