import { saveData, loadData } from './cloud';
import type { PageView, PageStats } from '@/types/analytics';
import prisma from '@/lib/prisma';

export interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: number;
}

export interface AnalyticsData {
  views: number;
  uniqueViews: number;
  linkClicks: Record<string, number>;
  reactions: Record<string, number>;
  comments: Comment[];
}

const STORAGE_KEY = 'analytics-data';
const INCOGNITO_KEY = 'analytics-incognito';

function emptyData(): AnalyticsData {
  return { views: 0, uniqueViews: 0, linkClicks: {}, reactions: {}, comments: [] };
}

function load(): AnalyticsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AnalyticsData) : emptyData();
  } catch {
    return emptyData();
  }
}

async function syncFromCloud(): Promise<void> {
  try {
    const data = await loadData<AnalyticsData>('analytics', 'default');
    if (data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (e) {
    console.error(e);
  }
}

async function syncToCloud(data: AnalyticsData): Promise<void> {
  try {
    await saveData('analytics', 'default', data);
  } catch (e) {
    console.error(e);
  }
}

function save(data: AnalyticsData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function isIncognito(): boolean {
  return localStorage.getItem(INCOGNITO_KEY) === '1';
}

export function setIncognito(value: boolean): void {
  localStorage.setItem(INCOGNITO_KEY, value ? '1' : '0');
}

export function recordView(): void {
  if (isIncognito()) return;
  const data = load();
  data.views += 1;
  if (!sessionStorage.getItem('unique-viewed')) {
    data.uniqueViews += 1;
    sessionStorage.setItem('unique-viewed', '1');
  }
  save(data);
  void syncToCloud(data);
}

export function recordLinkClick(id: string): void {
  if (isIncognito()) return;
  const data = load();
  data.linkClicks[id] = (data.linkClicks[id] || 0) + 1;
  save(data);
  void syncToCloud(data);
}

export function recordReaction(emoji: string): void {
  if (isIncognito()) return;
  const data = load();
  data.reactions[emoji] = (data.reactions[emoji] || 0) + 1;
  save(data);
  void syncToCloud(data);
}

export function addComment(text: string): void {
  if (isIncognito()) return;
  const data = load();
  data.comments.push({
    id: Math.random().toString(36).slice(2),
    text,
    author: '',
    timestamp: Date.now(),
  });
  save(data);
  void syncToCloud(data);
}

export function deleteComment(id: string): void {
  const data = load();
  data.comments = data.comments.filter((c) => c.id !== id);
  save(data);
  void syncToCloud(data);
}

export function getAnalytics(): AnalyticsData {
  return load();
}

export function clearAnalytics(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Initial load from cloud
void syncFromCloud();

/**
 * Получает статистику просмотров страницы
 * @param {string} pageId - ID страницы
 * @returns {Promise<PageStats>} Объект со статистикой
 * @throws {Error} Если произошла ошибка при получении данных
 */
export async function getPageStats(pageId: string): Promise<PageStats> {
  const views = await prisma.pageView.findMany({
    where: { pageId },
  });

  const uniqueIPs = new Set(views.map((view: PageView) => view.ip));
  const uniqueCountries = new Set(views.map((view: PageView) => view.country).filter(Boolean));

  return {
    total: views.length,
    unique: uniqueIPs.size,
    countries: uniqueCountries.size,
  };
}

/**
 * Получает последние просмотры страницы
 * @param {string} pageId - ID страницы
 * @param {number} limit - Максимальное количество записей
 * @returns {Promise<PageView[]>} Массив просмотров страницы
 * @throws {Error} Если произошла ошибка при получении данных
 */
export async function getRecentViews(pageId: string, limit = 100) {
  return prisma.pageView.findMany({
    where: { pageId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Регистрирует новый просмотр страницы
 * @param {string} pageId - ID страницы
 * @param {string} ip - IP адрес посетителя
 * @param {string} userAgent - User-Agent посетителя
 * @param {string} [referer] - Referer запроса
 * @param {string} [country] - Страна посетителя
 * @param {string} [city] - Город посетителя
 * @returns {Promise<PageView>} Созданная запись о просмотре
 * @throws {Error} Если произошла ошибка при создании записи
 */
export async function registerPageView(
  pageId: string,
  ip: string,
  userAgent: string,
  referer?: string,
  country?: string,
  city?: string
) {
  return prisma.pageView.create({
    data: {
      pageId,
      ip,
      userAgent,
      referer,
      country,
      city,
    },
  });
}
