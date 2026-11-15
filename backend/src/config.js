// Central configuration - single source of truth for env vars
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ quiet: true });

function required(name, fallback) {
  const value = process.env[name];
  if (!value || value.startsWith('YOUR_')) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required env: ${name}`);
  }
  return value;
}

function positiveInt(name, fallback) {
  const parsed = Number.parseInt(process.env[name], 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: positiveInt('PORT', 3001),

  // Frontend origin for CORS
  frontendOrigin: required('FRONTEND_ORIGIN', 'http://localhost:5173'),

  // Email (optional)
  email: {
    enabled: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
    host: process.env.SMTP_HOST,
    port: positiveInt('SMTP_PORT', 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_TO || process.env.SMTP_USER,
  },

  // Database
  databaseUrl: required('DATABASE_URL', 'mysql://root@localhost:3306/portfolio'),
};

export function assertConfig() {
  const errors = [];
  if (!config.databaseUrl || !config.databaseUrl.startsWith('mysql:')) {
    errors.push('DATABASE_URL must be a MySQL connection string');
  }
  if (errors.length) {
    console.error('\nConfiguration errors:\n - ' + errors.join('\n - ') + '\n');
    process.exit(1);
  }
}