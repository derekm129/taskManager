import { PrismaClient } from "@prisma/client"; // adjust path if generated elsewhere

// Declare globalThis.prisma to avoid TS errors in dev
declare global {
  var prisma: PrismaClient | undefined;
}

// Use a single instance to prevent multiple connections in dev
export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query", "warn", "error"],
  });

// Cache the instance in dev
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;