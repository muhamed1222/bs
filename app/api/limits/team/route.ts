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

    // Получаем текущее количество участников команды
    const teamMemberCount = await prisma.user.count({
      where: {
        teamId: session.user.teamId,
      },
    });

    return NextResponse.json({
      limits: {
        maxTeamMembers: limits.maxTeamMembers,
      },
      current: {
        teamMemberCount,
      },
      canAddMember: teamMemberCount < limits.maxTeamMembers,
    });
  } catch (error) {
    console.error('Error checking team limits:', error);
    return NextResponse.json(
      { error: 'Failed to check team limits' },
      { status: 500 }
    );
  }
} 