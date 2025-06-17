import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/shared/ui/Button';

const features = [
  {
    title: 'Простой конструктор',
    description: 'Создавайте страницы перетаскиванием блоков, без знания кода',
    icon: '🎨',
  },
  {
    title: 'Готовые шаблоны',
    description: 'Выбирайте из сотен профессиональных шаблонов',
    icon: '📋',
  },
  {
    title: 'Адаптивный дизайн',
    description: 'Ваши страницы отлично выглядят на любых устройствах',
    icon: '📱',
  },
  {
    title: 'Аналитика',
    description: 'Отслеживайте посещаемость и поведение пользователей',
    icon: '📊',
  },
];

const companies = [
  {
    name: 'Outcasts',
    description: 'Креативное агентство полного цикла',
    logo: '/logos/outcasts.svg',
    link: '/companies/outcasts',
  },
  {
    name: 'FC',
    description: 'Футбольный клуб с богатой историей',
    logo: '/logos/fc.svg',
    link: '/companies/fc',
  },
  {
    name: 'Media',
    description: 'Медиа-холдинг с миллионной аудиторией',
    logo: '/logos/media.svg',
    link: '/companies/media',
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero секция */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Создавайте красивые страницы без кода
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              BS - это простой и мощный конструктор страниц, который позволяет создавать
              красивые веб-страницы без знания программирования.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth/register">
                <Button size="lg">Начать бесплатно</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" size="lg">
                  Узнать больше
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Миссия и ценности */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Наша миссия</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Делаем создание сайтов доступным каждому
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Мы верим, что каждый должен иметь возможность создать красивый и функциональный сайт,
              независимо от технических навыков.
            </p>
          </div>
        </div>
      </div>

      {/* Возможности */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Возможности</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Все, что нужно для создания сайта
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <span className="text-2xl">{feature.icon}</span>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Компании */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Наши компании</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Экосистема продуктов
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {companies.map((company) => (
              <Link
                key={company.name}
                href={company.link}
                className="flex flex-col items-start"
              >
                <div className="relative h-12 w-12">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                    {company.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                    {company.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA секция */}
      <div className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Готовы начать?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
              Создайте свой первый сайт бесплатно. Никаких ограничений по времени.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/auth/register">
                <Button variant="secondary" size="lg">
                  Создать сайт
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg" className="text-white">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 