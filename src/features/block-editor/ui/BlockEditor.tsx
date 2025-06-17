import React from 'react';
import { Block } from '@/shared/types/block';
import { BlockList } from './BlockList';
import { BlockCreator } from './BlockCreator';
import { BlockStyleEditor } from './BlockStyleEditor';
import { useBlockEditor } from '../model/useBlockEditor';

export const BlockEditor: React.FC = () => {
  const {
    blocks,
    selectedBlock,
    handleBlockSelect,
    handleBlockUpdate,
    handleBlockAdd,
    handleBlockDelete,
    handleBlockMove,
  } = useBlockEditor();

  return (
    <div className="flex flex-col gap-4">
      <BlockList
        blocks={blocks}
        selectedBlock={selectedBlock}
        onBlockSelect={handleBlockSelect}
        onBlockDelete={handleBlockDelete}
        onBlockMove={handleBlockMove}
      />
      <BlockCreator onBlockAdd={handleBlockAdd} />
      {selectedBlock && (
        <BlockStyleEditor
          block={selectedBlock}
          onBlockUpdate={handleBlockUpdate}
        />
      )}
    </div>
  );
}; 