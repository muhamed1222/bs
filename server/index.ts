/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import { ApolloServer, gql } from 'apollo-server-express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import OAuth2Server from 'oauth2-server';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import PublicProfilePage from '../pages/PublicProfilePage';
import { fetchPublicProfile } from '../mock/profiles';

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('warning', (warning) => {
  console.warn(warning.name, warning.message, warning.stack);
});

const app = express();
app.use(express.json());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

// Slug management
const RESERVED_SLUGS = new Set(['admin', 'login', 'me', 'profile']);
const usedSlugs = new Set<string>();

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}

// Simple in-memory OAuth model
const users: Record<string, { id: string; password: string }> = {
  user: { id: 'user', password: 'pass' },
  test: { id: 'test', password: 'testpass' },
};

const oauth = new OAuth2Server({
  model: {
    async getClient(clientId: string, clientSecret: string) {
      if (clientId === 'client' && clientSecret === 'secret') {
        return { id: 'client', grants: ['client_credentials'] };
      }
      return null;
    },
    async saveToken(token: any, client: any, user: any) {
      return { ...token, client, user };
    },
    async getUser(username: string, password: string) {
      const record = users[username];
      if (record && record.password === password) {
        return { id: record.id };
      }
      return null;
    },
    async getAccessToken(accessToken: string) {
      return {
        accessToken,
        client: { id: 'client', grants: ['client_credentials'] }, // добавлено поле grants
        user: { id: 'user' },
        accessTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
      };
    },
    verifyScope(token: any, scope: any) {
      // Здесь можно реализовать свою логику проверки scope
      return Promise.resolve(true); // Всегда разрешает, для примера
    },
  },
});

app.post('/oauth/token', (req, res, _next) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);
  oauth
    .token(request, response)
    .then(function (token: OAuth2Server.Token) {
      console.log(token); // Use the variable if needed
      res.json(token);
    })
    .catch(function (err: OAuth2Server.OAuthError | Error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const status = (err as any).code || 500;
      res.status(status).json(err);
    });
});

// Rate limiting middleware
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', limiter);

// Sample REST endpoint
app.get('/api/profile', (_req, res) => {
  res.json({ id: 'user', name: 'Demo User' });
});

app.get('/api/me', (req, res) => {
  const user = (req as any).session.user;
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// Simple auth endpoints for local development
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }
  if (users[email]) {
    res.status(409).json({ error: 'User already exists' });
    return;
  }
  users[email] = { id: email, password };
  const user = { id: email, email, role: 'owner' };
  (req as any).session.user = user;
  res.status(201).json(user);
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  const record = users[email];
  if (record && record.password === password) {
    const user = { id: record.id, email, role: 'owner' };
    (req as any).session.user = user;
    res.json(user);
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Slug endpoints
app.get('/api/check-slug', (req, res) => {
  const slug = String(req.query.slug || '').toLowerCase();
  if (!slug) {
    res.status(400).json({ error: 'Missing slug' });
    return;
  }
  if (!isValidSlug(slug)) {
    res.status(400).json({ error: 'Invalid slug' });
    return;
  }
  const available = !RESERVED_SLUGS.has(slug) && !usedSlugs.has(slug);
  res.status(available ? 200 : 409).json({ available });
});

app.post('/api/register-slug', (req, res) => {
  const slug = String(req.body.slug || '').toLowerCase();
  if (!slug) {
    res.status(400).json({ error: 'Missing slug' });
    return;
  }
  if (!isValidSlug(slug)) {
    res.status(400).json({ error: 'Invalid slug' });
    return;
  }
  if (RESERVED_SLUGS.has(slug) || usedSlugs.has(slug)) {
    res.status(409).json({ success: false });
    return;
  }
  usedSlugs.add(slug);
  res.json({ success: true });
});

// GraphQL setup
const typeDefs = gql`
  type Query {
    profile: Profile
  }
  type Profile {
    id: ID!
    name: String!
  }
`;
const resolvers = {
  Query: {
    profile: () => ({ id: 'user', name: 'Demo User' }),
  },
};
const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();
apollo.applyMiddleware({ app, path: '/graphql' });

// Swagger setup
const specs = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Basis API',
      version: '1.0.0',
    },
  },
  apis: [],
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Webhook endpoint example
app.post('/webhook/event', (req, res) => {
  console.log('Received event', req.body);
  res.sendStatus(200);
});

