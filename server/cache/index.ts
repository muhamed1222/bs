import { createClient } from 'redis';
import { env } from '../config';

const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const stringValue = JSON.stringify(value);
      if (ttl) {
        await redisClient.setEx(key, ttl, stringValue);
      } else {
        await redisClient.set(key, stringValue);
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  },

  async clear(): Promise<void> {
    try {
      await redisClient.flushAll();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  },
};

// Инициализация подключения к Redis
export const initCache = async () => {
  try {
    await redisClient.connect();
    console.log('Redis connected');
  } catch (error) {
    console.error('Redis connection error:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async () => {
  try {
    await redisClient.quit();
    console.log('Redis disconnected');
  } catch (error) {
    console.error('Redis disconnect error:', error);
  }
};

if (typeof process !== 'undefined') {
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
} 