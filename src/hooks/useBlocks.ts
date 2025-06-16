import { useState, useEffect } from 'react';
import { Block } from '../shared/types/block';
import { api } from '../services/api';

export const useBlocks = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/blocks');
        setBlocks(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blocks'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  const addBlock = async (block: Omit<Block, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/blocks', block);
      setBlocks((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add block');
    }
  };

  const updateBlock = async (id: string, updates: Partial<Block>) => {
    try {
      const response = await api.patch(`/blocks/${id}`, updates);
      setBlocks((prev) =>
        prev.map((block) => (block.id === id ? response.data : block))
      );
      return response.data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update block');
    }
  };

  const deleteBlock = async (id: string) => {
    try {
      await api.delete(`/blocks/${id}`);
      setBlocks((prev) => prev.filter((block) => block.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete block');
    }
  };

  return {
    blocks,
    isLoading,
    error,
    addBlock,
    updateBlock,
    deleteBlock,
  };
}; 