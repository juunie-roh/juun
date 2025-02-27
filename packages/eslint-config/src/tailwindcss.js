import tailwindcss from 'eslint-plugin-tailwindcss';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      tailwindcss: tailwindcss,
    },
    settings: {
      tailwindcss: {
        config: 'tailwind.config.ts',
      },
    },
  },
  ...tailwindcss.configs['flat/recommended'],
];
