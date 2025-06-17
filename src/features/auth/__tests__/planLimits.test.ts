import { UserService } from '../services/userService';
import { PlanType } from '../types/plan';

describe('Plan Limits', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('Free Plan', () => {
    it('should allow creating up to 3 pages', async () => {
      const user = await userService.createUser({
        email: 'free@example.com',
        password: 'password',
        name: 'Free User',
        plan: PlanType.FREE,
      });

      // Создаем 3 страницы
      for (let i = 0; i < 3; i++) {
        await userService.createPage(user.id, {
          title: `Page ${i}`,
          description: `Description ${i}`,
        });
      }

      // Проверяем, что можно создать 3 страницы
      const pages = await userService.getUserPages(user.id);
      expect(pages).toHaveLength(3);

      // Проверяем, что нельзя создать 4-ю страницу
      await expect(
        userService.createPage(user.id, {
          title: 'Page 4',
          description: 'Description 4',
        })
      ).rejects.toThrow('Free plan limit exceeded');
    });

    it('should not allow private pages', async () => {
      const user = await userService.createUser({
        email: 'free2@example.com',
        password: 'password',
        name: 'Free User 2',
        plan: PlanType.FREE,
      });

      await expect(
        userService.createPage(user.id, {
          title: 'Private Page',
          description: 'Description',
          isPrivate: true,
        })
      ).rejects.toThrow('Private pages not available in Free plan');
    });
  });

  describe('Pro Plan', () => {
    it('should allow creating up to 20 pages', async () => {
      const user = await userService.createUser({
        email: 'pro@example.com',
        password: 'password',
        name: 'Pro User',
        plan: PlanType.PRO,
      });

      // Создаем 20 страниц
      for (let i = 0; i < 20; i++) {
        await userService.createPage(user.id, {
          title: `Page ${i}`,
          description: `Description ${i}`,
        });
      }

      // Проверяем, что можно создать 20 страниц
      const pages = await userService.getUserPages(user.id);
      expect(pages).toHaveLength(20);

      // Проверяем, что нельзя создать 21-ю страницу
      await expect(
        userService.createPage(user.id, {
          title: 'Page 21',
          description: 'Description 21',
        })
      ).rejects.toThrow('Pro plan limit exceeded');
    });

    it('should allow private pages', async () => {
      const user = await userService.createUser({
        email: 'pro2@example.com',
        password: 'password',
        name: 'Pro User 2',
        plan: PlanType.PRO,
      });

      const page = await userService.createPage(user.id, {
        title: 'Private Page',
        description: 'Description',
        isPrivate: true,
      });

      expect(page.isPrivate).toBe(true);
    });
  });

  describe('Business Plan', () => {
    it('should allow unlimited pages', async () => {
      const user = await userService.createUser({
        email: 'business@example.com',
        password: 'password',
        name: 'Business User',
        plan: PlanType.BUSINESS,
      });

      // Создаем 100 страниц
      for (let i = 0; i < 100; i++) {
        await userService.createPage(user.id, {
          title: `Page ${i}`,
          description: `Description ${i}`,
        });
      }

      // Проверяем, что все страницы созданы
      const pages = await userService.getUserPages(user.id);
      expect(pages).toHaveLength(100);
    });

    it('should allow API access', async () => {
      const user = await userService.createUser({
        email: 'business2@example.com',
        password: 'password',
        name: 'Business User 2',
        plan: PlanType.BUSINESS,
      });

      const apiKey = await userService.generateApiKey(user.id);
      expect(apiKey).toBeDefined();
      expect(apiKey.length).toBeGreaterThan(32);
    });
  });
}); 