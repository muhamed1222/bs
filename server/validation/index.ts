import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../errors';

export const validate = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new AppError(400, 'Validation error', false));
      } else {
        next(error);
      }
    }
  };
};

// Примеры схем валидации
export const schemas = {
  user: {
    create: z.object({
      body: z.object({
        username: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    }),
    update: z.object({
      body: z.object({
        username: z.string().min(3).max(50).optional(),
        email: z.string().email().optional(),
        password: z.string().min(8).optional(),
      }),
    }),
  },
  auth: {
    login: z.object({
      body: z.object({
        username: z.string(),
        password: z.string(),
      }),
    }),
    register: z.object({
      body: z.object({
        username: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    }),
  },
  post: {
    create: z.object({
      body: z.object({
        title: z.string().min(1).max(200),
        content: z.string().min(1),
        tags: z.array(z.string()).optional(),
      }),
    }),
    update: z.object({
      body: z.object({
        title: z.string().min(1).max(200).optional(),
        content: z.string().min(1).optional(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
}; 