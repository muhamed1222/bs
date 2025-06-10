// Сетка проектов
import React from 'react';
import { BentoItem } from '../types';
import { BentoItemCard } from './BentoItemCard';
            )}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-black text-[18px] font-semibold leading-[24px] mb-[20px] px-[12px] py-[12px] bg-white rounded-[8px]">
          {bottomTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-start">
            <BentoItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Галерея проектов пользователя в стиле «bento»
