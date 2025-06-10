import React from 'react';
import { BasisBSolidIcon } from './icons/IconComponents';
import type { SocialLink } from '../types';
import { Skeleton } from './Skeleton';

}) => {
  // Сайдбар публичного профиля
  if (loading) {
    return (
      <aside className="w-full md:max-w-[484px] md:flex-shrink-0 space-y-[36px] py-4 md:py-0">
        <Skeleton className="w-[184px] h-[184px]" />
        <div className="space-y-3">
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="h-5 w-full" />
        </div>
      </aside>
    );
  }

  return (
    <aside className={className}>
      {/* Profile Image Section */}
      <div className="relative group">
          />
        ) : (
          <div className="w-[184px] h-[184px] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-[12px] flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 border border-blue-300/30">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <BasisBSolidIcon
              className="w-[92px] h-[130px] text-white relative z-10 group-hover:scale-105 transition-transform duration-300"
              innercolor="#3B82F6"
            />
          </div>
        )}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-[13px] opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
      </div>

      {/* Profile Text Section */}
      <div className="space-y-[20px]">
      </div>
    </aside>
  );
};

// Сайдбар публичного профиля с аватаром и ссылками на соцсети
