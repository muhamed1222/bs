import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { TARIFFS } from '@/constants/tariffs';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Получаем текущий план пользователя
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { subscriptionPlan: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Получаем лимиты для текущего плана
    const limits = TARIFFS[user.subscriptionPlan].limits;

    // Получаем текущее количество страниц
    const pageCount = await prisma.page.count({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      limits: {
        maxPages: limits.maxPages,
      },
      current: {
        pageCount,
      },
      canCreatePage: pageCount < limits.maxPages,
    });
  } catch (error) {
    console.error('Error checking page limits:', error);
    return NextResponse.json(
      { error: 'Failed to check page limits' },
      { status: 500 }
    );
  }
} 