import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Получаем страницу по slug
    const page = await prisma.page.findUnique({
      where: { slug: params.slug },
    });

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    // Проверяем, что пользователь является владельцем страницы
    if (page.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Получаем статистику посещений
    const views = await prisma.pageView.findMany({
      where: { pageId: page.id },
      orderBy: { createdAt: 'desc' },
      take: 100, // Ограничиваем количество записей
    });

    return NextResponse.json(views);
  } catch (error) {
    console.error('Error fetching page views:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page views' },
      { status: 500 }
    );
  }
} 