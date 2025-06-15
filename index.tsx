// Инициализация приложения
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/ToastProvider';
import { ViewModeProvider } from './contexts/ViewModeContext';
import { I18nProvider } from './contexts/I18nContext';
import { setupDebug } from './utils/debug';
import './index.css';

setupDebug();

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}

let rootElement = document.getElementById('root');
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
}

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ViewModeProvider>
            <I18nProvider>
              <ToastProvider>
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
              </ToastProvider>
            </I18nProvider>
          </ViewModeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

// Инициализация React-приложения и подключение провайдеров
