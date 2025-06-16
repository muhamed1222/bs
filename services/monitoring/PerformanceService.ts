import { api } from '../api';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
  context?: Record<string, any>;
}

export class PerformanceService {
  private static instance: PerformanceService;
  private metrics: PerformanceMetric[] = [];
  private readonly BATCH_SIZE = 10;
  private readonly FLUSH_INTERVAL = 60000; // 1 минута

  private constructor() {
    setInterval(() => this.flushMetrics(), this.FLUSH_INTERVAL);
    window.addEventListener('beforeunload', () => this.flushMetrics());
  }

  public static getInstance(): PerformanceService {
    if (!PerformanceService.instance) {
      PerformanceService.instance = new PerformanceService();
    }
    return PerformanceService.instance;
  }

  public measure(name: string, fn: () => void, context?: Record<string, any>): void {
    const start = performance.now();
    try {
      fn();
    } finally {
      const duration = performance.now() - start;
      this.recordMetric(name, duration, context);
    }
  }

  public async measureAsync<T>(
    name: string,
    fn: () => Promise<T>,
    context?: Record<string, any>
  ): Promise<T> {
    const start = performance.now();
    try {
      return await fn();
    } finally {
      const duration = performance.now() - start;
      this.recordMetric(name, duration, context);
    }
  }

  private recordMetric(name: string, value: number, context?: Record<string, any>): void {
    this.metrics.push({
      name,
      value,
      timestamp: new Date().toISOString(),
      context
    });

    if (this.metrics.length >= this.BATCH_SIZE) {
      this.flushMetrics();
    }
  }

  private async flushMetrics(): Promise<void> {
    if (this.metrics.length === 0) return;

    const metricsToSend = [...this.metrics];
    this.metrics = [];

    try {
      await api.post('/analytics/performance', {
        metrics: metricsToSend,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to send performance metrics:', error);
      // Возвращаем метрики в очередь при ошибке
      this.metrics = [...metricsToSend, ...this.metrics];
    }
  }
}

export const performanceService = PerformanceService.getInstance(); 