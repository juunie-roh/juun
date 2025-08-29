import { registerOTel } from "@vercel/otel";

export function register() {
  console.log("🔍 OpenTelemetry instrumentation starting...");
  registerOTel("next-app");
  console.log("✅ OpenTelemetry registered successfully");

  // Log environment variables to verify config
  console.log("OTEL Config:", {
    exporter: process.env.OTEL_TRACES_EXPORTER,
    logLevel: process.env.OTEL_LOG_LEVEL,
    serviceName: process.env.OTEL_SERVICE_NAME,
  });
}
