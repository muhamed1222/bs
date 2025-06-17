'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ViewMode = 'edit' | 'preview' | 'live';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('edit');

  useEffect(() => {
    // Восстанавливаем режим просмотра из localStorage при монтировании
    const savedMode = localStorage.getItem('viewMode') as ViewMode;
    if (savedMode) {
      setViewMode(savedMode);
    }
  }, []);

  const handleSetViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode: handleSetViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within ViewModeProvider');
  }
  return context;
}
