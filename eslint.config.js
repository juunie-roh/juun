import config from '@config/eslint';

/** @type {import('eslint').Linter.Config[]} */
const extendedConfig = [
  ...config,
  {
    ignores: ['apps/*', 'packages/*'],
  },
];

export default extendedConfig;
