import React from 'react';
import { BasisBSolidIcon } from './icons/IconComponents';
import type { SocialLink } from '../types';
import { Skeleton } from './Skeleton';

interface Props {
  name?: string;
  bio?: string;
  socials?: SocialLink[];
  avatarUrl?: string | null;
  loading?: boolean;
}

export const ProfileSidebar: React.FC<Props> = ({
  name,
  bio,
  socials = [],
  avatarUrl,
  loading,
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
    <aside className="w-full md:max-w-[484px] md:flex-shrink-0 space-y-[36px] py-4 md:py-0">
      {/* Profile Image Section */}
      <div className="relative group">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name || 'avatar'}
            className="w-[184px] h-[184px] rounded-[12px] object-cover"
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
        {name && (
          <h1 className="font-pragmatica text-gray-900 text-[56px] font-[750] leading-[52px] tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            {name}
          </h1>
        )}
        {bio && (
          <p className="text-gray-600 text-[19px] font-normal leading-[28px] max-w-[420px]">
            {bio}
          </p>
        )}

        {/* Social Links */}
        {socials.length > 0 && (
          <div className="flex items-center space-x-4 pt-4">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.href}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <s.icon className="w-5 h-5 text-gray-600" />
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

// Сайдбар публичного профиля с аватаром и ссылками на соцсети
