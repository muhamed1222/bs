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
  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
    select: {
      title: true,
      description: true,
      content: true,
      user: {
        select: {
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  if (!page) {
    return {
      title: 'Страница не найдена',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: page.title,
    description: page.description || page.content.slice(0, 160),
    openGraph: {
      title: page.title,
      description: page.description || page.content.slice(0, 160),
      type: 'article',
      authors: [`@${page.user.username}`],
      images: [
        {
          url: page.user.image || '/default-avatar.png',
          width: 400,
          height: 400,
          alt: page.user.name,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary',
      title: page.title,
      description: page.description || page.content.slice(0, 160),
      images: [page.user.image || '/default-avatar.png'],
    },
  };
}

export default async function Page({ params }: Props) {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
      _count: {
        select: {
          views: true,
        },
      },
    },
  });

  if (!page || !page.isPublished) {
    notFound();
  }

  // Регистрируем просмотр
  await prisma.pageView.create({
    data: {
      pageId: page.id,
    },
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
        {page.description && (
          <p className="text-xl text-gray-600 mb-6">{page.description}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={page.user.image || '/default-avatar.png'}
              alt={page.user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <a
                href={`/u/${page.user.username}`}
                className="font-medium hover:underline"
              >
                {page.user.name}
              </a>
              <p className="text-sm text-gray-500">@{page.user.username}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p>
              Опубликовано{' '}
              {formatDistanceToNow(new Date(page.createdAt), {
                addSuffix: true,
                locale: ru,
              })}
            </p>
            <p>{page._count.views} просмотров</p>
          </div>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        {page.content}
      </div>
    </article>
  );
} 