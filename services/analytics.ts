import { saveData, loadData } from './cloud';

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
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
    createdAt: new Date().toISOString(),
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
