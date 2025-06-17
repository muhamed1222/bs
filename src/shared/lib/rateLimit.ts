import { Redis } from 'ioredis';
import { Ratelimit } from '@upstash/ratelimit';

const redis = new Redis(process.env.REDIS_URL!);

export const rateLimit = async () => {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 запросов в минуту
    analytics: true,
    prefix: 'ratelimit',
  });
};

export const withRateLimit = (handler: any) => async (req: any, res: any) => {
  const limiter = await rateLimit();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const result = await limiter.check(5, `RATE_LIMIT_${ip}`);

  if (!result.success) {
    return res.status(429).json({
      error: 'Too many requests',
      retryAfter: result.reset,
    });
  }

  return handler(req, res);
}; 