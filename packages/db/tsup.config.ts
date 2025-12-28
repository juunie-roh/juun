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
  esbuildOptions(options) {
    options.platform = "node";
  },
  format: ["cjs", "esm"],
  minify: true,
  target: "esnext",
  external: ["@prisma/client", "@prisma/adapter-pg", "pg"],
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    };
  },
  sourcemap: false,
  treeshake: true,
});
