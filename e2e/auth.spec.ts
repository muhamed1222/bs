import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should allow user to sign in with Google', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Sign in');
    await page.click('text=Sign in with Google');
    
    // Здесь должен быть мок для Google OAuth
    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Sign in');
    await page.fill('input[name="email"]', 'invalid@example.com');
    await page.fill('input[name="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('should allow user to sign out', async ({ page }) => {
    // Предполагаем, что пользователь уже авторизован
    await page.goto('/dashboard');
    await page.click('text=Sign out');
    
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Sign in')).toBeVisible();
  });
}); 