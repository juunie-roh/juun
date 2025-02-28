import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Prettier config (should always be last)
  eslintConfigPrettier,
];
