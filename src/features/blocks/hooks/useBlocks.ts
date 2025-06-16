import { useState, useCallback } from 'react';
import { Block, BlockType } from '@/shared/types';

interface UseBlocksProps {
  initialBlocks?: Block[];
  onBlocksChange?: (blocks: Block[]) => void;
}

export const useBlocks = ({ initialBlocks = [], onBlocksChange }: UseBlocksProps = {}) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  const addBlock = useCallback((type: BlockType) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      content: {},
      order: blocks.length,
    };

    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    onBlocksChange?.(newBlocks);
  }, [blocks, onBlocksChange]);

  const updateBlock = useCallback((updatedBlock: Block) => {
    const newBlocks = blocks.map(block =>
      block.id === updatedBlock.id ? updatedBlock : block
    );
    setBlocks(newBlocks);
    onBlocksChange?.(newBlocks);
  }, [blocks, onBlocksChange]);

  const deleteBlock = useCallback((blockId: string) => {
    const newBlocks = blocks.filter(block => block.id !== blockId);
    setBlocks(newBlocks);
    onBlocksChange?.(newBlocks);
  }, [blocks, onBlocksChange]);

  const reorderBlocks = useCallback((startIndex: number, endIndex: number) => {
    const result = Array.from(blocks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const reorderedBlocks = result.map((block, index) => ({
      ...block,
      order: index,
    }));

    setBlocks(reorderedBlocks);
    onBlocksChange?.(reorderedBlocks);
  }, [blocks, onBlocksChange]);

  return {
    blocks,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
  };
}; 