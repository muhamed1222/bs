import { test, expect } from '@playwright/test';

test.describe('Analytics', () => {
  test.beforeEach(async ({ page }) => {
    // Предполагаем, что пользователь уже авторизован
    await page.goto('/dashboard');
  });

  test('should show page views statistics', async ({ page }) => {
    await page.goto('/editor/test-page');
    
    // Проверяем наличие основных метрик
    await expect(page.locator('text=Total Views')).toBeVisible();
    await expect(page.locator('text=Unique Visitors')).toBeVisible();
    await expect(page.locator('text=Countries')).toBeVisible();
  });

  test('should show recent views table', async ({ page }) => {
    await page.goto('/editor/test-page');
    
    // Проверяем наличие таблицы просмотров
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('th:has-text("Time")')).toBeVisible();
    await expect(page.locator('th:has-text("Country")')).toBeVisible();
    await expect(page.locator('th:has-text("City")')).toBeVisible();
    await expect(page.locator('th:has-text("Referer")')).toBeVisible();
  });

  test('should filter views by date range', async ({ page }) => {
    await page.goto('/editor/test-page');
    
    // Выбираем диапазон дат
    await page.click('text=Date Range');
    await page.click('text=Last 7 days');
    
    // Проверяем, что таблица обновилась
    await expect(page.locator('table')).toBeVisible();
  });

  test('should show traffic sources chart', async ({ page }) => {
    await page.goto('/editor/test-page');
    
    // Проверяем наличие графика источников трафика
    await expect(page.locator('canvas')).toBeVisible();
    await expect(page.locator('text=Traffic Sources')).toBeVisible();
  });
}); 