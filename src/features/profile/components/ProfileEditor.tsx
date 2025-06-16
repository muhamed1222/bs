import React from 'react';
import { Profile } from '@/shared/types';
import { BlockRenderer } from '@/features/blocks/components/BlockRenderer';
import { useBlocks } from '@/features/blocks/hooks/useBlocks';
import { Button } from '@/shared/ui/Button';

interface ProfileEditorProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
  onCancel: () => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({
  profile,
  onSave,
  onCancel,
}) => {
  const {
    blocks,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
  } = useBlocks({
    initialBlocks: profile.blocks,
    onBlocksChange: (newBlocks) => {
      onSave({
        ...profile,
        blocks: newBlocks,
      });
    },
  });

  const handleAddBlock = (type: string) => {
    addBlock(type as any);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Редактирование профиля</h1>
        <div className="flex space-x-4">
          <Button
            variant="primary"
            onClick={() => handleAddBlock('text')}
          >
            Добавить текст
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAddBlock('link')}
          >
            Добавить ссылку
          </Button>
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Отмена
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isEditing
            onUpdate={updateBlock}
            onDelete={deleteBlock}
          />
        ))}
      </div>
    </div>
  );
}; 