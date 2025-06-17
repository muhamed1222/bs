import { NextApiRequest, NextApiResponse } from 'next';
import { UserService } from '@/features/auth/services/userService';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;

  switch (req.method) {
    case 'GET':
      try {
        const user = await UserService.getUserById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
      } catch (error) {
        console.error('Error in GET /api/user/profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

    case 'PUT':
      try {
        const updates = req.body;
        const updatedUser = await UserService.updateUser(userId, updates);
        return res.status(200).json(updatedUser);
      } catch (error) {
        console.error('Error in PUT /api/user/profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
} 