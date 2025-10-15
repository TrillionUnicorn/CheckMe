import { Hono } from 'hono';
import { z } from 'zod';
import sql from '../db/index';

const app = new Hono();

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
  
  // Simple risk scoring
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
  
  let riskScore = isValid ? 85 : 30;
  
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
  
  let riskScore = isValid ? 75 : 20;
  
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
  
  let riskScore = isValid ? 80 : 25;
  
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
app.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { type, value } = verifySchema.parse(body);

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
        return c.json({ error: 'Invalid verification type' }, 400);
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
      await sql`
        INSERT INTO verifications (type, input_data, result, risk_score, status, completed_at)
        VALUES (
          ${type},
          ${JSON.stringify({ value })},
          ${JSON.stringify(result)},
          ${result.riskScore},
          'completed',
          NOW()
        )
      `;
    } catch (dbError) {
      // Fallback to in-memory storage
      verifications.push(verification);
    }

    return c.json({
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
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    console.error('Verification error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get verification by ID
app.get('/:id', async (c) => {
  const id = c.req.param('id');

  try {
    const [verification] = await sql`
      SELECT * FROM verifications WHERE id = ${id}
    `;

    if (!verification) {
      return c.json({ error: 'Verification not found' }, 404);
    }

    return c.json(verification);
  } catch (dbError) {
    // Fallback to in-memory storage
    const verification = verifications.find(v => v.id === id);
    if (!verification) {
      return c.json({ error: 'Verification not found' }, 404);
    }
    return c.json(verification);
  }
});

// List verifications
app.get('/', async (c) => {
  const limit = parseInt(c.req.query('limit') || '10');
  const offset = parseInt(c.req.query('offset') || '0');

  try {
    const results = await sql`
      SELECT * FROM verifications
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return c.json({
      verifications: results,
      limit,
      offset
    });
  } catch (dbError) {
    // Fallback to in-memory storage
    const results = verifications.slice(offset, offset + limit);
    return c.json({
      verifications: results,
      limit,
      offset
    });
  }
});

export default app;

