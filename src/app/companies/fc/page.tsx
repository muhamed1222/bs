import React from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/Button';

const achievements = [
  {
    title: 'Чемпионство',
    description: 'Победа в чемпионате 2023',
    image: '/fc/trophy.jpg',
    year: '2023',
  },
  {
    title: 'Кубок',
    description: 'Завоевание кубка страны',
    image: '/fc/cup.jpg',
    year: '2022',
  },
  {
    title: 'Европейский турнир',
    description: 'Участие в Лиге чемпионов',
    image: '/fc/europe.jpg',
    year: '2023',
  },
];

const team = [
  {
    name: 'Александр Петров',
    position: 'Главный тренер',
    image: '/fc/coach.jpg',
  },
  {
    name: 'Иван Смирнов',
    position: 'Капитан команды',
    image: '/fc/captain.jpg',
  },
  {
    name: 'Михаил Иванов',
    position: 'Спортивный директор',
    image: '/fc/director.jpg',
  },
];

export default function FCPage() {
  return (
    <div className="relative">
      {/* Hero секция */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Футбольный клуб
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Профессиональный футбольный клуб с богатой историей и традициями.
              Мы стремимся к победам и развитию футбола в регионе.
            </p>
          </div>
        </div>
      </div>

      {/* О клубе */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">О клубе</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              История и традиции
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Наш клуб был основан в 1995 году и с тех пор является одним из ведущих
              футбольных клубов страны. Мы гордимся своей историей и стремимся
              к новым достижениям.
            </p>
          </div>
        </div>
      </div>

      {/* Достижения */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Достижения</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Наши победы
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {achievements.map((achievement) => (
              <div key={achievement.title} className="flex flex-col">
                <div className="relative h-64 w-full">
                  <Image
                    src={achievement.image}
                    alt={achievement.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  {achievement.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {achievement.description}
                </p>
                <p className="mt-2 text-sm text-primary">{achievement.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Команда */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Команда</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Руководство клуба
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {member.position}
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
              Поддержите команду
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
              Приобретите билеты на ближайший матч или станьте партнером клуба
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button variant="secondary" size="lg">
                Купить билеты
              </Button>
              <Button variant="ghost" size="lg" className="text-white">
                Стать партнером
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 