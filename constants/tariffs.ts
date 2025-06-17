import { Tariff } from '../types/billing';

export const TARIFFS: Record<string, Tariff> = {
  free: {
    id: 'free',
    name: 'Бесплатный',
    price: 0,
    currency: 'RUB',
    interval: 'month',
    limits: {
      maxPages: 1,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      maxFiles: 10,
      maxApiCalls: 0,
      maxTeamMembers: 1,
      customDomain: false,
      removeBranding: false,
      apiAccess: false,
    },
    features: [
      '1 страница',
      'До 10 файлов',
      'Максимальный размер файла 5MB',
      'Базовые блоки',
      'Субдомен basis.site',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 499,
    currency: 'RUB',
    interval: 'month',
    limits: {
      maxPages: 10,
      maxFileSize: 50 * 1024 * 1024, // 50MB
      maxFiles: 100,
      maxApiCalls: 1000,
      maxTeamMembers: 1,
      customDomain: true,
      removeBranding: true,
      apiAccess: false,
    },
    features: [
      'До 10 страниц',
      'До 100 файлов',
      'Максимальный размер файла 50MB',
      'Все типы блоков',
      'Свой домен',
      'Расширенная аналитика',
      'Без брендинга Basis',
    ],
  },
  business: {
    id: 'business',
    name: 'Business',
    price: 1499,
    currency: 'RUB',
    interval: 'month',
    limits: {
      maxPages: Infinity,
      maxFileSize: 500 * 1024 * 1024, // 500MB
      maxFiles: 1000,
      maxApiCalls: 10000,
      maxTeamMembers: 10,
      customDomain: true,
      removeBranding: true,
      apiAccess: true,
    },
    features: [
      'Безлимитные страницы',
      'До 1000 файлов',
      'Максимальный размер файла 500MB',
      'Все типы блоков',
      'Свой домен',
      'Расширенная аналитика',
      'Без брендинга Basis',
      'Командный доступ',
      'API доступ',
      'A/B тестирование',
      'Приоритетная поддержка',
    ],
  },
}; 