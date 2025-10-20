import { prisma } from "../client";

export async function testConnection() {
  try {
    // Test connection
    const result =
      await prisma.$queryRaw`SELECT NOW() as current_time, version() as pg_version`;

    return {
      success: true,
      message: "Database package connected successfully",
      result,
    };
  } catch (error) {
    return {
      success: false,
      error: String(error),
    };
  } finally {
    await prisma.$disconnect();
  }
}