// Simplified demo endpoints for the frontend
app.get('/api/home', (_req, res) => {
  const cases = [
    {
      id: '1',
      title: 'Дизайнерское портфолио',
      desc: 'Пример стильной страницы для креативных работ',
      preview: 'https://placehold.co/600x400/png',
      username: 'designer',
    },
    {
      id: '2',
      title: 'Профиль разработчика',
      desc: 'Техническое портфолио с ссылками на проекты',
      preview: 'https://placehold.co/600x400/png',
      username: 'dev',
    },
    {
      id: '3',
      title: 'Личный блог',
      desc: 'Пример странички для контент‑криэйтора',
      preview: 'https://placehold.co/600x400/png',
      username: 'blogger',
    },
  ];
  const stats = { users: 1200, pages: 3400, integrations: 12 };
  const reviews = [
    {
      id: '1',
      name: 'Анна',
      job: 'Дизайнер',
      avatar: 'https://placehold.co/80/png',
      text: 'Очень удобный сервис, создала портфолио за пару минут!',
      stars: 5,
    },
    {
      id: '2',
      name: 'Иван',
      job: 'Разработчик',
      avatar: 'https://placehold.co/80/png',
      text: 'Интеграции работают отлично, сайт загрузил код без проблем.',
      stars: 4,
    },
  ];
  res.json({ cases, stats, reviews });
});

app.get('/api/billing', (_req, res) => {
  const tariffs = [
    {
      id: 'free',
      name: 'Free',
      price: '0₽',
      features: ['1 страница', 'Базовые блоки', 'Поддержка Basis'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '499₽',
      features: [
        '10 страниц',
        'Все блоки',
        'Кастомный домен',
        'Аналитика',
        'Приоритетная поддержка',
      ],
      popular: true,
    },
    {
      id: 'business',
      name: 'Business',
      price: '1499₽',
      features: [
        'Безлимит страниц',
        'Командный доступ',
        'API доступ',
        'Персональный менеджер',
      ],
    },
  ];
  const billing = {
    tariff: tariffs[0],
    paymentMethod: 'Карта Visa **** **** **** 1234 (действительна до 12/25)',
    autoRenew: true,
  };
  const history = [
    {
      date: '01.08.2024',
      amount: '499₽',
      status: 'Оплачено',
      invoiceId: 'INV-2024-001',
      invoiceLink: '#',
    },
    {
      date: '01.07.2024',
      amount: '499₽',
      status: 'Оплачено',
      invoiceId: 'INV-2024-002',
      invoiceLink: '#',
    },
    {
      date: '01.06.2024',
      amount: '499₽',
      status: 'Оплачено',
      invoiceId: 'INV-2024-003',
      invoiceLink: '#',
    },
  ];
  res.json({ tariffs, billing, history });
});

app.get('/public-profile/:slug', async (req, res) => {
  const { slug } = req.params;
  const data = await fetchPublicProfile(slug);
  const html = ReactDOMServer.renderToString(
    React.createElement(
      StaticRouter,
      { location: req.url },
      React.createElement(PublicProfilePage)
    )
  );
  res.set('Cache-Control', 'public, max-age=300');
  res.send(
    `<!doctype html><html lang="ru"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${
      data?.name || 'Профиль'
    }</title><link rel="stylesheet" href="/index.css" /></head><body><div id="root">${html}</div><script type="module" src="/index.tsx"></script></body></html>`
  );
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
}

export default app;
