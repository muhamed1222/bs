import React from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/Button';

const services = [
  {
    title: 'Брендинг',
    description: 'Создание уникального визуального образа вашего бренда',
    icon: '🎨',
  },
  {
    title: 'Веб-разработка',
    description: 'Разработка современных и функциональных сайтов',
    icon: '💻',
  },
  {
    title: 'Маркетинг',
    description: 'Комплексное продвижение в digital-среде',
    icon: '📈',
  },
  {
    title: 'Контент',
    description: 'Создание качественного контента для всех каналов',
    icon: '📝',
  },
];

const cases = [
  {
    title: 'Ребрендинг крупной сети',
    description: 'Полное обновление визуального стиля и позиционирования',
    image: '/cases/case1.jpg',
  },
  {
    title: 'Запуск онлайн-магазина',
    description: 'Разработка и продвижение интернет-магазина',
    image: '/cases/case2.jpg',
  },
  {
    title: 'SMM-стратегия',
    description: 'Разработка и реализация стратегии в соцсетях',
    image: '/cases/case3.jpg',
  },
];

export default function OutcastsPage() {
  return (
    <div className="relative">
      {/* Hero секция */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Outcasts
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Креативное агентство полного цикла. Создаем уникальные решения
              для развития вашего бизнеса.
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
              Креативность и профессионализм
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Мы объединяем креативный подход с глубоким пониманием бизнеса,
              чтобы создавать решения, которые действительно работают.
            </p>
          </div>
        </div>
      </div>

      {/* Услуги */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Услуги</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Что мы делаем
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {services.map((service) => (
                <div key={service.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <span className="text-2xl">{service.icon}</span>
                    {service.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{service.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Кейсы */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Кейсы</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Наши проекты
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {cases.map((case_) => (
              <div key={case_.title} className="flex flex-col">
                <div className="relative h-64 w-full">
                  <Image
                    src={case_.image}
                    alt={case_.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  {case_.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {case_.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA секция */}
      <div className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Готовы обсудить ваш проект?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
              Оставьте заявку, и мы свяжемся с вами для обсуждения деталей.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="secondary" size="lg">
                Оставить заявку
              </Button>
              <Button variant="ghost" size="lg" className="text-white">
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 