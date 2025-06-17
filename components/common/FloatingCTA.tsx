'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
    >
      <Link
        href="/signup"
        className={`flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 ${
          isHovered
            ? 'scale-105 shadow-xl'
            : 'scale-100'
        } bg-gradient-to-r from-blue-700 to-purple-600 text-white font-bold`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>Создать страницу</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isHovered ? 'translate-x-1' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>
    </div>
  );
};

export default FloatingCTA; 