import { compat } from './util';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...compat.config({
    extends: ['plugin/jsx-a11y/recommended'],
    plugins: ['jsx-a11y'],
    rules: {
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
    },
  }),
];
