import React, { useState } from 'react';
import { Block } from '@/shared/types/block';
import { BlockPreview } from './BlockPreview';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog';
import toast from 'react-hot-toast';

interface BlockListProps {
  blocks: Block[];
  selectedBlock: Block | null;
  onBlockSelect: (block: Block) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockMove: (blockId: string, newIndex: number) => void;
}

export const BlockList: React.FC<BlockListProps> = ({
  blocks,
  selectedBlock,
  onBlockSelect,
  onBlockDelete,
  onBlockMove,
}) => {
  const [blockToDelete, setBlockToDelete] = useState<Block | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    if (sourceIndex !== destinationIndex) {
      onBlockMove(blocks[sourceIndex].id, destinationIndex);
      toast.success('Порядок блоков обновлен');
    }
  };

  const handleDeleteClick = (block: Block, e: React.MouseEvent) => {
    e.stopPropagation();
    setBlockToDelete(block);
  };

  const handleConfirmDelete = async () => {
    if (!blockToDelete) return;

    try {
      setIsDeleting(true);
      await onBlockDelete(blockToDelete.id);
      toast.success('Блок успешно удален');
    } catch (error) {
      toast.error('Ошибка при удалении блока');
    } finally {
      setIsDeleting(false);
      setBlockToDelete(null);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {blocks.map((block, index) => (
                <Draggable
                  key={block.id}
                  draggableId={block.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        'p-4 border rounded-lg cursor-pointer transition-colors',
                        selectedBlock?.id === block.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      )}
                      onClick={() => onBlockSelect(block)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium">{block.type}</h3>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={(e) => handleDeleteClick(block, e)}
                        >
                          Удалить
                        </Button>
                      </div>
                      <BlockPreview block={block} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <ConfirmDialog
        isOpen={!!blockToDelete}
        onClose={() => setBlockToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Удаление блока"
        description="Вы уверены, что хотите удалить этот блок? Это действие нельзя отменить."
        confirmText="Удалить"
        variant="danger"
      />
    </>
  );
}; 