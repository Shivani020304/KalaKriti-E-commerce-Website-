import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
