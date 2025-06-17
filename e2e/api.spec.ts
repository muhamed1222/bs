import { test, expect } from '@playwright/test';
import { mockApiResponse } from './utils/mocks';

test.describe('API Business Logic', () => {
  test.beforeEach(async ({ page }) => {
    // Предполагаем, что пользователь уже авторизован
    await page.goto('/dashboard');
  });

  test('should validate API key format', async ({ page }) => {
    await page.goto('/settings/api');
    await page.click('text=Create API Key');
    
    // Пытаемся создать ключ с неверным форматом
    await page.fill('input[name="name"]', 'Test Key');
    await page.fill('input[name="key"]', 'invalid-key');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid API key format')).toBeVisible();
  });

  test('should enforce API rate limits', async ({ page }) => {
    // Мокаем ответ API с информацией о лимитах
    await mockApiResponse(page, '**/api/user/limits', {
      plan: 'free',
      apiRequestsLimit: 1000,
      currentApiRequests: 999,
    });

    // Делаем несколько запросов
    for (let i = 0; i < 5; i++) {
      await page.goto('/api/pages/test-page');
    }

    // Проверяем, что появилось сообщение о превышении лимита
    await expect(page.locator('text=Rate limit exceeded')).toBeVisible();
  });

  test('should validate page slug format', async ({ page }) => {
    await page.goto('/dashboard');
    await page.click('text=Create Page');
    
    // Пытаемся создать страницу с неверным форматом slug
    await page.fill('input[name="title"]', 'Test Page');
    await page.fill('input[name="slug"]', 'invalid slug with spaces');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid slug format')).toBeVisible();
  });

  test('should prevent duplicate slugs', async ({ page }) => {
    // Мокаем ответ API о существующем slug
    await mockApiResponse(page, '**/api/pages/check-slug', {
      exists: true,
    });

    await page.goto('/dashboard');
    await page.click('text=Create Page');
    
    // Пытаемся создать страницу с существующим slug
    await page.fill('input[name="title"]', 'Test Page');
    await page.fill('input[name="slug"]', 'existing-page');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=This slug is already taken')).toBeVisible();
  });

  test('should validate team member email', async ({ page }) => {
    await page.goto('/team');
    await page.click('text=Invite Member');
    
    // Пытаемся пригласить участника с неверным email
    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid email format')).toBeVisible();
  });

  test('should prevent duplicate team members', async ({ page }) => {
    // Мокаем ответ API о существующем участнике
    await mockApiResponse(page, '**/api/team/check-member', {
      exists: true,
    });

    await page.goto('/team');
    await page.click('text=Invite Member');
    
    // Пытаемся пригласить существующего участника
    await page.fill('input[name="email"]', 'existing@example.com');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=This user is already a team member')).toBeVisible();
  });

  test('should validate payment amount', async ({ page }) => {
    await page.goto('/billing');
    await page.click('text=Upgrade to Pro');
    
    // Пытаемся внести неверную сумму
    await page.fill('input[name="amount"]', '-100');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid payment amount')).toBeVisible();
  });

  test('should handle subscription cancellation', async ({ page }) => {
    // Мокаем ответ API о подписке
    await mockApiResponse(page, '**/api/user', {
      subscriptionStatus: 'active',
      subscriptionPlan: 'pro',
    });

    await page.goto('/billing');
    await page.click('text=Cancel Subscription');
    await page.click('text=Confirm');
    
    // Проверяем, что подписка отменена
    await expect(page.locator('text=Subscription Cancelled')).toBeVisible();
    await expect(page.locator('text=Free Plan')).toBeVisible();
  });
}); 