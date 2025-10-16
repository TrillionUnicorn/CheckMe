import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma.js';

const router = Router();

// In-memory storage for demo
const verifications: any[] = [];

// Validation schema
const verifySchema = z.object({
  type: z.enum(['email', 'phone', 'identity', 'document']),
  value: z.string().min(1)
});

// Email verification logic
function verifyEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  let riskScore = 100;
  if (email.includes('test') || email.includes('temp')) riskScore -= 20;
  if (email.endsWith('.ru') || email.endsWith('.cn')) riskScore -= 10;
  if (!email.includes('.')) riskScore -= 30;
  
  return {
    valid: isValid,
    riskScore: Math.max(0, Math.min(100, riskScore)),
    details: {
      format: isValid ? 'valid' : 'invalid',
      domain: email.split('@')[1] || 'unknown'
    }
  };
}

// Phone verification logic
function verifyPhone(phone: string) {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const isValid = phoneRegex.test(phone.replace(/[\s-()]/g, ''));
  
  const riskScore = isValid ? 85 : 30;
  
  return {
    valid: isValid,
    riskScore,
    details: {
      format: isValid ? 'valid' : 'invalid',
      country: phone.startsWith('+1') ? 'US' : 'unknown'
    }
  };
}

// Identity verification logic
function verifyIdentity(name: string) {
  const isValid = name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  
  const riskScore = isValid ? 75 : 20;
  
  return {
    valid: isValid,
    riskScore,
    details: {
      format: isValid ? 'valid' : 'invalid',
      length: name.length
    }
  };
}

// Document verification logic
function verifyDocument(docNumber: string) {
  const isValid = docNumber.length >= 5;
  
  const riskScore = isValid ? 80 : 25;
  
  return {
    valid: isValid,
    riskScore,
    details: {
      format: isValid ? 'valid' : 'invalid',
      length: docNumber.length
    }
  };
}

// Main verification endpoint
router.post('/', async (req, res) => {
  try {
    const { type, value } = verifySchema.parse(req.body);

    let result;
    switch (type) {
      case 'email':
        result = verifyEmail(value);
        break;
      case 'phone':
        result = verifyPhone(value);
        break;
      case 'identity':
        result = verifyIdentity(value);
        break;
      case 'document':
        result = verifyDocument(value);
        break;
      default:
        return res.status(400).json({ error: 'Invalid verification type' });
    }

    const verification = {
      id: crypto.randomUUID(),
      type,
      value,
      ...result,
      timestamp: new Date().toISOString()
    };

    // Try to save to database
    try {
      await prisma.verification.create({
        data: {
          type,
          inputData: { value },
          result: result,
          riskScore: result.riskScore,
          status: 'completed',
          completedAt: new Date(),
        },
      });
    } catch (dbError) {
      // Fallback to in-memory storage
      verifications.push(verification);
    }

    res.json({
      valid: result.valid,
      riskScore: result.riskScore,
      details: {
        type,
        value,
        timestamp: verification.timestamp,
        ...result.details
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get verification by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const verification = await prisma.verification.findUnique({
      where: { id },
    });

    if (!verification) {
      return res.status(404).json({ error: 'Verification not found' });
    }

    res.json(verification);
  } catch (dbError) {
    // Fallback to in-memory storage
    const verification = verifications.find(v => v.id === id);
    if (!verification) {
      return res.status(404).json({ error: 'Verification not found' });
    }
    res.json(verification);
  }
});

// List verifications
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = parseInt(req.query.offset as string) || 0;

  try {
    const results = await prisma.verification.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      verifications: results,
      limit,
      offset
    });
  } catch (dbError) {
    // Fallback to in-memory storage
    const results = verifications.slice(offset, offset + limit);
    res.json({
      verifications: results,
      limit,
      offset
    });
  }
});

export default router;

