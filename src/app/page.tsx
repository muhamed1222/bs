import Link from 'next/link';
import { Button } from '@/shared/ui/Button';

export default function HomePage() {
  return (
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
  );
} 