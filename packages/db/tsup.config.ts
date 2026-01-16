import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    "src/index.ts",
    "src/client.ts",
    "src/queries/post.ts",
    "src/queries/timeline.ts",
    "src/utils/test-connection.ts",
  ],
  external: ["@prisma/client", "@prisma/adapter-pg", "pg"],
  format: ["cjs", "esm"],
  minify: true,
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    };
  },
  platform: "neutral",
  sourcemap: false,
  target: "esnext",
  treeshake: true,
});
