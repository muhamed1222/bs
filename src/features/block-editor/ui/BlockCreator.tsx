import React, { useState } from 'react';
import { Block } from '@/shared/types/block';
import { blockTypes } from '../model/blockTypes';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import toast from 'react-hot-toast';

interface BlockCreatorProps {
  onBlockAdd: (block: Omit<Block, 'id'>) => void;
}

export const BlockCreator: React.FC<BlockCreatorProps> = ({ onBlockAdd }) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateBlock = async () => {
    if (!selectedType) return;

    try {
      setIsCreating(true);
      const newBlock: Omit<Block, 'id'> = {
        type: selectedType as Block['type'],
        content: '',
        style: {},
        order: 0,
      };

      await onBlockAdd(newBlock);
      toast.success('Блок успешно создан');
      setSelectedType('');
    } catch (error) {
      toast.error('Ошибка при создании блока');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-4">Создать новый блок</h3>
      <div className="flex gap-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className={cn(
            'flex-1 p-2 border rounded transition-colors',
            'focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          )}
        >
          <option value="">Выберите тип блока</option>
          {blockTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <Button
          onClick={handleCreateBlock}
          disabled={!selectedType}
          isLoading={isCreating}
        >
          Создать
        </Button>
      </div>
    </div>
  );
}; 