import { Page } from '@playwright/test';
import { mockApiResponse } from './mocks';

/**
 * Авторизует пользователя в системе
 * @param page - Экземпляр страницы Playwright
 * @param user - Данные пользователя для авторизации
 */
export async function login(
  page: Page,
  user: {
    email: string;
    name: string;
    role?: 'user' | 'admin';
    subscription?: 'free' | 'pro' | 'business';
  }
): Promise<void> {
  // Мокаем ответ от API авторизации
  await mockApiResponse(page, '**/api/auth/session', {
    user: {
      id: 'test-user-id',
      email: user.email,
      name: user.name,
      role: user.role || 'user',
      subscription: user.subscription || 'free',
    },
  });

  // Переходим на страницу входа
  await page.goto('/auth/signin');
  
  // Заполняем форму входа
  await page.fill('input[name="email"]', user.email);
  await page.fill('input[name="password"]', 'test-password');
  await page.click('button[type="submit"]');
  
  // Ждем успешной авторизации
  await page.waitForURL('/dashboard');
}

/**
 * Создает тестовую страницу
 * @param page - Экземпляр страницы Playwright
 * @param pageData - Данные для создания страницы
 */
export async function createTestPage(
  page: Page,
  pageData: {
    title: string;
    slug: string;
    content?: string;
    isPublished?: boolean;
  }
): Promise<void> {
  // Мокаем ответ от API создания страницы
  await mockApiResponse(page, '**/api/pages', {
    id: 'test-page-id',
    ...pageData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Переходим на страницу создания
  await page.goto('/dashboard');
  await page.click('text=Create Page');
  
  // Заполняем форму
  await page.fill('input[name="title"]', pageData.title);
  await page.fill('input[name="slug"]', pageData.slug);
  
  if (pageData.content) {
    await page.fill('textarea[name="content"]', pageData.content);
  }
  
  if (pageData.isPublished) {
    await page.check('input[name="isPublished"]');
  }
  
  await page.click('button[type="submit"]');
  
  // Ждем успешного создания
  await page.waitForURL(`/editor/${pageData.slug}`);
}

/**
 * Создает тестовую команду
 * @param page - Экземпляр страницы Playwright
 * @param teamData - Данные для создания команды
 */
export async function createTestTeam(
  page: Page,
  teamData: {
    name: string;
    members?: Array<{
      email: string;
      role: 'member' | 'admin';
    }>;
  }
): Promise<void> {
  // Мокаем ответ от API создания команды
  await mockApiResponse(page, '**/api/team', {
    id: 'test-team-id',
    ...teamData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Переходим на страницу создания команды
  await page.goto('/team');
  await page.click('text=Create Team');
  
  // Заполняем форму
  await page.fill('input[name="name"]', teamData.name);
  
  if (teamData.members) {
    for (const member of teamData.members) {
      await page.click('text=Add Member');
      await page.fill('input[name="email"]', member.email);
      await page.selectOption('select[name="role"]', member.role);
      await page.click('text=Add');
    }
  }
  
  await page.click('button[type="submit"]');
  
  // Ждем успешного создания
  await page.waitForURL('/team');
}

/**
 * Создает тестовую подписку
 * @param page - Экземпляр страницы Playwright
 * @param subscriptionData - Данные для создания подписки
 */
export async function createTestSubscription(
  page: Page,
  subscriptionData: {
    plan: 'pro' | 'business';
    status: 'active' | 'canceled';
    interval: 'month' | 'year';
  }
): Promise<void> {
  // Мокаем ответ от API создания подписки
  await mockApiResponse(page, '**/api/billing/subscription', {
    id: 'test-subscription-id',
    ...subscriptionData,
    createdAt: new Date().toISOString(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });

  // Переходим на страницу биллинга
  await page.goto('/billing');
  
  // Выбираем план
  await page.click(`text=${subscriptionData.plan.toUpperCase()} Plan`);
  
  // Выбираем интервал
  await page.click(`text=${subscriptionData.interval}`);
  
  // Подтверждаем создание
  await page.click('text=Subscribe');
  
  // Ждем успешного создания
  await page.waitForURL('/billing');
}

/**
 * Очищает тестовые данные
 * @param {Page} page - Объект страницы Playwright
 * @param {string} slug - Slug страницы для удаления
 */
export async function cleanupTestPage(page: Page, slug: string) {
  await page.goto(`/editor/${slug}`);
  await page.click('text=Delete');
  await page.click('text=Confirm');
  await page.waitForURL('/dashboard');
} 