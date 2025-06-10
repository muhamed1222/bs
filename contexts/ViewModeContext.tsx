import React, { createContext, useContext, useState, useEffect } from 'react';

interface ViewModeContextValue {
  isDesktopView: boolean;
  setIsDesktopView: (desktop: boolean) => void;
}

const ViewModeContext = createContext<ViewModeContextValue | undefined>(undefined);

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getIsDesktop = () => (typeof window === 'undefined' ? true : window.innerWidth >= 1024);
  const [isDesktopView, setIsDesktopView] = useState<boolean>(getIsDesktop);

  useEffect(() => {
    const handleResize = () => setIsDesktopView(getIsDesktop());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ViewModeContext.Provider value={{ isDesktopView, setIsDesktopView }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error('useViewMode must be used within ViewModeProvider');
  return ctx;
};
