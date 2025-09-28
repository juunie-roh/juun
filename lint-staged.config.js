/** @type {import('lint-staged').Configuration} */
export default {
  "**/*.+(ts|tsx)": [() => "pnpm check-types"],
  "apps/web/**/*.+(js|jsx|ts|tsx)": [
    // type check & lint
    (filenames) =>
      `pnpm --filter @juun/web eslint --fix --cache ${filenames.join(" ")}`,
  ],
  "packages/ui/**/*.+(js|jsx|ts|tsx)": [
    // type check & lint
    (filenames) =>
      `pnpm --filter @juun/ui eslint --fix --cache ${filenames.join(" ")}`,
  ],
  "**/*.+(yml|yaml)": ["yamllint"],
};
