// Провайдер уведомлений
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { ToastType, setToastHandler } from '../utils/toast';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toasts: Toast[];
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  showWarning: (msg: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Провайдер уведомлений
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (type: ToastType, msg: string) => {
      const id = Date.now();
      setToasts((t) => [...t, { id, type, message: msg }]);
      setTimeout(() => remove(id), 3000);
    },
    [remove]
  );

  useEffect(() => {
    setToastHandler(show);
  }, [show]);

  const ctx: ToastContextValue = {
    toasts,
    showSuccess: (msg) => show('success', msg),
    showError: (msg) => show('error', msg),
    showWarning: (msg) => show('warning', msg),
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded shadow text-white ${
              t.type === 'success'
                ? 'bg-green-600'
                : t.type === 'warning'
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
}

// Провайдер toast-уведомлений
