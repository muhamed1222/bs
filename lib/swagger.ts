import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BS API Documentation',
      version: '1.0.0',
      description: 'API documentation for BS platform',
      contact: {
        name: 'BS Support',
        email: 'support@bs.example.com',
        url: 'https://bs.example.com/support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.bs.example.com',
        description: 'Production server',
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
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
            code: {
              type: 'string',
              description: 'Error code',
            },
          },
        },
        Page: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            title: {
              type: 'string',
            },
            slug: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            content: {
              type: 'string',
            },
            isPublished: {
              type: 'boolean',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            username: {
              type: 'string',
            },
            image: {
              type: 'string',
              format: 'uri',
            },
          },
        },
        PageView: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            pageId: {
              type: 'string',
              format: 'uuid',
            },
            ip: {
              type: 'string',
            },
            userAgent: {
              type: 'string',
            },
            referer: {
              type: 'string',
            },
            country: {
              type: 'string',
            },
            city: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./app/api/**/*.ts'], // Путь к файлам с API
};

export const swaggerSpec = swaggerJsdoc(options); 