import React from 'react';
import { Link } from 'react-router-dom';
import {
  BasisLogoParts,
  DesktopViewIcon,
  MobileViewIcon,
} from './icons/IconComponents';
import { Tooltip } from './Tooltip';

export const Header: React.FC = () => {
  // Шапка сайта
  const [isDesktopViewActive, setIsDesktopViewActive] = React.useState(true);

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[48px]">
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center p-[6px] bg-gradient-to-r from-gray-50 to-white rounded-[16px] space-x-3 hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-[2px] px-[6px] py-[4px]">
              <BasisLogoParts />
            </div>
            <span className="font-pragmatica text-gray-900 text-[28px] font-[700] leading-[28px] tracking-tight">
              Basis
            </span>
          </Link>

          {/* Center: View Icons */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-[12px] p-[3px] shadow-inner">
            <Tooltip text="Десктопный режим">
              <button
                id="view-toggle-desktop"
                aria-label="Desktop view"
                aria-pressed={isDesktopViewActive}
                onClick={() => setIsDesktopViewActive(true)}
                className={`p-[10px] rounded-[9px] transition-all duration-300 ${
                  isDesktopViewActive
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-700'
                }`}
              >
                <DesktopViewIcon className="w-[18px] h-[19px]" />
              </button>
            </Tooltip>
            <Tooltip text="Мобильный режим">
              <button
                aria-label="Mobile view"
                aria-pressed={!isDesktopViewActive}
                onClick={() => setIsDesktopViewActive(false)}
                className={`p-[10px] rounded-[9px] transition-all duration-300 ${
                  !isDesktopViewActive
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-700'
                }`}
              >
                <MobileViewIcon className="w-[19px] h-[19px]" />
              </button>
            </Tooltip>
          </div>

          {/* Right: Auth Buttons */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-[16px] p-[10px] flex items-center space-x-2 border border-gray-200 shadow-sm">
            <Tooltip text="Войти в аккаунт">
              <Link
                to="/auth?action=login"
                className="px-[16px] py-[8px] text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 rounded-[10px] transition-all duration-300 leading-[20px] shadow-sm border border-gray-200 hover:shadow-md"
              >
                Войти
              </Link>
            </Tooltip>
            <Tooltip text="Создать новый аккаунт">
              <Link
                to="/auth?action=signup"
                className="px-[16px] py-[8px] text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-[10px] transition-all duration-300 leading-[20px] shadow-md hover:shadow-lg"
              >
                Регистрация
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
};

