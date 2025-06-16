import { api } from '../api';

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ErrorService {
  private static instance: ErrorService;
  private errorCount: Map<string, number> = new Map();
  private readonly MAX_ERRORS = 3;
  private readonly ERROR_RESET_INTERVAL = 60000; // 1 минута

  private constructor() {
    setInterval(() => this.resetErrorCounts(), this.ERROR_RESET_INTERVAL);
  }

  public static getInstance(): ErrorService {
    if (!ErrorService.instance) {
      ErrorService.instance = new ErrorService();
    }
    return ErrorService.instance;
  }

  public handleError(error: Error, context: string): void {
    const errorKey = `${error.name}:${context}`;
    const count = (this.errorCount.get(errorKey) || 0) + 1;
    this.errorCount.set(errorKey, count);

    // Логируем ошибку
    console.error(`[${context}] ${error.message}`, error);

    // Отправляем на сервер аналитики
    this.reportError(error, context);

    // Если ошибок слишком много, возможно есть системная проблема
    if (count >= this.MAX_ERRORS) {
      this.handleRepeatedError(error, context);
    }
  }

  private async reportError(error: Error, context: string): Promise<void> {
    try {
      await api.post('/analytics/errors', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString()
      });
    } catch (reportError) {
      console.error('Failed to report error:', reportError);
    }
  }

  private handleRepeatedError(error: Error, context: string): void {
    // Здесь можно добавить дополнительную логику для обработки повторяющихся ошибок
    // Например, показать уведомление пользователю или перезагрузить страницу
    console.warn(`Multiple errors in ${context}:`, error);
  }

  private resetErrorCounts(): void {
    this.errorCount.clear();
  }
}

export const errorService = ErrorService.getInstance(); 