/**
 * Rate Limiting Middleware
 * Protects API from abuse and DDoS attacks
 */

import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Rate limit configurations
export const RATE_LIMITS = {
  // General API
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
  },
  // Authentication endpoints
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
  },
  // Verification endpoints
  verify: {
    windowMs: 60 * 1000, // 1 minute
    max: 10, // 10 verifications per minute
  },
  // Strict rate limit for sensitive operations
  strict: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 attempts per hour
  },
};

/**
 * Create rate limiter middleware
 */
export function createRateLimiter(options: {
  windowMs: number;
  max: number;
  message?: string;
  keyGenerator?: (req: Request) => string;
}) {
  const {
    windowMs,
    max,
    message = 'Too many requests, please try again later',
    keyGenerator = (req) => req.ip || 'unknown',
  } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();

    // Initialize or get existing record
    if (!store[key] || store[key].resetTime < now) {
      store[key] = {
        count: 0,
        resetTime: now + windowMs,
      };
    }

    // Increment count
    store[key].count++;

    // Check if limit exceeded
    if (store[key].count > max) {
      const retryAfter = Math.ceil((store[key].resetTime - now) / 1000);

      res.setHeader('Retry-After', retryAfter);
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', 0);
      res.setHeader('X-RateLimit-Reset', store[key].resetTime);

      return res.status(429).json({
        error: message,
        retryAfter,
      });
    }

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', max - store[key].count);
    res.setHeader('X-RateLimit-Reset', store[key].resetTime);

    next();
  };
}

/**
 * API rate limiter
 */
export const apiLimiter = createRateLimiter(RATE_LIMITS.api);

/**
 * Auth rate limiter
 */
export const authLimiter = createRateLimiter({
  ...RATE_LIMITS.auth,
  message: 'Too many authentication attempts, please try again later',
});

/**
 * Verification rate limiter
 */
export const verifyLimiter = createRateLimiter({
  ...RATE_LIMITS.verify,
  message: 'Too many verification requests, please slow down',
});

/**
 * Strict rate limiter
 */
export const strictLimiter = createRateLimiter({
  ...RATE_LIMITS.strict,
  message: 'Too many attempts, please try again in an hour',
});

/**
 * Clean up expired entries (run periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}

// Clean up every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);

export default {
  createRateLimiter,
  apiLimiter,
  authLimiter,
  verifyLimiter,
  strictLimiter,
};

