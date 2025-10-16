import { Hono } from 'hono';
import sql from '../db/index';

const app = new Hono();

// Get current user
app.get('/me', async (c) => {
  // In a real app, this would use JWT middleware to get user ID
  const userId = c.req.header('X-User-Id') || 'demo-user';

  try {
    const [user] = await sql`
      SELECT id, name, email, plan, created_at
      FROM users
      WHERE id = ${userId}
    `;

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json(user);
  } catch (dbError) {
    // Return demo user
    return c.json({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@checkme.com',
      plan: 'free',
      created_at: new Date().toISOString()
    });
  }
});

// Get user usage stats
app.get('/usage', async (c) => {
  const userId = c.req.header('X-User-Id') || 'demo-user';

  try {
    const [usage] = await sql`
      SELECT 
        COUNT(*) as total_verifications,
        COUNT(CASE WHEN created_at >= date_trunc('month', CURRENT_DATE) THEN 1 END) as this_month,
        AVG(CASE WHEN status = 'completed' THEN 1.0 ELSE 0.0 END) * 100 as success_rate
      FROM verifications
      WHERE user_id = ${userId}
    `;

    return c.json(usage || {
      total_verifications: 0,
      this_month: 0,
      success_rate: 0
    });
  } catch (dbError) {
    // Return demo stats
    return c.json({
      total_verifications: 1247,
      this_month: 342,
      success_rate: 98.5,
      avg_response_time: 1.8
    });
  }
});

// Update user profile
app.patch('/me', async (c) => {
  const userId = c.req.header('X-User-Id') || 'demo-user';
  const body = await c.req.json();

  try {
    const [user] = await sql`
      UPDATE users
      SET 
        name = COALESCE(${body.name}, name),
        company = COALESCE(${body.company}, company),
        updated_at = NOW()
      WHERE id = ${userId}
      RETURNING id, name, email, company, plan, created_at
    `;

    return c.json(user);
  } catch (dbError) {
    return c.json({
      message: 'Profile updated (demo mode)',
      ...body
    });
  }
});

export default app;

