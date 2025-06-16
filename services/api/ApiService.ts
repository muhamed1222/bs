import { api } from './index';
import { cacheService } from '../cache/CacheService';
import { performanceService } from '../monitoring/PerformanceService';
import { errorService } from '../error/ErrorService';

interface ApiOptions {
  cache?: boolean;
  ttl?: number;
  cacheKey?: string;
}

export class ApiService {
  private static instance: ApiService;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public async get<T>(url: string, options: ApiOptions = {}): Promise<T> {
    const { cache = false, ttl, cacheKey = url } = options;

    if (cache) {
      const cached = cacheService.get<T>(cacheKey);
      if (cached) return cached;
    }

    return performanceService.measureAsync(
      `api.get.${url}`,
      async () => {
        try {
          const data = await api.get<T>(url);
          if (cache) {
            cacheService.set(cacheKey, data, ttl);
          }
          return data;
        } catch (error) {
          errorService.handleError(error as Error, `API GET ${url}`);
          throw error;
        }
      }
    );
  }

  public async post<T>(url: string, data: any, options: ApiOptions = {}): Promise<T> {
    const { cache = false, ttl, cacheKey = url } = options;

    return performanceService.measureAsync(
      `api.post.${url}`,
      async () => {
        try {
          const response = await api.post<T>(url, data);
          if (cache) {
            cacheService.set(cacheKey, response, ttl);
          }
          return response;
        } catch (error) {
          errorService.handleError(error as Error, `API POST ${url}`);
          throw error;
        }
      }
    );
  }

  public async put<T>(url: string, data: any, options: ApiOptions = {}): Promise<T> {
    const { cache = false, ttl, cacheKey = url } = options;

    return performanceService.measureAsync(
      `api.put.${url}`,
      async () => {
        try {
          const response = await api.put<T>(url, data);
          if (cache) {
            cacheService.set(cacheKey, response, ttl);
          }
          return response;
        } catch (error) {
          errorService.handleError(error as Error, `API PUT ${url}`);
          throw error;
        }
      }
    );
  }

  public async delete<T>(url: string, options: ApiOptions = {}): Promise<T> {
    const { cacheKey = url } = options;

    return performanceService.measureAsync(
      `api.delete.${url}`,
      async () => {
        try {
          const response = await api.delete<T>(url);
          if (cacheKey) {
            cacheService.delete(cacheKey);
          }
          return response;
        } catch (error) {
          errorService.handleError(error as Error, `API DELETE ${url}`);
          throw error;
        }
      }
    );
  }
}

export const apiService = ApiService.getInstance(); 