import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { env } from '../config';

const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export const initSession = async (app: any) => {
  await redisClient.connect();

  const sessionMiddleware = session({
    store: new RedisStore({ client: redisClient }),
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  });

  app.use(sessionMiddleware);

  // Graceful shutdown
  const shutdown = async () => {
    await redisClient.quit();
  };

  if (typeof process !== 'undefined') {
    process.on('SIGTERM', shutdown);
  }
}; 