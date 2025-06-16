import { env } from '../config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private isDevelopment = env.NODE_ENV === 'development';

  private formatLog(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(data && { data }),
    };
  }

  private log(level: LogLevel, message: string, data?: any) {
    const entry = this.formatLog(level, message, data);
    
    if (this.isDevelopment) {
      console.log(JSON.stringify(entry, null, 2));
    } else {
      // В продакшене можно отправлять логи в сервис логирования
      console.log(JSON.stringify(entry));
    }
  }

  debug(message: string, data?: any) {
    if (this.isDevelopment) {
      this.log('debug', message, data);
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error) {
    this.log('error', message, {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
    });
  }
}

export const logger = new Logger(); 