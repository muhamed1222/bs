import { NextApiRequest, NextApiResponse } from 'next';
import csrf from 'csurf';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Настройка CSRF защиты
export const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
});

// Настройка Helmet
export const helmetMiddleware = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: 'same-site' },
  dnsPrefetchControl: true,
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
});

// Ограничение попыток входа
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // 5 попыток
  message: 'Too many login attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware для блокировки пользователя после неудачных попыток
export const checkUserBlocked = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const { email } = req.body;
  
  if (!email) {
    return next();
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { 
      id: true,
      loginAttempts: true,
      blockedUntil: true,
    },
  });

  if (user?.blockedUntil && user.blockedUntil > new Date()) {
    return res.status(403).json({
      error: 'Account is temporarily blocked. Please try again later.',
      blockedUntil: user.blockedUntil,
    });
  }

  next();
};

// Middleware для обработки ошибок
export const errorHandler = (err: any, req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  console.error(err);

  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  // В production не показываем stack trace
  const error = process.env.NODE_ENV === 'production'
    ? { error: 'Internal Server Error' }
    : { error: err.message, stack: err.stack };

  res.status(err.status || 500).json(error);
}; 