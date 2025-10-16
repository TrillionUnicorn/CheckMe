/**
 * Authentication Middleware
 * JWT verification and protected routes
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role?: string;
      };
    }
  }
}

/**
 * Verify JWT token
 */
export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role?: string;
    };

    // Check if user exists
    try {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, email: true, plan: true },
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      // Attach user to request
      req.user = {
        userId: user.id,
        email: user.email,
        role: user.plan,
      };

      next();
    } catch (dbError) {
      // Fallback if database not available
      req.user = decoded;
      next();
    }
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(500).json({ error: 'Authentication failed' });
  }
}

/**
 * Optional authentication (doesn't fail if no token)
 */
export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role?: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    // Continue without user
    next();
  }
}

/**
 * Require specific role
 */
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!req.user.role || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

/**
 * Require plan level
 */
export function requirePlan(...plans: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!req.user.role || !plans.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Upgrade required',
        requiredPlans: plans,
      });
    }

    next();
  };
}

/**
 * Check if user owns resource
 */
export function requireOwnership(resourceIdParam: string = 'id') {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const resourceId = req.params[resourceIdParam];

    try {
      // Check ownership based on resource type
      // This is a generic example - customize based on your needs
      const resource = await prisma.verification.findUnique({
        where: { id: resourceId },
        select: { userId: true },
      });

      if (!resource || resource.userId !== req.user.userId) {
        return res.status(403).json({ error: 'Access denied' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: 'Authorization check failed' });
    }
  };
}

/**
 * API Key authentication
 */
export async function authenticateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }

    // Verify API key
    try {
      const keyRecord = await prisma.apiKey.findUnique({
        where: { keyHash: apiKey },
        include: { user: true },
      });

      if (!keyRecord) {
        return res.status(401).json({ error: 'Invalid API key' });
      }

      // Update last used
      await prisma.apiKey.update({
        where: { id: keyRecord.id },
        data: { lastUsedAt: new Date() },
      });

      // Attach user to request
      req.user = {
        userId: keyRecord.user.id,
        email: keyRecord.user.email,
        role: keyRecord.user.plan,
      };

      next();
    } catch (dbError) {
      return res.status(500).json({ error: 'API key verification failed' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Authentication failed' });
  }
}

export default {
  authenticateToken,
  optionalAuth,
  requireRole,
  requirePlan,
  requireOwnership,
  authenticateApiKey,
};

