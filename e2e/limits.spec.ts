import { test, expect } from '@playwright/test';
import { createTestPage, cleanupTestPage } from './utils/auth';
import { mockApiResponse } from './utils/mocks';

test.describe('Tariff Limits', () => {
  test.beforeEach(async ({ page }) => {
    // Предполагаем, что пользователь уже авторизован
    await page.goto('/dashboard');
  });

  test('should limit page creation for free plan', async ({ page }) => {
    // Мокаем ответ API с информацией о текущем тарифе
    await mockApiResponse(page, '**/api/user/limits', {
      plan: 'free',
      pagesLimit: 3,
      currentPages: 3,
    });

    await page.goto('/dashboard');
    await page.click('text=Create Page');
    
    // Проверяем, что появилось сообщение о лимите
    await expect(page.locator('text=You have reached the page limit for your plan')).toBeVisible();
    await expect(page.locator('text=Upgrade to Pro')).toBeVisible();
  });

  test('should limit API requests for free plan', async ({ page }) => {
    // Мокаем ответ API с информацией о лимитах
    await mockApiResponse(page, '**/api/user/limits', {
      plan: 'free',
      apiRequestsLimit: 1000,
      currentApiRequests: 1000,
    });

    await page.goto('/settings/api');
    
    // Проверяем, что появилось сообщение о лимите
    await expect(page.locator('text=You have reached the API request limit')).toBeVisible();
    await expect(page.locator('text=Upgrade to Pro')).toBeVisible();
  });

  test('should limit team members for free plan', async ({ page }) => {
    // Мокаем ответ API с информацией о лимитах
    await mockApiResponse(page, '**/api/user/limits', {
      plan: 'free',
      teamMembersLimit: 1,
      currentTeamMembers: 1,
    });

    await page.goto('/team');
    await page.click('text=Invite Member');
    
    // Проверяем, что появилось сообщение о лимите
    await expect(page.locator('text=You have reached the team member limit')).toBeVisible();
    await expect(page.locator('text=Upgrade to Business')).toBeVisible();
  });

  test('should allow unlimited pages for pro plan', async ({ page }) => {
    // Мокаем ответ API с информацией о текущем тарифе
    await mockApiResponse(page, '**/api/user/limits', {
      plan: 'pro',
      pagesLimit: -1, // -1 означает без ограничений
      currentPages: 10,
    });

    await page.goto('/dashboard');
    await page.click('text=Create Page');
    
    // Проверяем, что можно создать новую страницу
    await expect(page.locator('input[name="title"]')).toBeVisible();
  });

  test('should allow unlimited API requests for pro plan', async ({ page }) => {
    // Мокаем ответ API с информацией о лимитах
    await mockApiResponse(page, '**/api/user/limits', {
      plan: 'pro',
      apiRequestsLimit: -1,
      currentApiRequests: 10000,
    });

    await page.goto('/settings/api');
    
    // Проверяем, что нет сообщения о лимите
    await expect(page.locator('text=You have reached the API request limit')).not.toBeVisible();
  });

  test('should allow multiple team members for business plan', async ({ page }) => {
    // Мокаем ответ API с информацией о лимитах
    await mockApiResponse(page, '**/api/user/limits', {
      plan: 'business',
      teamMembersLimit: -1,
      currentTeamMembers: 5,
    });

    await page.goto('/team');
    await page.click('text=Invite Member');
    
    // Проверяем, что можно пригласить нового участника
    await expect(page.locator('input[name="email"]')).toBeVisible();
  });
}); 