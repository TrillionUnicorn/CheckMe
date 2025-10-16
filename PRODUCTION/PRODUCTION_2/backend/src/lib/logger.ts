/**
 * Production Logger
 * Structured logging with multiple transports
 */

import { Request, Response, NextFunction } from 'express';

// Log levels
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

// Log entry interface
interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: Error;
}

/**
 * Logger class
 */
class Logger {
  private serviceName: string;
  private environment: string;

  constructor(serviceName: string = 'checkme-api') {
    this.serviceName = serviceName;
    this.environment = process.env.NODE_ENV || 'development';
  }

  /**
   * Format log entry
   */
  private formatLog(entry: LogEntry): string {
    const formatted = {
      service: this.serviceName,
      environment: this.environment,
      level: entry.level,
      message: entry.message,
      timestamp: entry.timestamp,
      ...entry.context,
    };

    if (entry.error) {
      formatted.error = {
        message: entry.error.message,
        stack: entry.error.stack,
        name: entry.error.name,
      };
    }

    return JSON.stringify(formatted);
  }

  /**
   * Write log
   */
  private write(entry: LogEntry) {
    const formatted = this.formatLog(entry);

    // In production, send to logging service (e.g., Datadog, CloudWatch)
    if (this.environment === 'production') {
      // Send to external logging service
      // Example: datadog.log(formatted);
    }

    // Console output
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(formatted);
        break;
      case LogLevel.WARN:
        console.warn(formatted);
        break;
      case LogLevel.INFO:
        console.info(formatted);
        break;
      case LogLevel.DEBUG:
        console.debug(formatted);
        break;
    }
  }

  /**
   * Log error
   */
  error(message: string, error?: Error, context?: Record<string, any>) {
    this.write({
      level: LogLevel.ERROR,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    });
  }

  /**
   * Log warning
   */
  warn(message: string, context?: Record<string, any>) {
    this.write({
      level: LogLevel.WARN,
      message,
      timestamp: new Date().toISOString(),
      context,
    });
  }

  /**
   * Log info
   */
  info(message: string, context?: Record<string, any>) {
    this.write({
      level: LogLevel.INFO,
      message,
      timestamp: new Date().toISOString(),
      context,
    });
  }

  /**
   * Log debug
   */
  debug(message: string, context?: Record<string, any>) {
    if (this.environment === 'development') {
      this.write({
        level: LogLevel.DEBUG,
        message,
        timestamp: new Date().toISOString(),
        context,
      });
    }
  }
}

// Create singleton instance
export const logger = new Logger();

/**
 * Request logging middleware
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  // Log request
  logger.info('Incoming request', {
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  // Log response
  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.info('Request completed', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
    });
  });

  next();
}

/**
 * Error logging middleware
 */
export function errorLogger(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('Request error', err, {
    method: req.method,
    path: req.path,
    ip: req.ip,
    body: req.body,
  });

  next(err);
}

/**
 * Performance monitoring
 */
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  /**
   * Record metric
   */
  record(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  /**
   * Get statistics
   */
  getStats(name: string) {
    const values = this.metrics.get(name) || [];
    if (values.length === 0) {
      return null;
    }

    const sorted = [...values].sort((a, b) => a - b);
    const sum = values.reduce((a, b) => a + b, 0);

    return {
      count: values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg: sum / values.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  }

  /**
   * Clear metrics
   */
  clear() {
    this.metrics.clear();
  }
}

export const performanceMonitor = new PerformanceMonitor();

/**
 * Performance monitoring middleware
 */
export function performanceMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    performanceMonitor.record(`${req.method} ${req.path}`, duration);

    // Log slow requests
    if (duration > 1000) {
      logger.warn('Slow request detected', {
        method: req.method,
        path: req.path,
        duration,
      });
    }
  });

  next();
}

export default logger;

