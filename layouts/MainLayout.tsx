import React from 'react';
import { Header } from '../components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-[8px] flex flex-col items-center overflow-x-hidden">
      <div className="fixed top-[8px] left-[8px] right-[8px] z-50">
        <div className="w-full max-w-[1440px] mx-auto">
          <Header />
        </div>
      </div>
      <div className="w-full max-w-[1440px] flex flex-col pt-[72px]">
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;