# BS - Платформа для создания и публикации страниц

BS - это современная платформа для создания, редактирования и публикации веб-страниц. Проект позволяет пользователям создавать красивые страницы, делиться ими с миром и отслеживать статистику посещений.

## 🚀 Технологии

### Основной стек
- **Next.js 14** - React фреймворк с серверными компонентами
- **TypeScript** - Типизированный JavaScript
- **Prisma** - ORM для работы с базой данных
- **PostgreSQL** - Реляционная база данных
- **Tailwind CSS** - Утилитарный CSS фреймворк
- **NextAuth.js** - Аутентификация и авторизация
- **Stripe** - Платежная система
- **Chart.js** - Визуализация данных
- **MaxMind GeoIP2** - Геолокация по IP

### Инфраструктура
- **Docker** - Контейнеризация
- **Vercel** - Хостинг и деплой
- **GitHub Actions** - CI/CD
- **Sentry** - Мониторинг ошибок

## 🛠 Установка и запуск

### Предварительные требования
- Node.js 18+
- PostgreSQL 14+
- Docker (опционально)
- Stripe аккаунт
- MaxMind аккаунт

### Локальная разработка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/bs.git
cd bs
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env`:
```env
# База данных
DATABASE_URL="postgresql://user:password@localhost:5432/bs"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

# OAuth провайдеры
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"

# MaxMind GeoIP2
MAXMIND_ACCOUNT_ID="your-maxmind-account-id"
MAXMIND_LICENSE_KEY="your-maxmind-license-key"

# Приложение
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Выполните миграции базы данных:
```bash
npx prisma migrate dev
```

5. Запустите сервер разработки:
```bash
npm run dev
```

### Docker

1. Соберите образ:
```bash
docker build -t bs .
```

2. Запустите контейнер:
```bash
docker run -p 3000:3000 bs
```

## 💰 Тарифы

### Free
- До 5 страниц
- Базовая аналитика
- Ограниченное API
- Реклама

### Pro (₽299/месяц)
- До 50 страниц
- Расширенная аналитика
- Неограниченное API
- Без рекламы
- Приоритетная поддержка

### Business (₽999/месяц)
- Неограниченное количество страниц
- Полная аналитика
- Неограниченное API
- Без рекламы
- Приоритетная поддержка
- Командный доступ
- Белый список IP

## 📊 Аналитика

### Базовые метрики
- Количество просмотров
- Уникальные посетители
- География посетителей
- Источники трафика

### Расширенные метрики (Pro/Business)
- Время на странице
- Путь пользователя
- Конверсии
- Экспорт данных

## 🔒 Безопасность

- HTTPS
- CSRF защита
- Rate limiting
- XSS защита
- SQL инъекции
- Защита от DDoS

## 📝 API

### Базовые эндпоинты
- `GET /api/pages` - Получение списка страниц
- `GET /api/pages/:slug` - Получение страницы
- `POST /api/pages` - Создание страницы
- `PUT /api/pages/:slug` - Обновление страницы
- `DELETE /api/pages/:slug` - Удаление страницы

### Аналитика
- `GET /api/pages/:slug/views` - Статистика просмотров
- `GET /api/pages/:slug/analytics` - Расширенная аналитика

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функциональности
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License - подробности в файле [LICENSE](LICENSE)

## 📞 Поддержка

### ВНИМАНИЕ: Замените на реальные контакты перед публикацией
- Email: support@bs.example.com (заменить на реальный email)
- Telegram: @bs_support (заменить на реальный username)
- Документация: docs.bs.example.com (заменить на реальный URL)

### Тестовые данные для разработки
```env
# Тестовый аккаунт Stripe
STRIPE_SECRET_KEY="sk_test_51NxYzXKJ8X9Y2Z3W4V5U6T7S8R9Q0P1O2N3M4L5K6J7I8H9G0F1E2D3C4B5A6"
STRIPE_WEBHOOK_SECRET="whsec_test_51NxYzXKJ8X9Y2Z3W4V5U6T7S8R9Q0P1O2N3M4L5K6J7I8H9G0F1E2D3C4B5A6"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51NxYzXKJ8X9Y2Z3W4V5U6T7S8R9Q0P1O2N3M4L5K6J7I8H9G0F1E2D3C4B5A6"

# Тестовый аккаунт MaxMind
MAXMIND_ACCOUNT_ID="123456"
MAXMIND_LICENSE_KEY="abcdefghijklmnopqrstuvwxyz123456"

# Тестовый аккаунт Google OAuth
GOOGLE_CLIENT_ID="123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"

# Тестовый аккаунт для разработки
TEST_USER_EMAIL="test@bs.example.com"
TEST_USER_PASSWORD="testpass123"
```

### Временные URL для разработки
- Производственный: https://bs.example.com (заменить на реальный домен)
- Тестовый: https://staging.bs.example.com (заменить на реальный домен)
- Документация: https://docs.bs.example.com (заменить на реальный URL)

### Временные контакты для разработки
- Поддержка: support@bs.example.com (заменить на реальный email)
- Продажи: sales@bs.example.com (заменить на реальный email)
- Безопасность: security@bs.example.com (заменить на реальный email)

### Временные социальные сети
- Twitter: @bs_platform (заменить на реальный username)
- LinkedIn: bs-platform (заменить на реальный username)
- GitHub: bs-team (заменить на реальный username)

### Временные метрики для демонстрации
- Пользователей: 10,000+
- Страниц: 50,000+
- Просмотров: 1,000,000+
- API запросов: 10,000,000+

### Временные партнеры
- Hosting Partner: example-hosting.com (заменить на реального партнера)
- CDN Provider: example-cdn.com (заменить на реального партнера)
- Analytics Partner: example-analytics.com (заменить на реального партнера)

## Документация

- [Архитектура проекта](docs/architecture.md) - Описание архитектуры, компонентов и потоков данных
- [API документация](docs/api.md) - Описание API endpoints и примеры использования
- [Руководство по развертыванию](docs/deployment.md) - Инструкции по развертыванию
- [Руководство по разработке](docs/development.md) - Инструкции для разработчиков
