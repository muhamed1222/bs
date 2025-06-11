# Run and deploy your AI Studio app

Это минимальный шаблон приложения на React/Vite. Ниже приведена информация о запуске и краткое описание структуры.

## Run Locally

**Prerequisites:** Node.js (поддерживаются версии 16 и выше)

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
4. Запустите API сервер:
   `npm run server`
   
   Или используйте одну команду для одновременного запуска клиента и сервера:
   `npm run dev:all`

## Структура проекта

```
components/      // переиспользуемые элементы и контейнеры
hooks/           // общие React hooks
services/        // запросы к внешним API
contexts/        // React контексты
ui/              // простые UI-компоненты (кнопки и т.д.)
pages/           // страницы приложения
layouts/         // компоненты раскладки
routes/          // конфигурация маршрутов
```


## API сервер

В каталоге `server/` расположен простой сервер на Express с поддержкой OAuth2, GraphQL и документацией Swagger. Запуск сервера:

```
npm run server
```

REST‑эндпоинт `/api/profile` и GraphQL‑точка `/graphql` предоставляют базовый доступ к профилю пользователя. Токен можно получить через `/oauth/token`. Пример документации доступен на `/docs` после запуска сервера.

Для тестирования предусмотрен аккаунт: **test@example.com** с паролем **testpass**.

## Запуск тестов

После установки зависимостей можно запустить простые тесты командой:

`npm test`

Для режима наблюдения используйте:

`npm run test:watch`

## Линтинг и форматирование

В проекте настроены ESLint и Prettier. Запуск проверки:

```
npx eslint .
```

Форматирование файлов:

```
npx prettier -w .
```


## Деплой на Vercel

1. Установите [Vercel CLI](https://vercel.com/docs/cli):
   ```bash
   npm install -g vercel
   ```
2. Выполните команду `vercel` и следуйте инструкциям для создания проекта.
3. При первом деплое Vercel выполнит `npm run build` и разместит содержимое каталога `dist`.
4. Все запросы к API (`/api`, `/oauth`, `/graphql`, `/docs`, `/public-profile/:slug`) будут обрабатываться сервером Express из папки `server` благодаря файлу `api/index.ts` и настройкам из `vercel.json`.

