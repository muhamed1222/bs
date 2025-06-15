import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import type { AuthSession } from './types';
import { users, addUser, authenticate } from './userStore';

const RESERVED_SLUGS = new Set(['admin', 'login', 'me', 'profile']);
export const usedSlugs = new Set<string>();

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}

export function initRest(app: import('express').Express) {
  const router = Router();
  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
  router.use(limiter);

  router.get('/profile', (_req, res) => {
    res.json({ id: 'user', name: 'Demo User' });
  });

  router.get('/me', (req, res) => {
    const user = (req.session as AuthSession).user;
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });

  router.post('/signup', (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password required' });
      return;
    }
    if (users[email]) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }
    addUser(email, password);
    const user = { id: email, email, role: 'owner' };
    (req.session as AuthSession).user = user;
    res.status(201).json(user);
  });

  router.post('/login', (req, res) => {
    const { email, password } = req.body || {};
    const record = authenticate(email, password);
    if (record) {
      const user = { id: record.id, email, role: 'owner' };
      (req.session as AuthSession).user = user;
      res.json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  router.get('/check-slug', (req, res) => {
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

  router.post('/register-slug', (req, res) => {
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

  router.get('/home', (_req, res) => {
    const cases = [
      { id: '1', title: 'Дизайнерское портфолио', desc: 'Пример стильной страницы для креативных работ', preview: 'https://placehold.co/600x400/png', username: 'designer' },
      { id: '2', title: 'Профиль разработчика', desc: 'Техническое портфолио с ссылками на проекты', preview: 'https://placehold.co/600x400/png', username: 'dev' },
      { id: '3', title: 'Личный блог', desc: 'Пример странички для контент‑криэйтора', preview: 'https://placehold.co/600x400/png', username: 'blogger' },
    ];
    const stats = { users: 1200, pages: 3400, integrations: 12 };
    const reviews = [
      { id: '1', name: 'Анна', job: 'Дизайнер', avatar: 'https://placehold.co/80/png', text: 'Очень удобный сервис, создала портфолио за пару минут!', stars: 5 },
      { id: '2', name: 'Иван', job: 'Разработчик', avatar: 'https://placehold.co/80/png', text: 'Интеграции работают отлично, сайт загрузил код без проблем.', stars: 4 },
    ];
    res.json({ cases, stats, reviews });
  });

  router.get('/billing', (_req, res) => {
    const tariffs = [
      {
        id: 'free',
        name: 'Free',
        price: '0₽',
        features: [
          '1 страница',
          'До 5–10 ссылок',
          'Базовые блоки (текст, ссылка, медиа)',
          'Базовая аналитика',
          'Субдомен basis.site/slug',
          'Ограниченные темы',
          'Брендинг Basis',
        ],
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '499₽',
        features: [
          'До 10 страниц',
          'Все блоки (формы, видео, карты)',
          'Кастомный домен',
          'Расширенная аналитика',
          'Без брендинга',
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
          'API‑доступ и интеграции',
          'A/B тестирование',
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
      { date: '01.08.2024', amount: '499₽', status: 'Оплачено', invoiceId: 'INV-2024-001', invoiceLink: '#' },
      { date: '01.07.2024', amount: '499₽', status: 'Оплачено', invoiceId: 'INV-2024-002', invoiceLink: '#' },
      { date: '01.06.2024', amount: '499₽', status: 'Оплачено', invoiceId: 'INV-2024-003', invoiceLink: '#' },
    ];
    res.json({ tariffs, billing, history });
  });

  app.use('/api', router);
  app.post('/webhook/event', (req, res) => {
    console.log('Received event', req.body);
    res.sendStatus(200);
  });
}
