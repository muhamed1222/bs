# Архитектура проекта

## Общая структура

```mermaid
graph TD
    Client[Клиентский слой] --> Next[Next.js приложение]
    Next --> API[API слой]
    API --> Services[Сервисный слой]
    Services --> DB[(База данных)]
    Services --> External[Внешние сервисы]
    
    subgraph "Клиентский слой"
        Client --> Pages[Страницы]
        Client --> Components[Компоненты]
        Client --> Hooks[React Hooks]
    end
    
    subgraph "API слой"
        API --> Auth[Авторизация]
        API --> PagesAPI[API страниц]
        API --> Analytics[API аналитики]
        API --> Billing[API биллинга]
    end
    
    subgraph "Сервисный слой"
        Services --> AuthService[Сервис авторизации]
        Services --> PageService[Сервис страниц]
        Services --> AnalyticsService[Сервис аналитики]
        Services --> BillingService[Сервис биллинга]
    end
    
    subgraph "Внешние сервисы"
        External --> Google[Google OAuth]
        External --> Stripe[Stripe]
        External --> MaxMind[MaxMind GeoIP2]
        External --> Sentry[Sentry]
    end
```

## Компоненты системы

### Клиентский слой
- **Страницы** (`app/`): Next.js страницы приложения
- **Компоненты** (`components/`): React компоненты
- **Хуки** (`hooks/`): React хуки для управления состоянием

### API слой
- **Авторизация** (`app/api/auth/`): Обработка авторизации
- **API страниц** (`app/api/pages/`): Управление страницами
- **API аналитики** (`app/api/analytics/`): Сбор и анализ данных
- **API биллинга** (`app/api/billing/`): Обработка платежей

### Сервисный слой
- **Сервис авторизации** (`services/auth.ts`): Логика авторизации
- **Сервис страниц** (`services/pages.ts`): Бизнес-логика страниц
- **Сервис аналитики** (`services/analytics.ts`): Обработка аналитики
- **Сервис биллинга** (`services/billing.ts`): Обработка платежей

### База данных
- **PostgreSQL**: Основная база данных
- **Prisma**: ORM для работы с базой данных
- **Миграции** (`prisma/migrations/`): История изменений схемы

### Внешние сервисы
- **Google OAuth**: Авторизация через Google
- **Stripe**: Обработка платежей
- **MaxMind GeoIP2**: Определение геолокации
- **Sentry**: Мониторинг ошибок

## Потоки данных

### Авторизация
```mermaid
sequenceDiagram
    Client->>+API: Запрос авторизации
    API->>+Google: OAuth запрос
    Google-->>-API: OAuth токен
    API->>+DB: Сохранение сессии
    DB-->>-API: Подтверждение
    API-->>-Client: JWT токен
```

### Создание страницы
```mermaid
sequenceDiagram
    Client->>+API: Запрос создания
    API->>+Services: Валидация данных
    Services->>+DB: Сохранение страницы
    DB-->>-Services: Подтверждение
    Services-->>-API: Результат
    API-->>-Client: Ответ
```

### Обработка платежа
```mermaid
sequenceDiagram
    Client->>+API: Запрос платежа
    API->>+Stripe: Создание сессии
    Stripe-->>-API: URL оплаты
    API-->>-Client: URL
    Client->>+Stripe: Оплата
    Stripe->>+API: Webhook
    API->>+DB: Обновление подписки
    DB-->>-API: Подтверждение
    API-->>-Client: Статус
```

## Безопасность

### Аутентификация
- JWT токены для API
- OAuth 2.0 для внешних сервисов
- Сессии в базе данных

### Авторизация
- Роли пользователей (user, admin)
- Проверка прав доступа
- Лимиты по тарифам

### Защита данных
- HTTPS для всех запросов
- Валидация входных данных
- Санитизация выходных данных

## Масштабирование

### Горизонтальное масштабирование
- Статические файлы на CDN
- База данных с репликацией
- Кэширование на уровне API

### Вертикальное масштабирование
- Оптимизация запросов
- Индексация базы данных
- Мониторинг производительности

## Мониторинг

### Метрики
- Время ответа API
- Использование ресурсов
- Ошибки и исключения

### Логирование
- Структурированные логи
- Трейсинг запросов
- Аудит действий

## Развертывание

### CI/CD
- GitHub Actions для сборки
- Автоматические тесты
- Деплой на Vercel

### Окружения
- Разработка (development)
- Тестирование (staging)
- Продакшн (production) 