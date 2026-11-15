// Health check routes
import express from 'express';
import { prisma } from '../database.js';
import { config } from '../config.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'mysql',
      databaseConnected: true,
      environment: config.env,
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'mysql',
      databaseConnected: false,
      error: error.message,
    });
  }
});

export default router;