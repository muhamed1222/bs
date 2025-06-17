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

    // Получаем текущее количество API запросов за последние 24 часа
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const apiRequestCount = await prisma.apiRequest.count({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: last24Hours,
        },
      },
    });

    return NextResponse.json({
      limits: {
        maxApiRequests: limits.maxApiRequests,
        maxApiKeys: limits.maxApiKeys,
      },
      current: {
        apiRequestCount,
        apiKeyCount: await prisma.apiKey.count({
          where: { userId: session.user.id },
        }),
      },
      canMakeRequest: apiRequestCount < limits.maxApiRequests,
    });
  } catch (error) {
    console.error('Error checking API limits:', error);
    return NextResponse.json(
      { error: 'Failed to check API limits' },
      { status: 500 }
    );
  }
} 