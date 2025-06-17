import { useEffect } from 'react';
import { useRouter } from 'next/router';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function useGATracking() {
  const router = useRouter();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== 'function') return;
    
    const handleRouteChange = (url: string) => {
      window.gtag?.('config', GA_ID, {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}
