import { useState } from 'react';
import { Block } from '@/shared/types/block';
import { blockService } from '../api/blockService';

export const useBlockEditor = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const handleBlockSelect = (block: Block) => {
    setSelectedBlock(block);
  };

  const handleBlockUpdate = async (updatedBlock: Block) => {
    try {
      await blockService.updateBlock(updatedBlock);
      setBlocks(blocks.map(block => 
        block.id === updatedBlock.id ? updatedBlock : block
      ));
      setSelectedBlock(updatedBlock);
    } catch (error) {
      console.error('Failed to update block:', error);
    }
  };

  const handleBlockAdd = async (newBlock: Block) => {
    try {
      const createdBlock = await blockService.createBlock(newBlock);
      setBlocks([...blocks, createdBlock]);
    } catch (error) {
      console.error('Failed to create block:', error);
    }
  };

  const handleBlockDelete = async (blockId: string) => {
    try {
      await blockService.deleteBlock(blockId);
      setBlocks(blocks.filter(block => block.id !== blockId));
      if (selectedBlock?.id === blockId) {
        setSelectedBlock(null);
      }
    } catch (error) {
      console.error('Failed to delete block:', error);
    }
  };

  const handleBlockMove = async (blockId: string, newIndex: number) => {
    try {
      const updatedBlocks = [...blocks];
      const blockIndex = updatedBlocks.findIndex(block => block.id === blockId);
      const [movedBlock] = updatedBlocks.splice(blockIndex, 1);
      updatedBlocks.splice(newIndex, 0, movedBlock);
      
      await blockService.updateBlocksOrder(updatedBlocks);
      setBlocks(updatedBlocks);
    } catch (error) {
      console.error('Failed to move block:', error);
    }
  };

  return {
    blocks,
    selectedBlock,
    handleBlockSelect,
    handleBlockUpdate,
    handleBlockAdd,
    handleBlockDelete,
    handleBlockMove,
  };
}; 