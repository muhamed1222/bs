import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function useGATracking() {
  const location = useLocation();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return;
    window.gtag('config', GA_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);
}
