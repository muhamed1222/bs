import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth, AuthenticatedRequest } from '@/shared/middleware/auth';
import { UserService } from '@/shared/services/userService';
import { CacheService } from '@/shared/services/cacheService';

export default async function handler(
  req: AuthenticatedRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return withAuth(req, res, async () => {
      const cacheService = CacheService.getInstance();
      const userService = UserService.getInstance();

      // Пробуем получить данные из кеша
      const cachedProfile = await cacheService.getProfile(req.user!.id);
      if (cachedProfile) {
        return res.status(200).json(cachedProfile);
      }

      // Если нет в кеше, получаем из базы
      const user = await userService.getUserById(req.user!.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { password, ...userWithoutPassword } = user;

      // Сохраняем в кеш
      await cacheService.setProfile(req.user!.id, userWithoutPassword);

      return res.status(200).json(userWithoutPassword);
    });
  }

  if (req.method === 'PUT') {
    return withAuth(req, res, async () => {
      const { name, password } = req.body;
      const userService = UserService.getInstance();
      const cacheService = CacheService.getInstance();

      try {
        const updatedUser = await userService.updateUser(req.user!.id, {
          name,
          password,
        });

        const { password: _, ...userWithoutPassword } = updatedUser;

        // Инвалидируем кеш
        await cacheService.invalidateProfile(req.user!.id);

        return res.status(200).json(userWithoutPassword);
      } catch (error) {
        return res.status(400).json({ error: 'Failed to update user' });
      }
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 