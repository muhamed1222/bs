import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import type { PageView, PageStats } from '@/types/analytics';

/**
 * Обработчик GET запроса для получения статистики страницы
 * @param {Request} request - Объект запроса
 * @param {Object} params - Параметры маршрута
 * @param {string} params.slug - Slug страницы
 * @returns {Promise<NextResponse>} Ответ с данными статистики или ошибкой
 * @throws {Error} Если произошла ошибка при получении данных
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const page = await prisma.page.findUnique({
      where: { slug: params.slug },
    });

    if (!page) {
      return NextResponse.json(
        { message: 'Page not found', code: 'PAGE_NOT_FOUND' },
        { status: 404 }
      );
    }

    if (page.userId !== session.user.id) {
      return NextResponse.json(
        { message: 'Forbidden', code: 'FORBIDDEN' },
        { status: 403 }
      );
    }

    const views = await prisma.pageView.findMany({
      where: { pageId: page.id },
    });

    const uniqueIPs = new Set(views.map((view: PageView) => view.ip));
    const uniqueCountries = new Set(
      views.map((view: PageView) => view.country).filter(Boolean)
    );

    const stats: PageStats = {
      total: views.length,
      unique: uniqueIPs.size,
      countries: uniqueCountries.size,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching page stats:', error);
    return NextResponse.json(
      { message: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
} 