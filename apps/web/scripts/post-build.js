#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(__dirname, "..");

console.log(
  "📦 Post-build: Copying static assets for standalone deployment...",
);

try {
  // Define source and destination paths
  const staticSrc = resolve(appRoot, ".next/static");
  const staticDest = resolve(appRoot, ".next/standalone/apps/web/.next/static");

  const publicSrc = resolve(appRoot, "public");
  const publicDest = resolve(appRoot, ".next/standalone/apps/web/public");

  // Check if standalone build exists
  if (!existsSync(resolve(appRoot, ".next/standalone"))) {
    console.log(
      '❌ Standalone build not found. Make sure output: "standalone" is set in next.config.ts',
    );
    process.exit(1);
  }

  // Ensure destination directories exist
  mkdirSync(dirname(staticDest), { recursive: true });
  mkdirSync(dirname(publicDest), { recursive: true });

  // Copy .next/static to standalone location
  if (existsSync(staticSrc)) {
    console.log("📁 Copying .next/static...");
    cpSync(staticSrc, staticDest, { recursive: true });
    console.log("✅ Static assets copied successfully");
  } else {
    console.log("⚠️  .next/static directory not found");
  }

  // Copy public folder to standalone location
  if (existsSync(publicSrc)) {
    console.log("📁 Copying public folder...");
    cpSync(publicSrc, publicDest, { recursive: true });
    console.log("✅ Public assets copied successfully");
  } else {
    console.log("⚠️  Public directory not found");
  }

  console.log("🎉 Post-build complete! Standalone deployment is ready.");
} catch (error) {
  console.error("❌ Post-build failed:", error.message);
  process.exit(1);
}
