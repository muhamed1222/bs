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

    // Проверяем, что пользователь имеет бизнес-план
    if (session.user.subscriptionPlan !== 'business') {
      return NextResponse.json(
        { error: 'API keys are only available on Business plan' },
        { status: 403 }
      );
    }

    // Получаем все API ключи пользователя
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(apiKeys);
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Проверяем, что пользователь имеет бизнес-план
    if (session.user.subscriptionPlan !== 'business') {
      return NextResponse.json(
        { error: 'API keys are only available on Business plan' },
        { status: 403 }
      );
    }

    const { name } = await request.json();

    // Генерируем уникальный API ключ
    const apiKey = `bs_${Math.random().toString(36).substring(2)}_${Date.now()}`;

    // Создаем новый API ключ
    const newApiKey = await prisma.apiKey.create({
      data: {
        name,
        key: apiKey,
        userId: session.user.id,
      },
    });

    return NextResponse.json(newApiKey);
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
} 