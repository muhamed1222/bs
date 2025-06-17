import { test, expect } from '@playwright/test';
import { mockApiResponse } from './utils/mocks';

test.describe('Access Control', () => {
  test('should redirect to login for protected routes', async ({ page }) => {
    // Пытаемся получить доступ к защищенным маршрутам без авторизации
    const protectedRoutes = [
      '/dashboard',
      '/editor/test-page',
      '/settings',
      '/team',
      '/billing',
    ];

    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL('/auth/signin');
    }
  });

  test('should prevent access to other users pages', async ({ page }) => {
    // Мокаем ответ API с информацией о пользователе
    await mockApiResponse(page, '**/api/user', {
      id: 'user-1',
      email: 'user1@example.com',
    });

    // Пытаемся получить доступ к странице другого пользователя
    await page.goto('/editor/other-user-page');
    
    // Проверяем, что появилось сообщение о запрете доступа
    await expect(page.locator('text=Access Denied')).toBeVisible();
  });

  test('should prevent team member from accessing admin features', async ({ page }) => {
    // Мокаем ответ API с информацией о пользователе
    await mockApiResponse(page, '**/api/user', {
      id: 'user-2',
      email: 'user2@example.com',
      role: 'member',
    });

    // Пытаемся получить доступ к админским функциям
    await page.goto('/team');
    await expect(page.locator('text=Invite Member')).not.toBeVisible();
    
    await page.goto('/settings');
    await expect(page.locator('text=Team Settings')).not.toBeVisible();
  });

  test('should allow team admin to access all features', async ({ page }) => {
    // Мокаем ответ API с информацией о пользователе
    await mockApiResponse(page, '**/api/user', {
      id: 'user-3',
      email: 'user3@example.com',
      role: 'admin',
    });

    // Проверяем доступ к админским функциям
    await page.goto('/team');
    await expect(page.locator('text=Invite Member')).toBeVisible();
    
    await page.goto('/settings');
    await expect(page.locator('text=Team Settings')).toBeVisible();
  });

  test('should prevent access to expired subscription features', async ({ page }) => {
    // Мокаем ответ API с информацией о подписке
    await mockApiResponse(page, '**/api/user', {
      id: 'user-4',
      email: 'user4@example.com',
      subscriptionStatus: 'expired',
      subscriptionPlan: 'pro',
    });

    // Проверяем, что функции Pro недоступны
    await page.goto('/dashboard');
    await expect(page.locator('text=Pro Features')).not.toBeVisible();
    
    await page.goto('/settings/api');
    await expect(page.locator('text=API Keys')).not.toBeVisible();
  });

  test('should allow access to features based on subscription plan', async ({ page }) => {
    // Мокаем ответ API с информацией о подписке
    await mockApiResponse(page, '**/api/user', {
      id: 'user-5',
      email: 'user5@example.com',
      subscriptionStatus: 'active',
      subscriptionPlan: 'business',
    });

    // Проверяем доступ к функциям Business плана
    await page.goto('/team');
    await expect(page.locator('text=Team Management')).toBeVisible();
    
    await page.goto('/settings');
    await expect(page.locator('text=Advanced Settings')).toBeVisible();
  });
}); 