import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Block } from '@/shared/types';
import { BlockRenderer } from './BlockRenderer';
import { useUser } from '@/features/auth/hooks/useUser';
import { toast } from 'react-hot-toast';

interface BlockListProps {
  blocks: Block[];
  onUpdate: (blocks: Block[]) => void;
  onDelete: (blockId: string) => void;
  isEditing?: boolean;
}

export const BlockList: React.FC<BlockListProps> = ({
  blocks,
  onUpdate,
  onDelete,
  isEditing = false,
}) => {
  const { user } = useUser();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);

      const newBlocks = arrayMove(blocks, oldIndex, newIndex).map(
        (block, index) => ({
          ...block,
          order: index,
        })
      );

      onUpdate(newBlocks);
      toast.success('Порядок блоков обновлен');
    }
  };

  const handleUpdate = (blockId: string, content: any) => {
    const newBlocks = blocks.map((block) =>
      block.id === blockId ? { ...block, content } : block
    );
    onUpdate(newBlocks);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={blocks.map((block) => block.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              isEditing={isEditing}
              onUpdate={handleUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}; 