import eslint from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-plugin-prettier';
import turbo from 'eslint-plugin-turbo';

export const baseRules = {
  'import/extensions': 'off',
  'no-param-reassign': 'off',
  'no-underscore-dangle': 'off',
  'prettier/prettier': [
    'error',
    {
      singleQuote: false,
      endOfLine: 'auto',
    },
  ],
};

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...eslint.configs.recommended,
    plugins: {
      jsdoc,
      prettier,
      turbo,
    },
    rules: baseRules,
  },
];
