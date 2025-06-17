# BS - Builder Service

Сервис для создания и управления страницами с различными блоками.

## Возможности

- Создание и редактирование страниц
- Различные типы блоков (текст, изображения, видео и т.д.)
- API для интеграции с другими сервисами
- Система тарифов (FREE, PRO, ENTERPRISE)
- Кеширование для оптимизации производительности

## Технологии

- Next.js
- TypeScript
- Prisma
- PostgreSQL
- Redis
- Tailwind CSS
- Jest
- ESLint + Prettier
- Docker
- GitHub Actions
- Sentry

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/bs.git
cd bs
```

2. Установите зависимости:
```bash
npm install
```

3. Настройте переменные окружения:
```bash
cp .env.example .env
```

4. Запустите миграции:
```bash
npm run prisma:migrate
```

5. Запустите сиды:
```bash
npm run prisma:seed
```

6. Запустите приложение:
```bash
npm run dev
```

## Разработка

### Локальная разработка с Docker

```bash
docker-compose up
```

### Тестирование

```bash
npm test
```

### Линтинг

```bash
npm run lint
```

### Форматирование

```bash
npm run format
```

## Деплой

Приложение автоматически деплоится на AWS ECS при пуше в ветку `main`.

## Мониторинг

Для мониторинга используется Sentry. Настройте переменную окружения `NEXT_PUBLIC_SENTRY_DSN` для активации.

## Лицензия

MIT
