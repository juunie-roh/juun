import storybook from 'eslint-plugin-storybook';
import { compat } from './util.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...compat.config(storybook.configs.recommended),
  {
    files: ['*.stories.*'],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },
];
