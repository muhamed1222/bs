# Builder Studio - Конструктор сайтов

Современный конструктор сайтов на Next.js с поддержкой drag-and-drop редактора и аналитикой.

## Технологии

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Backend**: Next.js API Routes, Supabase
- **База данных**: PostgreSQL (через Supabase)
- **Аутентификация**: NextAuth.js
- **Редактор**: React DnD, Slate.js
- **Аналитика**: Google Analytics, Custom Events

## Быстрый старт

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/builder-studio.git
cd builder-studio
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Redis (для rate limiting)
REDIS_URL=your_redis_url

# Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_id

# Gemini AI (опционально)
GEMINI_API_KEY=your_gemini_key
```

4. Запустите миграции базы данных:
```bash
npm run db:migrate
```

5. Запустите сервер разработки:
```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Деплой

### Локальный деплой

1. Соберите приложение:
```bash
npm run build
```

2. Запустите продакшен-сервер:
```bash
npm start
```

### Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения в панели Vercel
3. Деплой произойдет автоматически при пуше в main

## API Документация

Полная документация API доступна через Swagger UI:
- Разработка: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- Продакшен: [https://your-domain.com/api/docs](https://your-domain.com/api/docs)

### Примеры API запросов

#### Регистрация пользователя
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }'
```

#### Создание страницы
```bash
curl -X POST http://localhost:3000/api/pages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Page",
    "description": "Page description"
  }'
```

## Тарифы и ограничения

### Free
- До 3 страниц
- Базовые блоки
- Публичный доступ

### Pro
- До 20 страниц
- Все блоки
- Приватные страницы
- Расширенная аналитика
- 2FA

### Business
- Неограниченное количество страниц
- Все функции Pro
- API доступ
- Приоритетная поддержка

## Разработка

### Структура проекта
```
src/
  ├── app/                 # Next.js App Router
  ├── features/           # Функциональные модули
  │   ├── auth/          # Аутентификация
  │   ├── blocks/        # Блоки страниц
  │   ├── pages/         # Управление страницами
  │   └── analytics/     # Аналитика
  ├── shared/            # Общие компоненты и утилиты
  └── pages/             # API роуты
```

### Тесты
```bash
# Запуск всех тестов
npm test

# Запуск тестов с покрытием
npm run test:coverage
```

### Линтинг
```bash
npm run lint
```

## Безопасность

- CSRF защита
- Rate limiting
- 2FA для Pro/Business
- Безопасные куки
- CSP заголовки
- XSS защита

## Аналитика

### Google Analytics
1. Создайте проект в Google Analytics
2. Получите ID отслеживания
3. Добавьте его в `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### События аналитики
- `page_view` - просмотр страницы
- `block_add` - добавление блока
- `page_publish` - публикация страницы
- `user_signup` - регистрация
- `user_login` - вход

## Лицензия

MIT
