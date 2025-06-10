import React from 'react';
import { BentoItem } from '../types';

export const BentoItemCard: React.FC<{ item: BentoItem }> = ({ item }) => {
  const baseCardClass =
    'group shadow-[0px_4px_12px_rgba(0,0,0,0.08)] rounded-[12px] border border-gray-200/50 transition-all duration-300 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)] hover:border-gray-300/50 hover:-translate-y-1 backdrop-blur-sm';
  const paddingClass = 'p-[18px]';

  // Smol variant: Icon top, then text
  if (item.variant === 'smol_icon_text_vertical') {
    return (
      <div
        className={`${baseCardClass} ${item.gridClass || ''} ${paddingClass} flex flex-col justify-between space-y-[10px] bg-gradient-to-br from-gray-50 to-gray-100 w-[175px] h-[175px] overflow-hidden relative`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
        {item.icon && (
          <div
            className={`relative p-[10px] ${item.iconBgClass || 'bg-gradient-to-br from-gray-800 to-gray-900'} rounded-[8px] w-[44px] h-[44px] flex items-center justify-center shadow-[0px_4px_8px_rgba(0,0,0,0.15)] group-hover:shadow-[0px_6px_12px_rgba(0,0,0,0.2)] transition-all duration-300`}
          >
            <item.icon className="w-[26px] h-[26px] text-white" />
          </div>
        )}
        <div className="flex flex-col gap-[10px] relative z-10">
          {item.title && (
            <h3 className="text-gray-900 text-[16px] font-semibold leading-[20px] group-hover:text-gray-800 transition-colors">
              {item.title}
            </h3>
          )}
          {item.description && (
            <p className="text-gray-600 text-[11px] leading-[14px] group-hover:text-gray-700 transition-colors">
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Medium variant: Text left, Image right
  if (item.variant === 'medium_text_right_image') {
    return (
      <div
        className={`${baseCardClass} ${item.gridClass || ''} ${paddingClass} flex justify-between bg-white w-[390px] min-h-[175px] overflow-hidden relative`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent pointer-events-none"></div>
        <div className="flex flex-col justify-start gap-[14px] w-[140px] shrink-0 relative z-10">
          {item.icon && (
            <div
              className={`p-[8px] ${item.iconBgClass || 'bg-gradient-to-br from-gray-800 to-gray-900'} rounded-[8px] w-[44px] h-[44px] flex items-center justify-center shadow-[0px_4px_8px_rgba(0,0,0,0.15)] group-hover:shadow-[0px_6px_12px_rgba(0,0,0,0.2)] transition-all duration-300`}
            >
              <item.icon className="w-[26px] h-[26px] text-white" />
            </div>
          )}
          <div className="flex flex-col gap-[10px] flex-grow">
            {item.title && (
              <h3 className="text-gray-900 text-[15px] font-semibold leading-[18px] group-hover:text-gray-800 transition-colors">
                {item.title}
              </h3>
            )}
            {item.description && (
              <p className="text-gray-600 text-[13px] leading-[18px] group-hover:text-gray-700 transition-colors">
                {item.description}
              </p>
            )}
          </div>
        </div>
        {item.imageUrl && (
          <div className="relative overflow-hidden rounded-[8px] ml-[24px]">
            <img
              src={item.imageUrl}
              alt={item.imageAlt || item.title || 'Showcase image'}
              className="w-[155px] h-[147px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
      </div>
    );
  }

  // Big variant: Icon and text top, Image bottom
  if (item.variant === 'big_text_over_image') {
    return (
      <div
        className={`${baseCardClass} ${item.gridClass || ''} ${paddingClass} flex flex-col justify-between bg-white w-[390px] h-[390px] overflow-hidden relative`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent pointer-events-none"></div>
        <div className="flex flex-col gap-[14px] h-[126px] relative z-10">
          {item.icon && (
            <div
              className={`p-[8px] ${item.iconBgClass || 'bg-gradient-to-br from-gray-800 to-gray-900'} rounded-[8px] w-[44px] h-[44px] flex items-center justify-center shadow-[0px_4px_8px_rgba(0,0,0,0.15)] group-hover:shadow-[0px_6px_12px_rgba(0,0,0,0.2)] transition-all duration-300`}
            >
              <item.icon className="w-[26px] h-[26px] text-white" />
            </div>
          )}
          <div className="flex flex-col gap-[10px] flex-grow">
            {item.title && (
              <h3 className="text-gray-900 text-[17px] font-semibold leading-[22px] group-hover:text-gray-800 transition-colors">
                {item.title}
              </h3>
            )}
            {item.description && (
              <p className="text-gray-600 text-[13px] leading-[18px] group-hover:text-gray-700 transition-colors">
                {item.description}
              </p>
            )}
          </div>
        </div>
        {item.imageUrl && (
          <div className="relative overflow-hidden rounded-[8px] mt-[24px]">
            <img
              src={item.imageUrl}
              alt={item.imageAlt || item.title || 'Showcase image'}
              className="w-full h-[192px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}
      </div>
    );
  }

  // Fallback for unhandled or new variants
  if (item.variant === 'custom_action_bar') {
    return null;
  }

  return (
    <div className="bg-red-100 p-4 rounded-lg text-red-700 col-span-1 row-span-1">
      Unsupported item variant: {item.variant} for item ID: {item.id}
    </div>
  );
};

// Карточка элемента «bento», адаптируется под разные варианты дизайна
