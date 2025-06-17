import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';
import { getCountry, getCity } from '@/utils/geo';

export async function POST(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    const referer = headersList.get('referer') || 'unknown';

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

    // Получаем геолокацию по IP
    const country = await getCountry(ip);
    const city = await getCity(ip);

    // Создаем запись о просмотре
    const view = await prisma.pageView.create({
      data: {
        pageId: page.id,
        ip,
        userAgent,
        referer,
        country,
        city,
      },
    });

    return NextResponse.json(view);
  } catch (error) {
    console.error('Error recording page view:', error);
    return NextResponse.json(
      { error: 'Failed to record page view' },
      { status: 500 }
    );
  }
} 