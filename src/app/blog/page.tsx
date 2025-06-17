import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button';

const posts = [
  {
    title: 'Как создать эффективный лендинг',
    description: 'Пошаговое руководство по созданию продающего лендинга',
    image: '/blog/landing.jpg',
    date: '2024-02-15',
    author: 'Анна Петрова',
    category: 'Маркетинг',
  },
  {
    title: 'Тренды веб-дизайна 2024',
    description: 'Обзор главных трендов в веб-дизайне на 2024 год',
    image: '/blog/design.jpg',
    date: '2024-02-10',
    author: 'Иван Смирнов',
    category: 'Дизайн',
  },
  {
    title: 'SEO-оптимизация для начинающих',
    description: 'Базовые принципы SEO-оптимизации сайта',
    image: '/blog/seo.jpg',
    date: '2024-02-05',
    author: 'Мария Иванова',
    category: 'SEO',
  },
];

const categories = [
  'Все',
  'Маркетинг',
  'Дизайн',
  'Разработка',
  'SEO',
  'Контент',
];

export default function BlogPage() {
  return (
    <div className="relative">
      {/* Hero секция */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Блог
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Полезные статьи о создании сайтов, маркетинге и дизайне
            </p>
          </div>
        </div>
      </div>

      {/* Категории */}
      <div className="bg-white dark:bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className="text-gray-600 dark:text-gray-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Посты */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="flex flex-col items-start bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.date} className="text-gray-500">
                      {new Date(post.date).toLocaleDateString('ru-RU')}
                    </time>
                    <span className="text-primary">{post.category}</span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white group-hover:text-primary">
                      <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        <span className="absolute inset-0" />
                        {post.author}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Подписка */}
      <div className="bg-primary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Подпишитесь на обновления
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
              Получайте новые статьи и обновления прямо на почту
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="secondary" size="lg">
                Подписаться
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}