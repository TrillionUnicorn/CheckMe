import { Hono } from 'hono';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sql from '../db/index';

const app = new Hono();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// In-memory storage for demo (fallback if DB not available)
const users: any[] = [];

// Validation schemas
const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

// Signup
app.post('/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, password } = signupSchema.parse(body);

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    try {
      // Try database first
      const [user] = await sql`
        INSERT INTO users (name, email, password_hash)
        VALUES (${name}, ${email}, ${passwordHash})
        RETURNING id, name, email, plan, created_at
      `;

      // Generate JWT
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '7d'
      });

      return c.json({
        user,
        token
      }, 201);
    } catch (dbError) {
      // Fallback to in-memory storage
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return c.json({ error: 'Email already exists' }, 400);
      }

      const user = {
        id: crypto.randomUUID(),
        name,
        email,
        passwordHash,
        plan: 'free',
        createdAt: new Date().toISOString()
      };

      users.push(user);

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '7d'
      });

      return c.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          plan: user.plan,
          created_at: user.createdAt
        },
        token
      }, 201);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    console.error('Signup error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Login
app.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = loginSchema.parse(body);

    try {
      // Try database first
      const [user] = await sql`
        SELECT id, name, email, password_hash, plan, created_at
        FROM users
        WHERE email = ${email}
      `;

      if (!user) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '7d'
      });

      return c.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          plan: user.plan,
          created_at: user.created_at
        },
        token
      });
    } catch (dbError) {
      // Fallback to in-memory storage
      const user = users.find(u => u.email === email);
      if (!user) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '7d'
      });

      return c.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          plan: user.plan,
          created_at: user.createdAt
        },
        token
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Validation error', details: error.errors }, 400);
    }
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Logout (client-side token removal)
app.post('/logout', (c) => {
  return c.json({ message: 'Logged out successfully' });
});

export default app;

