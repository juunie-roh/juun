/** @type {import('lint-staged').Configuration} */
export default {
  "**/*.+(ts|tsx)": [() => "pnpm check-types"],
  "apps/web/**/*.+(js|jsx|ts|tsx)": [
    (filenames) => {
      // lint-staged passes absolute paths, convert to relative from package root
      const relativePaths = filenames.map((f) => {
        // Remove absolute path up to and including "apps/web/"
        const match = f.match(/apps\/web\/(.+)$/);
        return match ? match[1] : f;
      });
      return `pnpm --filter @juun/web exec eslint --fix --cache ${relativePaths.join(" ")}`;
    },
  ],
  "packages/api/**/*.+(js|jsx|ts|tsx)": [
    (filenames) => {
      const relativePaths = filenames.map((f) => {
        const match = f.match(/packages\/api\/(.+)$/);
        return match ? match[1] : f;
      });
      return `pnpm --filter @juun/api exec eslint --fix --cache ${relativePaths.join(" ")}`;
    },
  ],
  "packages/db/**/*.+(js|jsx|ts|tsx)": [
    (filenames) => {
      const relativePaths = filenames.map((f) => {
        const match = f.match(/packages\/db\/(.+)$/);
        return match ? match[1] : f;
      });
      return `pnpm --filter @juun/db exec eslint --fix --cache ${relativePaths.join(" ")}`;
    },
  ],
  "**/*.+(yml|yaml)": ["yamllint"],
};
