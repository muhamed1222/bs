import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/shared/services/tokenService';

const prisma = new PrismaClient();

export async function requireAuth(
  req: NextApiRequest,
  res?: NextApiResponse,
  next?: () => void
): Promise<any> {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = await verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        twoFactorEnabled: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Если включена 2FA, проверяем токен
    if (user.twoFactorEnabled) {
      const twoFactorToken = req.headers['x-2fa-token'];
      if (!twoFactorToken) {
        throw new Error('2FA token required');
      }

      const twoFactorService = (await import('@/shared/services/twoFactorService')).TwoFactorService.getInstance();
      const isValid = await twoFactorService.verifyToken(user.id, twoFactorToken as string);

      if (!isValid) {
        throw new Error('Invalid 2FA token');
      }
    }

    return user;
  } catch (error) {
    if (res) {
      res.status(401).json({ error: 'Unauthorized' });
    }
    throw error;
  }
} 