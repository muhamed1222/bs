import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: ['localhost', /^https:\/\/bs\.com/],
      }),
    ],
  });
}

export const captureException = (error: Error, context?: Record<string, any>) => {
  if (SENTRY_DSN) {
    Sentry.withScope((scope) => {
      if (context) {
        Object.entries(context).forEach(([key, value]) => {
          scope.setExtra(key, value);
        });
      }
      Sentry.captureException(error);
    });
  }
  console.error(error);
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info') => {
  if (SENTRY_DSN) {
    Sentry.captureMessage(message, level);
  }
  console.log(`[${level.toUpperCase()}] ${message}`);
}; 