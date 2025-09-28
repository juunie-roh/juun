/** @type {import('lint-staged').Configuration} */
export default {
  "**/*.+(ts|tsx)": [() => "pnpm check-types"],
  "apps/web/**/*.+(js|jsx|ts|tsx)": [
    // type check & lint
    (filenames) => {
      const relativePaths = filenames.map((f) => f.replace(/^apps\/web\//, ""));
      return `pnpm --filter @juun/web exec eslint --fix --cache ${relativePaths.join(" ")}`;
    },
  ],
  "packages/ui/**/*.+(js|jsx|ts|tsx)": [
    // type check & lint
    (filenames) => {
      const relativePaths = filenames.map((f) =>
        f.replace(/^packages\/ui\//, ""),
      );
      return `pnpm --filter @juun/ui exec eslint --fix --cache ${relativePaths.join(" ")}`;
    },
  ],
  "**/*.+(yml|yaml)": ["yamllint"],
};
