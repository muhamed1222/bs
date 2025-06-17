import { test, expect } from '@playwright/test';

test.describe('Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Предполагаем, что пользователь уже авторизован
    await page.goto('/dashboard');
  });

  test('should create a new page', async ({ page }) => {
    await page.click('text=Create Page');
    await page.fill('input[name="title"]', 'Test Page');
    await page.fill('input[name="slug"]', 'test-page');
    await page.fill('textarea[name="content"]', 'Test content');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/editor/test-page');
    await expect(page.locator('text=Test Page')).toBeVisible();
  });

  test('should edit existing page', async ({ page }) => {
    await page.goto('/editor/test-page');
    await page.fill('input[name="title"]', 'Updated Test Page');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Updated Test Page')).toBeVisible();
  });

  test('should publish page', async ({ page }) => {
    await page.goto('/editor/test-page');
    await page.click('text=Publish');
    
    await expect(page.locator('text=Published')).toBeVisible();
    
    // Проверяем, что страница доступна по публичному URL
    await page.goto('/u/test-page');
    await expect(page.locator('text=Updated Test Page')).toBeVisible();
  });

  test('should delete page', async ({ page }) => {
    await page.goto('/editor/test-page');
    await page.click('text=Delete');
    await page.click('text=Confirm');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=test-page')).not.toBeVisible();
  });
}); 