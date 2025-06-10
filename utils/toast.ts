export type ToastType = 'success' | 'error' | 'warning';

let handler: (type: ToastType, message: string) => void = () => {};

export function setToastHandler(
  fn: (type: ToastType, message: string) => void
) {
  handler = fn;
}

function emit(type: ToastType, message: string) {
  handler(type, message);
}

export function showSuccess(message: string) {
  emit('success', message);
}

export function showError(message: string) {
  emit('error', message);
}

export function showWarning(message: string) {
  emit('warning', message);
}
