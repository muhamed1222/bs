'use client';

import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ToastProvider';
import { I18nProvider } from '@/contexts/I18nContext';
import { QueryProvider } from '@/components/QueryProvider';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ViewModeProvider>
          <I18nProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </I18nProvider>
        </ViewModeProvider>
      </AuthProvider>
    </QueryProvider>
  );
} 