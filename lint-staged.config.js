/** @type {import('lint-staged').Configuration} */
export default {
  "apps/web/**/*.+(ts|tsx)": [
    () => "pnpm tsc -p apps/web/tsconfig.json --noEmit",
  ],
  "packages/next-mdx/**/*.+(ts|tsx)": [
    () => "pnpm tsc -p packages/next-mdx/tsconfig.json --noEmit",
  ],
  "packages/ui/**/*.+(ts|tsx)": [
    () => "pnpm tsc -p packages/ui/tsconfig.json --noEmit",
  ],
  "**/*.+(ts|tsx|js|jsx)": ["eslint --fix --cache"],
  "**/*.+(yml|yaml)": ["yamllint"],
};
