import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  SESSION_SECRET: z.string(),
  REDIS_URL: z.string().optional(),
  DATABASE_URL: z.string(),
  OAUTH_CLIENT_ID: z.string(),
  OAUTH_CLIENT_SECRET: z.string(),
  OAUTH_CALLBACK_URL: z.string(),
  API_RATE_LIMIT: z.string().transform(Number).default('100'),
  API_RATE_WINDOW_MS: z.string().transform(Number).default('900000'),
  CORS_ORIGIN: z.string(),
  JWT_SECRET: z.string(),
  ENABLE_GRAPHQL: z.string().transform(val => val === 'true').default('true'),
  ENABLE_SWAGGER: z.string().transform(val => val === 'true').default('true'),
});

export const env = envSchema.parse(process.env);

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test'; 