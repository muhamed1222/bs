import { NextApiRequest, NextApiResponse } from 'next';
import { withAdmin, AuthenticatedRequest } from '@/shared/middleware/auth';
import { UserService } from '@/shared/services/userService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return withAdmin(req, res, async () => {
      const { page = '1', limit = '10' } = req.query;
      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          skip,
          take: parseInt(limit as string),
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            plan: true,
            createdAt: true,
            _count: {
              select: {
                pages: true,
                apiKeys: true,
              },
            },
          },
        }),
        prisma.user.count(),
      ]);

      return res.status(200).json({
        users,
        pagination: {
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
          current: parseInt(page as string),
        },
      });
    });
  }

  if (req.method === 'PUT') {
    return withAdmin(req, res, async () => {
      const { id } = req.query;
      const { role, plan } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      try {
        const updatedUser = await prisma.user.update({
          where: { id: id as string },
          data: {
            role,
            plan,
          },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            plan: true,
            createdAt: true,
          },
        });

        return res.status(200).json(updatedUser);
      } catch (error) {
        return res.status(400).json({ error: 'Failed to update user' });
      }
    });
  }

  if (req.method === 'DELETE') {
    return withAdmin(req, res, async () => {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      try {
        await prisma.user.delete({
          where: { id: id as string },
        });

        return res.status(204).end();
      } catch (error) {
        return res.status(400).json({ error: 'Failed to delete user' });
      }
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 