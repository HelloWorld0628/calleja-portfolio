// Database connection verification using Prisma
import { prisma } from '../database.js';

export async function checkDatabase() {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    return { ok: false, problem: `Cannot connect to database: ${error.message}` };
  }

  return { ok: true };
}

export async function disconnect() {
  await prisma.$disconnect();
}