import { api } from '../api';

interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

class LogService {
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;
  private readonly flushInterval = 30000; // 30 seconds

  constructor() {
    setInterval(() => this.flushLogs(), this.flushInterval);
  }

  private addLog(level: LogEntry['level'], message: string, metadata?: Record<string, unknown>): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    };

    this.logs.push(entry);
    console.log(`[${entry.level.toUpperCase()}] ${message}`, metadata);

    if (this.logs.length >= this.maxLogs) {
      this.flushLogs();
    }
  }

  public info(message: string, metadata?: Record<string, unknown>): void {
    this.addLog('info', message, metadata);
  }

  public warn(message: string, metadata?: Record<string, unknown>): void {
    this.addLog('warn', message, metadata);
  }

  public error(message: string, metadata?: Record<string, unknown>): void {
    this.addLog('error', message, metadata);
  }

  public debug(message: string, metadata?: Record<string, unknown>): void {
    this.addLog('debug', message, metadata);
  }

  private async flushLogs(): Promise<void> {
    if (this.logs.length === 0) return;

    const logsToSend = [...this.logs];
    this.logs = [];

    try {
      await api.post('/logs', { logs: logsToSend });
    } catch (error) {
      console.error('Failed to send logs:', error);
      // Восстанавливаем логи, которые не удалось отправить
      this.logs = [...logsToSend, ...this.logs];
    }
  }
}

export const logService = new LogService(); 