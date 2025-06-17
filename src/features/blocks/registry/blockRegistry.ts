import { BlockType } from '@/shared/types';
import { TextBlock } from '../components/blocks/TextBlock';
import { ImageBlock } from '../components/blocks/ImageBlock';
import { VideoBlock } from '../components/blocks/VideoBlock';
import { FormBlock } from '../components/blocks/FormBlock';
import { MapBlock } from '../components/blocks/MapBlock';
import { CalendarBlock } from '../components/blocks/CalendarBlock';
import { GalleryBlock } from '../components/blocks/GalleryBlock';
import { QuoteBlock } from '../components/blocks/QuoteBlock';
import { DividerBlock } from '../components/blocks/DividerBlock';
import { ButtonBlock } from '../components/blocks/ButtonBlock';
import { SocialBlock } from '../components/blocks/SocialBlock';

export interface BlockComponent {
  type: BlockType;
  component: React.ComponentType<any>;
  icon: string;
  label: string;
  description: string;
  isPremium: boolean;
}

export const blockRegistry: Record<BlockType, BlockComponent> = {
  [BlockType.TEXT]: {
    type: BlockType.TEXT,
    component: TextBlock,
    icon: 'text',
    label: 'Текст',
    description: 'Добавьте текстовый блок с форматированием',
    isPremium: false,
  },
  [BlockType.IMAGE]: {
    type: BlockType.IMAGE,
    component: ImageBlock,
    icon: 'image',
    label: 'Изображение',
    description: 'Добавьте изображение с подписью',
    isPremium: false,
  },
  [BlockType.VIDEO]: {
    type: BlockType.VIDEO,
    component: VideoBlock,
    icon: 'video',
    label: 'Видео',
    description: 'Вставьте видео с YouTube или Vimeo',
    isPremium: true,
  },
  [BlockType.FORM]: {
    type: BlockType.FORM,
    component: FormBlock,
    icon: 'form',
    label: 'Форма',
    description: 'Создайте форму для сбора данных',
    isPremium: true,
  },
  [BlockType.MAP]: {
    type: BlockType.MAP,
    component: MapBlock,
    icon: 'map',
    label: 'Карта',
    description: 'Добавьте интерактивную карту',
    isPremium: true,
  },
  [BlockType.CALENDAR]: {
    type: BlockType.CALENDAR,
    component: CalendarBlock,
    icon: 'calendar',
    label: 'Календарь',
    description: 'Вставьте календарь событий',
    isPremium: true,
  },
  [BlockType.GALLERY]: {
    type: BlockType.GALLERY,
    component: GalleryBlock,
    icon: 'gallery',
    label: 'Галерея',
    description: 'Создайте галерею изображений',
    isPremium: false,
  },
  [BlockType.QUOTE]: {
    type: BlockType.QUOTE,
    component: QuoteBlock,
    icon: 'quote',
    label: 'Цитата',
    description: 'Добавьте цитату с автором',
    isPremium: false,
  },
  [BlockType.DIVIDER]: {
    type: BlockType.DIVIDER,
    component: DividerBlock,
    icon: 'divider',
    label: 'Разделитель',
    description: 'Добавьте визуальный разделитель',
    isPremium: false,
  },
  [BlockType.BUTTON]: {
    type: BlockType.BUTTON,
    component: ButtonBlock,
    icon: 'button',
    label: 'Кнопка',
    description: 'Добавьте кнопку с действием',
    isPremium: false,
  },
  [BlockType.SOCIAL]: {
    type: BlockType.SOCIAL,
    component: SocialBlock,
    icon: 'social',
    label: 'Социальные сети',
    description: 'Добавьте ссылки на соцсети',
    isPremium: false,
  },
};

export const getBlockComponent = (type: BlockType): BlockComponent => {
  const block = blockRegistry[type];
  if (!block) {
    throw new Error(`Block type ${type} not found in registry`);
  }
  return block;
};

export const getPremiumBlocks = (): BlockComponent[] => {
  return Object.values(blockRegistry).filter(block => block.isPremium);
};

export const getFreeBlocks = (): BlockComponent[] => {
  return Object.values(blockRegistry).filter(block => !block.isPremium);
}; 