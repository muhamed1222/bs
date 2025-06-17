import React from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/Button';

const platforms = [
  {
    title: 'Новостной портал',
    description: 'Ежедневные новости и аналитика',
    image: '/media/news.jpg',
    audience: '1.5M+',
  },
  {
    title: 'Видеоплатформа',
    description: 'Оригинальный контент и стримы',
    image: '/media/video.jpg',
    audience: '2M+',
  },
  {
    title: 'Социальные сети',
    description: 'Сообщества в популярных соцсетях',
    image: '/media/social.jpg',
    audience: '3M+',
  },
];

const content = [
  {
    title: 'Новости',
    description: 'Актуальные новости и события',
    icon: '📰',
  },
  {
    title: 'Аналитика',
    description: 'Глубокий анализ и экспертные мнения',
    icon: '📊',
  },
  {
    title: 'Развлечения',
    description: 'Развлекательный контент и шоу',
    icon: '🎭',
  },
  {
    title: 'Спорт',
    description: 'Спортивные новости и трансляции',
    icon: '⚽',
  },
];

export default function MediaPage() {
  return (
    <div className="relative">
      {/* Hero секция */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Медиа-холдинг
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Крупнейший медиа-холдинг с миллионной аудиторией.
              Мы создаем качественный контент и предоставляем платформы
              для его распространения.
            </p>
          </div>
        </div>
      </div>

      {/* О нас */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">О нас</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Медиа-империя
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Мы объединяем различные медиа-платформы, чтобы предоставить
              нашим зрителям и читателям качественный контент на любых устройствах.
            </p>
          </div>
        </div>
      </div>

      {/* Платформы */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Платформы</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Наши медиа-ресурсы
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {platforms.map((platform) => (
              <div key={platform.title} className="flex flex-col">
                <div className="relative h-64 w-full">
                  <Image
                    src={platform.image}
                    alt={platform.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  {platform.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {platform.description}
                </p>
                <p className="mt-2 text-sm text-primary">Аудитория: {platform.audience}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Контент</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Что мы создаем
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {content.map((item) => (
                <div key={item.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <span className="text-2xl">{item.icon}</span>
                    {item.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{item.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA секция */}
      <div className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Станьте частью нашей команды
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
              Присоединяйтесь к нам и создавайте качественный контент для миллионов
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="secondary" size="lg">
                Вакансии
              </Button>
              <Button variant="ghost" size="lg" className="text-white">
                Сотрудничество
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 