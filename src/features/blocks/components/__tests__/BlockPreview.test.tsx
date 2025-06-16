import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlockPreview } from '../BlockPreview';
import { Block } from '@/shared/types';

describe('BlockPreview', () => {
  it('рендерит текстовый блок', () => {
    const block: Block = {
      id: '1',
      type: 'text',
      content: { text: 'Test text block' },
      order: 0,
    };

    render(<BlockPreview block={block} />);
    expect(screen.getByText('Test text block')).toBeInTheDocument();
  });

  it('рендерит ссылку', () => {
    const block: Block = {
      id: '2',
      type: 'link',
      content: { url: 'https://example.com', text: 'Test link' },
      order: 1,
    };

    render(<BlockPreview block={block} />);
    const link = screen.getByText('Test link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('рендерит изображение', () => {
    const block: Block = {
      id: '3',
      type: 'image',
      content: { url: 'https://example.com/image.jpg', alt: 'Test image' },
      order: 2,
    };

    render(<BlockPreview block={block} />);
    const image = screen.getByAltText('Test image');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('применяет стили к блоку', () => {
    const block: Block = {
      id: '1',
      type: 'text',
      content: { text: 'Test text block' },
      order: 0,
      style: {
        backgroundColor: '#f0f0f0',
        textColor: '#333',
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
      },
    };

    render(<BlockPreview block={block} />);
    const element = screen.getByText('Test text block').parentElement;
    expect(element).toHaveStyle({
      backgroundColor: '#f0f0f0',
      color: '#333',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
    });
  });

  it('отображает сообщение об ошибке для неизвестного типа блока', () => {
    const block: Block = {
      id: '1',
      type: 'unknown' as any,
      content: {},
      order: 0,
    };

    render(<BlockPreview block={block} />);
    expect(screen.getByText(/неизвестный тип блока/i)).toBeInTheDocument();
  });

  it('применяет дополнительные классы', () => {
    const block: Block = {
      id: '1',
      type: 'text',
      content: { text: 'Test text block' },
      order: 0,
    };

    render(<BlockPreview block={block} className="custom-class" />);
    const element = screen.getByText('Test text block').parentElement;
    expect(element).toHaveClass('custom-class');
  });
}); 