require('@testing-library/jest-dom');

// Увеличиваем таймаут для тестов
jest.setTimeout(10000);

// Мокаем переменные окружения
process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/bs_test';
process.env.REDIS_URL = 'redis://localhost:6379';

// Очищаем все моки после каждого теста
afterEach(() => {
  jest.clearAllMocks();
});

// Мокаем window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
}); 