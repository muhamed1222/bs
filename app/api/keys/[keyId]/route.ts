import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { keyId: string } }
) {
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

    // Проверяем, что API ключ принадлежит пользователю
    const apiKey = await prisma.apiKey.findUnique({
      where: { id: params.keyId },
    });

    if (!apiKey || apiKey.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    // Удаляем API ключ
    await prisma.apiKey.delete({
      where: { id: params.keyId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting API key:', error);
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { keyId: string } }
) {
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

    // Проверяем, что API ключ принадлежит пользователю
    const apiKey = await prisma.apiKey.findUnique({
      where: { id: params.keyId },
    });

    if (!apiKey || apiKey.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    const { isActive } = await request.json();

    // Обновляем статус API ключа
    const updatedApiKey = await prisma.apiKey.update({
      where: { id: params.keyId },
      data: { isActive },
    });

    return NextResponse.json(updatedApiKey);
  } catch (error) {
    console.error('Error updating API key:', error);
    return NextResponse.json(
      { error: 'Failed to update API key' },
      { status: 500 }
    );
  }
} 