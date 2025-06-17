import { useEffect } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const API_DOCS = {
  openapi: '3.0.0',
  info: {
    title: 'Builder Studio API',
    version: '1.0.0',
    description: 'API для конструктора сайтов Builder Studio',
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      description: 'API сервер',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Аутентификация'],
        summary: 'Регистрация пользователя',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'name'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  password: {
                    type: 'string',
                    minLength: 8,
                  },
                  name: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Пользователь успешно зарегистрирован',
          },
          '400': {
            description: 'Неверные данные',
          },
        },
      },
    },
    '/api/pages': {
      post: {
        tags: ['Страницы'],
        summary: 'Создание новой страницы',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: {
                    type: 'string',
                  },
                  description: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Страница успешно создана',
          },
          '401': {
            description: 'Требуется авторизация',
          },
        },
      },
    },
  },
};

export default function ApiDocs() {
  useEffect(() => {
    // Инициализация Swagger UI
    const swaggerUI = SwaggerUI({
      spec: API_DOCS,
      dom_id: '#swagger-ui',
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Документация</h1>
      <div id="swagger-ui" />
    </div>
  );
} 