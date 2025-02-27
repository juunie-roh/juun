import storybook from 'eslint-plugin-storybook';
import { compat } from './util';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['*.stories.*'],
    ...compat.config(storybook.configs.recommended),
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
