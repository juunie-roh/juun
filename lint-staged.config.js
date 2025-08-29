/** @type {import('lint-staged').Configuration} */
export default {
  "apps/web/**/*.+(js|jsx|ts|tsx)": [
    // type check & lint
    (filenames) =>
      `pnpm --filter @app/nextjs eslint --fix --cache ${filenames.join(" ")}`,
  ],
  "packages/ui/**/*.+(js|jsx|ts|tsx)": [
    // type check & lint
    (filenames) =>
      `pnpm --filter @juun/ui eslint --fix --cache ${filenames.join(" ")}`,
  ],
  "**/*.+(yml|yaml)": ["yamllint"],
};
