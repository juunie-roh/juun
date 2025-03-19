import tailwindcss from 'eslint-plugin-tailwindcss';

import config from '@pkg/config/tailwind';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tailwindcss.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      tailwindcss: tailwindcss,
    },
    settings: {
      tailwindcss: {
        config: config,
      },
    },
  },
];
