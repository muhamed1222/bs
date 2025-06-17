import { test, expect } from '@playwright/test';

test.describe('Billing', () => {
  test.beforeEach(async ({ page }) => {
    // Предполагаем, что пользователь уже авторизован
    await page.goto('/dashboard');
  });

  test('should show current plan', async ({ page }) => {
    await page.goto('/billing');
    
    await expect(page.locator('text=Current Plan')).toBeVisible();
    await expect(page.locator('text=Free')).toBeVisible();
  });

  test('should upgrade to Pro plan', async ({ page }) => {
    await page.goto('/billing');
    
    await page.click('text=Upgrade to Pro');
    
    // Здесь должен быть мок для Stripe
    await expect(page).toHaveURL('/billing/success');
    await expect(page.locator('text=Pro Plan')).toBeVisible();
  });

  test('should show payment history', async ({ page }) => {
    await page.goto('/billing');
    
    await expect(page.locator('text=Payment History')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
  });

  test('should cancel subscription', async ({ page }) => {
    await page.goto('/billing');
    
    await page.click('text=Cancel Subscription');
    await page.click('text=Confirm');
    
    await expect(page.locator('text=Subscription Cancelled')).toBeVisible();
  });
}); 