import { defineConfig } from "eslint/config";
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  ...storybook.configs['flat/recommended'],
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
]);
