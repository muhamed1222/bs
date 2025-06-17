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

    // Получаем текущее количество загруженных файлов
    const fileCount = await prisma.file.count({
      where: { userId: session.user.id },
    });

    // Получаем общий размер загруженных файлов
    const totalSize = await prisma.file.aggregate({
      where: { userId: session.user.id },
      _sum: { size: true },
    });

    return NextResponse.json({
      limits: {
        maxFileSize: limits.maxFileSize,
        maxTotalStorage: limits.maxTotalStorage,
        maxFiles: limits.maxFiles,
      },
      current: {
        fileCount,
        totalSize: totalSize._sum.size || 0,
      },
      canUpload: {
        byCount: fileCount < limits.maxFiles,
        bySize: (totalSize._sum.size || 0) < limits.maxTotalStorage,
      },
    });
  } catch (error) {
    console.error('Error checking file upload limits:', error);
    return NextResponse.json(
      { error: 'Failed to check file upload limits' },
      { status: 500 }
    );
  }
} 