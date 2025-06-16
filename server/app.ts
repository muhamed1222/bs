import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { initRest } from './rest';
import { oauthRouter } from './oauth';
import { initGraphQL } from './graphql';
import { initSSR } from './ssr';
import { initSession } from './session';
import { errorHandler } from './errors';
import { initCache } from './cache';
import { logger } from './logger';
import { env } from './config';

export const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: env.API_RATE_WINDOW_MS,
  max: env.API_RATE_LIMIT,
});
app.use(limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`, {
    query: req.query,
    body: req.body,
    ip: req.ip,
  });
  next();
});

// Initialize services
const initServices = async () => {
  try {
    await initCache();
    await initSession(app);
    logger.info('Services initialized');
  } catch (error) {
    logger.error('Failed to initialize services', error as Error);
    process.exit(1);
  }
};

// Routes
app.use(oauthRouter);
initRest(app);

// Optional features
if (env.ENABLE_GRAPHQL) {
  await initGraphQL(app);
}

initSSR(app);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error', err);
  errorHandler(err, req, res, next);
});

// Global error handlers
const setupGlobalErrorHandlers = () => {
  if (typeof process === 'undefined') return;

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection', reason as Error);
    process.exit(1);
  });

  process.on('warning', (warning) => {
    logger.warn('Process warning', warning);
  });
};

// Initialize application
const init = async () => {
  await initServices();
  setupGlobalErrorHandlers();
  logger.info('Application initialized');
};

init().catch((error) => {
  logger.error('Failed to initialize application', error);
  process.exit(1);
});
