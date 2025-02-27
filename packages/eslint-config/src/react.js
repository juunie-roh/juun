import { compat } from './util';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...compat.config({
    extends: ['plugin/react/recommended', 'plugin:react-hooks/recommended'],
    plugins: ['react', 'react-hooks'],
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'react/prop-types': 'off', // Not needed with TypeScript
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  }),
];
