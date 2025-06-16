import { Router, Request, Response, NextFunction } from 'express';
import { validate, schemas } from '../validation';
import { authenticateRequest } from '../auth';
import { db } from '../db';
import { cache } from '../cache';
import { logger } from '../logger';
import { AppError } from '../errors';
import { AuthRequest } from '../types/auth';

interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags?: string[];
}

interface CachedResponse extends Response {
  sendResponse?: Response['json'];
}

const router = Router();

// Middleware для кэширования
const cacheMiddleware = (ttl: number) => {
  return async (req: Request, res: CachedResponse, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`;
    const cached = await cache.get(key);
    
    if (cached) {
      return res.json(cached);
    }
    
    const originalJson = res.json;
    res.json = function(body: any) {
      cache.set(key, body, ttl);
      return originalJson.call(this, body);
    };
    
    next();
  };
};

// Пользователи
router.get('/users', 
  authenticateRequest,
  cacheMiddleware(300), // 5 минут
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await db.query('users');
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/users',
  validate(schemas.user.create),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await db.insert('users', req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/users/:id',
  authenticateRequest,
  validate(schemas.user.update),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await db.update('users', req.params.id, req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/users/:id',
  authenticateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.delete('users', req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

// Посты
router.get('/posts',
  cacheMiddleware(60), // 1 минута
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await db.query<Post>('posts');
      res.json(posts);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/posts',
  authenticateRequest,
  validate(schemas.post.create),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        throw new AppError(401, 'User not authenticated');
      }
      const post = await db.insert<Post>('posts', {
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/posts/:id',
  authenticateRequest,
  validate(schemas.post.update),
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        throw new AppError(401, 'User not authenticated');
      }
      const posts = await db.query<Post>('posts', { id: req.params.id });
      if (!posts[0]) {
        throw new AppError(404, 'Post not found');
      }
      if (posts[0].userId !== req.user.id) {
        throw new AppError(403, 'Forbidden');
      }
      const updatedPost = await db.update<Post>('posts', req.params.id, req.body);
      res.json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/posts/:id',
  authenticateRequest,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        throw new AppError(401, 'User not authenticated');
      }
      const posts = await db.query<Post>('posts', { id: req.params.id });
      if (!posts[0]) {
        throw new AppError(404, 'Post not found');
      }
      if (posts[0].userId !== req.user.id) {
        throw new AppError(403, 'Forbidden');
      }
      await db.delete('posts', req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

export const initApi = (app: any) => {
  app.use('/api', router);
  logger.info('API routes initialized');
}; 