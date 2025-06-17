import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BlockEditor } from '@/features/block-editor';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Редактор блоков</h1>
        <BlockEditor />
      </div>
    </div>
  );
}; 