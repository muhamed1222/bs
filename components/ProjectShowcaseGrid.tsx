// Сетка проектов
import React from 'react';
import { BentoItem } from '../types';
import { BentoItemCard } from './BentoItemCard';

export interface ProjectShowcaseGridProps {
  topItems?: BentoItem[];
  bottomItems?: BentoItem[];
  topTitle?: string;
  bottomTitle?: string;
  className?: string;
}

export const ProjectShowcaseGrid: React.FC<ProjectShowcaseGridProps> = ({
  topItems = [],
  bottomItems = [],
  topTitle = 'Project Showcase',
  bottomTitle = 'Project Showcase',
  className = 'w-full md:max-w-[820px] space-y-[24px]',
}) => {
  // Сетка проектов
  return (
    <div className={className}>
      <div>
        <h2 className="text-black text-[18px] font-semibold leading-[24px] mb-[20px] px-[12px] py-[12px] bg-white rounded-[8px]">
          {topTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-start">
          <div className="space-y-[24px]">
            {topItems[0] && (
              <BentoItemCard key={topItems[0].id} item={topItems[0]} />
            )}
            {topItems[2] && (
              <BentoItemCard key={topItems[2].id} item={topItems[2]} />
            )}
          </div>
          <div className="space-y-[24px]">
            {topItems[1] && (
              <BentoItemCard key={topItems[1].id} item={topItems[1]} />
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-black text-[18px] font-semibold leading-[24px] mb-[20px] px-[12px] py-[12px] bg-white rounded-[8px]">
          {bottomTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-start">
          {bottomItems.map((item) => (
            <BentoItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Галерея проектов пользователя в стиле «bento»
