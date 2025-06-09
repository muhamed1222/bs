export function setupDebug(): void {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error || event.message);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
  });

  const originalWarn = console.warn;
  console.warn = (...args: unknown[]): void => {
    originalWarn(...args);
  };
}
