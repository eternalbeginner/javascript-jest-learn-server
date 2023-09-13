import { PrismaClient } from '@prisma/client';
import { env } from '.';

declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (env.isProduction) prisma = new PrismaClient({ log: ['error'] });
else {
  if (!(global as any).prisma) (global as any).prisma = new PrismaClient({ log: ['error'] });
  prisma = (global as any).prisma;
}

export { prisma };
