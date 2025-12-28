import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/fetcher/index.ts", "src/react/index.ts"],
  esbuildOptions(options) {
    options.platform = "neutral";
  },
  format: ["cjs", "esm"],
  minify: true,
  target: "esnext",
  external: ["zod", "react", "@tanstack/react-query"],
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    };
  },
  sourcemap: false,
  treeshake: true,
});
