import { Page } from '@playwright/test';

/**
 * Мок для Google OAuth
 * @param {Page} page - Объект страницы Playwright
 */
export async function mockGoogleAuth(page: Page) {
  await page.route('**/auth/google/callback*', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          name: 'Test User',
        },
      }),
    });
  });
}

/**
 * Мок для Stripe
 * @param {Page} page - Объект страницы Playwright
 */
export async function mockStripe(page: Page) {
  await page.route('**/api/stripe/create-checkout-session', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        url: 'http://localhost:3000/billing/success',
      }),
    });
  });
}

/**
 * Мокирует ответ API для указанного URL
 * @param page - Экземпляр страницы Playwright
 * @param url - URL для мокирования (поддерживает glob паттерны)
 * @param response - Объект ответа для мокирования
 */
export async function mockApiResponse(
  page: Page,
  url: string,
  response: any
): Promise<void> {
  await page.route(url, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
}

/**
 * Мокирует ошибку API для указанного URL
 * @param page - Экземпляр страницы Playwright
 * @param url - URL для мокирования (поддерживает glob паттерны)
 * @param status - HTTP статус ошибки
 * @param message - Сообщение об ошибке
 */
export async function mockApiError(
  page: Page,
  url: string,
  status: number,
  message: string
): Promise<void> {
  await page.route(url, async (route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({
        error: {
          message,
          code: status,
        },
      }),
    });
  });
}

/**
 * Мокирует задержку ответа API
 * @param page - Экземпляр страницы Playwright
 * @param url - URL для мокирования (поддерживает glob паттерны)
 * @param delay - Задержка в миллисекундах
 */
export async function mockApiDelay(
  page: Page,
  url: string,
  delay: number
): Promise<void> {
  await page.route(url, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    await route.continue();
  });
}

/**
 * Мокирует последовательность ответов API
 * @param page - Экземпляр страницы Playwright
 * @param url - URL для мокирования (поддерживает glob паттерны)
 * @param responses - Массив ответов для последовательного возврата
 */
export async function mockApiSequence(
  page: Page,
  url: string,
  responses: any[]
): Promise<void> {
  let index = 0;
  await page.route(url, async (route) => {
    if (index < responses.length) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(responses[index]),
      });
      index++;
    } else {
      await route.continue();
    }
  });
}

/**
 * Мокирует ответ API с учетом условий
 * @param page - Экземпляр страницы Playwright
 * @param url - URL для мокирования (поддерживает glob паттерны)
 * @param condition - Функция условия для определения ответа
 * @param responses - Объект с ответами для разных условий
 */
export async function mockApiConditional(
  page: Page,
  url: string,
  condition: (request: any) => string,
  responses: Record<string, any>
): Promise<void> {
  await page.route(url, async (route) => {
    const request = route.request();
    const key = condition(request);
    const response = responses[key];

    if (response) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response),
      });
    } else {
      await route.continue();
    }
  });
} 