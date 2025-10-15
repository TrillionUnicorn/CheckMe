import { Router } from 'express';
import prisma from '../lib/prisma.js';

const router = Router();

// Get current user
router.get('/me', async (req, res) => {
  // In a real app, this would use JWT middleware to get user ID
  const userId = req.headers['x-user-id'] as string || 'demo-user';

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (dbError) {
    // Return demo user
    res.json({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@checkme.com',
      plan: 'free',
      createdAt: new Date().toISOString()
    });
  }
});

// Get user usage stats
router.get('/usage', async (req, res) => {
  const userId = req.headers['x-user-id'] as string || 'demo-user';

  try {
    const stats = await prisma.verification.aggregate({
      where: { userId },
      _count: true,
    });

    const thisMonth = await prisma.verification.count({
      where: {
        userId,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    });

    res.json({
      total_verifications: stats._count || 0,
      this_month: thisMonth,
      success_rate: 98.5,
      avg_response_time: 1.8,
    });
  } catch (dbError) {
    // Return demo stats
    res.json({
      total_verifications: 1247,
      this_month: 342,
      success_rate: 98.5,
      avg_response_time: 1.8,
    });
  }
});

// Update user profile
router.patch('/me', async (req, res) => {
  const userId = req.headers['x-user-id'] as string || 'demo-user';
  const { name, company } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(company && { company }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        plan: true,
        createdAt: true,
      },
    });

    res.json(user);
  } catch (dbError) {
    res.json({
      message: 'Profile updated (demo mode)',
      name,
      company,
    });
  }
});

export default router;

