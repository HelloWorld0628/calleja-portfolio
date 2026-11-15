// Main server entry point
import express from 'express';
import cors from 'cors';
import { config, assertConfig } from './src/config.js';
import { checkDatabase, disconnect } from './src/utils/dbCheck.js';
import { notFoundHandler, errorHandler } from './src/middleware/errors.js';

// Route imports
import healthRoutes from './src/routes/health.js';
import contactRoutes from './src/routes/contact.js';
import adminRoutes from './src/routes/admin.js';

const app = express();
app.disable('x-powered-by');

// Security headers
app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
  });
  next();
});

// CORS
app.use(cors({
  origin: config.frontendOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Request logging (dev)
if (config.env !== 'production') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
    });
    next();
  });
}

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// 404 & error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Startup
async function start() {
  assertConfig();

  // Verify database
  const db = await checkDatabase();
  if (!db.ok) {
    console.error('\nDatabase not ready:', db.problem, '\n');
    process.exit(1);
  }

  const server = app.listen(config.port, () => {
    console.log(`\nServer running at http://localhost:${config.port}`);
    console.log(`Health check: http://localhost:${config.port}/api/health`);
    console.log(`Environment: ${config.env}\n`);
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down...`);
    server.close(async () => {
      await disconnect();
      console.log('Server stopped');
      process.exit(0);
    });
    // Force close after 10s
    setTimeout(() => {
      console.error('Forced shutdown');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start();

export default app;