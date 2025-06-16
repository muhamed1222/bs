import { toast } from 'react-toastify';
import { logService } from '../services/logging/LogService';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastHandler = (type: ToastType, message: string) => void;

let toastHandler: ToastHandler | null = null;

export const setToastHandler = (handler: ToastHandler) => {
  toastHandler = handler;
};

export function showError(message: string): void {
  logService.error(message);
  if (toastHandler) {
    toastHandler('error', message);
  } else {
    toast.error(message);
  }
}

export function showSuccess(message: string): void {
  logService.info(message);
  if (toastHandler) {
    toastHandler('success', message);
  } else {
    toast.success(message);
  }
}

export function showWarning(message: string): void {
  logService.warn(message);
  if (toastHandler) {
    toastHandler('warning', message);
  } else {
    toast.warning(message);
  }
}

export function showInfo(message: string): void {
  logService.info(message);
  if (toastHandler) {
    toastHandler('info', message);
  } else {
    toast.info(message);
  }
}
