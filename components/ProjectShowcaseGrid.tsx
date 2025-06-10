// Сетка проектов
import React from 'react';
import { BentoItem } from '../types';
import { BentoItemCard } from './BentoItemCard';
import { Skeleton } from './Skeleton';

interface Props {
  top?: BentoItem[];
  bottom?: BentoItem[];
  loading?: boolean;
}

export const ProjectShowcaseGrid: React.FC<Props> = ({
  top = [],
  bottom = [],
  loading,
}) => {
  // Сетка проектов
  if (loading) {
    return (
      <div className="w-full md:max-w-[820px] space-y-[24px]">
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full md:max-w-[820px] space-y-[24px]">
      <div>
        <h2 className="text-black text-[18px] font-semibold leading-[24px] mb-[20px] px-[12px] py-[12px] bg-white rounded-[8px]">
          Project Showcase
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] items-start">
          <div className="space-y-[24px]">
            {top.find((item) => item.id === 'proj1') && (
              <BentoItemCard
                item={top.find((item) => item.id === 'proj1') as BentoItem}
              />
            )}
            {top.find((item) => item.id === 'proj3') && (
              <BentoItemCard
                item={top.find((item) => item.id === 'proj3') as BentoItem}
              />
            )}
          </div>
          <div className="space-y-[24px]">
            {top.find((item) => item.id === 'proj2') && (
              <BentoItemCard
                item={top.find((item) => item.id === 'proj2') as BentoItem}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-black text-[18px] font-semibold leading-[24px] mb-[20px] px-[12px] py-[12px] bg-white rounded-[8px]">
          Project Showcase
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-start">
          {bottom.map((item) => (
            <BentoItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Галерея проектов пользователя в стиле «bento»
