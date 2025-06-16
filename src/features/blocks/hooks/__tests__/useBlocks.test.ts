import { renderHook, act } from '@testing-library/react-hooks';
import { useBlocks } from '../useBlocks';
import { Block, BlockType } from '@/shared/types';

describe('useBlocks', () => {
  const mockInitialBlocks: Block[] = [
    {
      id: '1',
      type: 'text' as BlockType,
      content: { text: 'Test text' },
      order: 0,
    },
  ];

  const mockOnBlocksChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('инициализируется с начальными блоками', () => {
    const { result } = renderHook(() =>
      useBlocks({ initialBlocks: mockInitialBlocks })
    );

    expect(result.current.blocks).toEqual(mockInitialBlocks);
  });

  it('добавляет новый блок', () => {
    const { result } = renderHook(() =>
      useBlocks({ onBlocksChange: mockOnBlocksChange })
    );

    act(() => {
      result.current.addBlock('text' as BlockType);
    });

    expect(result.current.blocks).toHaveLength(1);
    expect(result.current.blocks[0].type).toBe('text');
    expect(mockOnBlocksChange).toHaveBeenCalledWith(result.current.blocks);
  });

  it('обновляет существующий блок', () => {
    const { result } = renderHook(() =>
      useBlocks({
        initialBlocks: mockInitialBlocks,
        onBlocksChange: mockOnBlocksChange,
      })
    );

    const updatedBlock = {
      ...mockInitialBlocks[0],
      content: { text: 'Updated text' },
    };

    act(() => {
      result.current.updateBlock(updatedBlock);
    });

    expect(result.current.blocks[0].content).toEqual({ text: 'Updated text' });
    expect(mockOnBlocksChange).toHaveBeenCalledWith(result.current.blocks);
  });

  it('удаляет блок', () => {
    const { result } = renderHook(() =>
      useBlocks({
        initialBlocks: mockInitialBlocks,
        onBlocksChange: mockOnBlocksChange,
      })
    );

    act(() => {
      result.current.deleteBlock('1');
    });

    expect(result.current.blocks).toHaveLength(0);
    expect(mockOnBlocksChange).toHaveBeenCalledWith([]);
  });

  it('переупорядочивает блоки', () => {
    const initialBlocks: Block[] = [
      {
        id: '1',
        type: 'text' as BlockType,
        content: { text: 'First' },
        order: 0,
      },
      {
        id: '2',
        type: 'text' as BlockType,
        content: { text: 'Second' },
        order: 1,
      },
    ];

    const { result } = renderHook(() =>
      useBlocks({
        initialBlocks,
        onBlocksChange: mockOnBlocksChange,
      })
    );

    act(() => {
      result.current.reorderBlocks(0, 1);
    });

    expect(result.current.blocks[0].id).toBe('2');
    expect(result.current.blocks[1].id).toBe('1');
    expect(mockOnBlocksChange).toHaveBeenCalledWith(result.current.blocks);
  });
}); 