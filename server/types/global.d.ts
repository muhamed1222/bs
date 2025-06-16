/// <reference types="node" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      SESSION_SECRET: string;
      REDIS_URL?: string;
      DATABASE_URL: string;
      OAUTH_CLIENT_ID: string;
      OAUTH_CLIENT_SECRET: string;
      OAUTH_CALLBACK_URL: string;
      API_RATE_LIMIT: string;
      API_RATE_WINDOW_MS: string;
      CORS_ORIGIN: string;
      JWT_SECRET: string;
      ENABLE_GRAPHQL: string;
      ENABLE_SWAGGER: string;
    }
  }
}

export {}; 