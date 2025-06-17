import { RedisService } from './redisService';

export class CacheService {
  private static instance: CacheService;
  private redis: RedisService;
  private readonly TTL = {
    PROFILE: 3600, // 1 час
    PAGE: 1800, // 30 минут
    POPULAR: 7200, // 2 часа
  };

  private constructor() {
    this.redis = RedisService.getInstance();
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  // Кеширование профиля пользователя
  async getProfile(userId: string) {
    return this.redis.get(`profile:${userId}`);
  }

  async setProfile(userId: string, data: any) {
    await this.redis.set(`profile:${userId}`, data, this.TTL.PROFILE);
  }

  async invalidateProfile(userId: string) {
    await this.redis.del(`profile:${userId}`);
  }

  // Кеширование страницы
  async getPage(slug: string) {
    return this.redis.get(`page:${slug}`);
  }

  async setPage(slug: string, data: any) {
    await this.redis.set(`page:${slug}`, data, this.TTL.PAGE);
  }

  async invalidatePage(slug: string) {
    await this.redis.del(`page:${slug}`);
  }

  // Кеширование популярных страниц
  async getPopularPages() {
    return this.redis.get('popular:pages');
  }

  async setPopularPages(data: any) {
    await this.redis.set('popular:pages', data, this.TTL.POPULAR);
  }

  async invalidatePopularPages() {
    await this.redis.del('popular:pages');
  }

  // Очистка всего кеша
  async clearAll() {
    await this.redis.flush();
  }
} 