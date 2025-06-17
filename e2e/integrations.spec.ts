import { test, expect } from '@playwright/test';
import { mockApiResponse } from './utils/mocks';

test.describe('External Service Integrations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should handle Google OAuth authentication', async ({ page }) => {
    // Мокаем ответ от Google OAuth
    await mockApiResponse(page, '**/api/auth/google/callback', {
      success: true,
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        name: 'Test User',
      },
    });

    await page.click('text=Sign in with Google');
    
    // Проверяем успешную авторизацию
    await expect(page.locator('text=Welcome, Test User')).toBeVisible();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should handle Stripe payment processing', async ({ page }) => {
    // Мокаем ответ от Stripe
    await mockApiResponse(page, '**/api/billing/create-checkout-session', {
      sessionId: 'test-session-id',
      url: 'https://checkout.stripe.com/test',
    });

    await page.goto('/billing');
    await page.click('text=Upgrade to Pro');
    
    // Проверяем перенаправление на страницу оплаты
    await expect(page).toHaveURL(/checkout\.stripe\.com/);
  });

  test('should handle Stripe webhook events', async ({ page }) => {
    // Мокаем webhook событие от Stripe
    await mockApiResponse(page, '**/api/webhooks/stripe', {
      type: 'checkout.session.completed',
      data: {
        customer: 'test-customer-id',
        subscription: 'test-subscription-id',
      },
    });

    // Проверяем обновление статуса подписки
    await page.goto('/billing');
    await expect(page.locator('text=Pro Plan')).toBeVisible();
    await expect(page.locator('text=Active')).toBeVisible();
  });

  test('should handle MaxMind GeoIP2 location detection', async ({ page }) => {
    // Мокаем ответ от MaxMind
    await mockApiResponse(page, '**/api/analytics/location', {
      country: 'United States',
      city: 'New York',
      latitude: 40.7128,
      longitude: -74.0060,
    });

    await page.goto('/analytics');
    
    // Проверяем отображение геолокации
    await expect(page.locator('text=United States')).toBeVisible();
    await expect(page.locator('text=New York')).toBeVisible();
  });

  test('should handle Sentry error reporting', async ({ page }) => {
    // Мокаем отправку ошибки в Sentry
    await mockApiResponse(page, '**/api/error-report', {
      eventId: 'test-event-id',
      success: true,
    });

    // Вызываем ошибку
    await page.goto('/error-test');
    
    // Проверяем, что ошибка была отправлена
    await expect(page.locator('text=Error reported')).toBeVisible();
  });

  test('should handle GitHub OAuth for repository access', async ({ page }) => {
    // Мокаем ответ от GitHub
    await mockApiResponse(page, '**/api/auth/github/callback', {
      success: true,
      accessToken: 'test-token',
      repositories: [
        { id: 1, name: 'test-repo', fullName: 'user/test-repo' },
      ],
    });

    await page.click('text=Connect GitHub');
    
    // Проверяем успешное подключение
    await expect(page.locator('text=Connected to GitHub')).toBeVisible();
    await expect(page.locator('text=test-repo')).toBeVisible();
  });

  test('should handle Vercel deployment', async ({ page }) => {
    // Мокаем ответ от Vercel
    await mockApiResponse(page, '**/api/deploy', {
      deploymentId: 'test-deployment-id',
      url: 'https://test-deployment.vercel.app',
      status: 'ready',
    });

    await page.goto('/deploy');
    await page.click('text=Deploy to Vercel');
    
    // Проверяем статус деплоя
    await expect(page.locator('text=Deployment successful')).toBeVisible();
    await expect(page.locator('text=https://test-deployment.vercel.app')).toBeVisible();
  });
}); 