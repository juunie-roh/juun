import eslint from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.RulesRecord} */
export const baseRules = {
  'import/extensions': 'off',
  'no-param-reassign': 'off',
  'no-underscore-dangle': 'off',
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      endOfLine: 'auto',
    },
  ],
};

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...eslint.configs.recommended,
    plugins: {
      prettier: prettierPlugin,
    },
    rules: baseRules,
  },
];
