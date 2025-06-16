import React, { Component, ComponentType } from 'react';
import { performanceService } from '../services/monitoring/PerformanceService';

interface WithPerformanceMonitoringProps {
  componentName: string;
}

export function withPerformanceMonitoring<P extends object>(
  WrappedComponent: ComponentType<P>,
  componentName: string
) {
  return class WithPerformanceMonitoring extends Component<P & WithPerformanceMonitoringProps> {
    private renderCount = 0;
    private lastRenderTime = 0;

    componentDidMount() {
      this.measurePerformance('mount');
    }

    componentDidUpdate() {
      this.measurePerformance('update');
    }

    componentWillUnmount() {
      this.measurePerformance('unmount');
    }

    private measurePerformance(phase: 'mount' | 'update' | 'unmount') {
      const now = performance.now();
      const duration = now - this.lastRenderTime;
      this.lastRenderTime = now;

      performanceService.recordMetric(`${componentName}.${phase}`, duration, {
        renderCount: ++this.renderCount,
        phase
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
} 