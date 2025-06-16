import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlockList } from '../BlockList';
import { Block } from '@/shared/types';

describe('BlockList', () => {
  const mockBlocks: Block[] = [
    {
      id: '1',
      type: 'text',
      content: { text: 'Test text block' },
      order: 0,
    },
    {
      id: '2',
      type: 'link',
      content: { url: 'https://example.com', text: 'Test link' },
      order: 1,
    },
    {
      id: '3',
      type: 'image',
      content: { url: 'https://example.com/image.jpg', alt: 'Test image' },
      order: 2,
    },
  ];

  it('рендерит список блоков в правильном порядке', () => {
    render(<BlockList blocks={mockBlocks} />);
    
    const blocks = screen.getAllByTestId('block');
    expect(blocks).toHaveLength(3);
    expect(blocks[0]).toHaveTextContent('Test text block');
    expect(blocks[1]).toHaveTextContent('Test link');
    expect(blocks[2]).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('применяет layout классы', () => {
    render(<BlockList blocks={mockBlocks} layout="grid" />);
    const container = screen.getByTestId('blocks-container');
    expect(container).toHaveClass('grid');
  });

  it('применяет theme классы', () => {
    render(<BlockList blocks={mockBlocks} theme="dark" />);
    const container = screen.getByTestId('blocks-container');
    expect(container).toHaveClass('theme-dark');
  });

  it('обрабатывает пустой массив блоков', () => {
    render(<BlockList blocks={[]} />);
    expect(screen.queryByTestId('block')).not.toBeInTheDocument();
  });

  it('вызывает onDelete при удалении блока', () => {
    const onDelete = jest.fn();
    render(<BlockList blocks={mockBlocks} isEditing onDelete={onDelete} />);
    
    const deleteButtons = screen.getAllByRole('button');
    expect(deleteButtons).toHaveLength(3);
    
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(mockBlocks[0].id);
  });

  it('не отображает кнопки удаления в режиме просмотра', () => {
    render(<BlockList blocks={mockBlocks} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('вызывает onReorder при изменении порядка блоков', () => {
    const onReorder = jest.fn();
    render(<BlockList blocks={mockBlocks} isEditing onReorder={onReorder} />);
    
    const reorderButtons = screen.getAllByTestId('reorder-button');
    expect(reorderButtons).toHaveLength(6); // 2 кнопки на каждый блок (вверх/вниз)
    
    fireEvent.click(reorderButtons[0]); // Переместить первый блок вверх
    expect(onReorder).toHaveBeenCalledWith(0, -1);
  });

  it('не отображает кнопки переупорядочивания в режиме просмотра', () => {
    render(<BlockList blocks={mockBlocks} />);
    expect(screen.queryByTestId('reorder-button')).not.toBeInTheDocument();
  });
}); 