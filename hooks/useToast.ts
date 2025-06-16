import { useState, useCallback } from 'react';
import { ToastType } from '../components/Toast';
import { logService } from '../services/logging/LogService';

interface ToastOptions {
  duration?: number;
  type?: ToastType;
}

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, options: ToastOptions = {}) => {
    const { duration = 5000, type = 'info' } = options;
    const id = Date.now();

    setToasts(prev => [...prev, { id, message, type, duration }]);

    logService.info(`Toast created: ${message}`, { type, duration });

    return id;
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'success' });
  }, [showToast]);

  const error = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'error' });
  }, [showToast]);

  const warning = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'warning' });
  }, [showToast]);

  const info = useCallback((message: string, options: Omit<ToastOptions, 'type'> = {}) => {
    return showToast(message, { ...options, type: 'info' });
  }, [showToast]);

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
}; 