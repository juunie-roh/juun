import tailwindcss from 'eslint-plugin-tailwindcss';

import config from '@juun/config/tailwind';

/** @type {import('eslint').Linter.Config[]} */
export default [
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
  ...tailwindcss.configs['flat/recommended'],
];
