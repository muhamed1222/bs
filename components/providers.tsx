'use client';

import { ViewModeProvider } from '@/contexts/ViewModeContext';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ViewModeProvider>
      {children}
    </ViewModeProvider>
  );
} 