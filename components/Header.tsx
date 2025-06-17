'use client';

import React from 'react';
import Link from 'next/link';
import { useViewMode } from '@/contexts/ViewModeContext';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  UserGroupIcon, 
  CreditCardIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Главная', href: '/', icon: HomeIcon },
  { name: 'Страницы', href: '/pages', icon: DocumentTextIcon },
  { name: 'Аналитика', href: '/analytics', icon: ChartBarIcon },
  { name: 'Команда', href: '/team', icon: UserGroupIcon },
  { name: 'Настройки', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Оплата', href: '/billing', icon: CreditCardIcon },
];

export function Header() {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                BS
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  <item.icon className="h-5 w-5 mr-1" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
              className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {viewMode === 'edit' ? (
                <>
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                  Предпросмотр
                </>
              ) : (
                <>
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />
                  Редактировать
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Шапка сайта с логотипом и переключателем режимов просмотра
