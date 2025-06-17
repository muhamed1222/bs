import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: { username: params.slug },
    select: {
      name: true,
      username: true,
      bio: true,
      image: true,
      pages: {
        where: { isPublished: true },
        select: {
          title: true,
          description: true,
          slug: true,
          updatedAt: true,
        },
        orderBy: { updatedAt: 'desc' },
        take: 1,
      },
    },
  });

  if (!user) {
    return {
      title: 'Пользователь не найден',
    };
  }

  const latestPage = user.pages[0];
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${user.name} (@${user.username})`,
    description: user.bio || `Страница пользователя ${user.name}`,
    openGraph: {
      title: `${user.name} (@${user.username})`,
      description: user.bio || `Страница пользователя ${user.name}`,
      type: 'profile',
      images: [
        {
          url: user.image || '/default-avatar.png',
          width: 400,
          height: 400,
          alt: user.name,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary',
      title: `${user.name} (@${user.username})`,
      description: user.bio || `Страница пользователя ${user.name}`,
      images: [user.image || '/default-avatar.png'],
    },
  };
}

export default async function UserPage({ params }: Props) {
  const user = await prisma.user.findUnique({
    where: { username: params.slug },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      image: true,
      pages: {
        where: { isPublished: true },
        select: {
          id: true,
          title: true,
          description: true,
          slug: true,
          updatedAt: true,
          _count: {
            select: {
              views: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={user.image || '/default-avatar.png'}
          alt={user.name}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
          {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Публикации</h2>
        {user.pages.length === 0 ? (
          <p className="text-gray-500">Пока нет публикаций</p>
        ) : (
          <div className="grid gap-6">
            {user.pages.map((page) => (
              <article
                key={page.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">
                  <a
                    href={`/${page.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {page.title}
                  </a>
                </h3>
                {page.description && (
                  <p className="text-gray-600 mb-4">{page.description}</p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Обновлено{' '}
                    {formatDistanceToNow(new Date(page.updatedAt), {
                      addSuffix: true,
                      locale: ru,
                    })}
                  </span>
                  <span>{page._count.views} просмотров</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 