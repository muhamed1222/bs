import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

export async function initSession(app: import('express').Express) {
  const url = process.env.REDIS_URL;
  if (url) {
    const client = createClient({ url });
    client.on('error', (err) => console.error('Redis client error', err));
    try {
      await client.connect();
      const store = new RedisStore({ client });
      app.use(
        session({
          store,
          secret: process.env.SESSION_SECRET || 'keyboard cat',
          resave: false,
          saveUninitialized: false,
        })
      );
      return;
    } catch (err) {
      console.warn('Failed to connect to Redis, falling back to MemoryStore');
    }
  }
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'keyboard cat',
      resave: false,
      saveUninitialized: false,
    })
  );
}
