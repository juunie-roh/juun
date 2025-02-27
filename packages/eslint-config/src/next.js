// @ts-ignore
import nextPlugin from '@next/eslint-plugin-next';
import { compat } from './util';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...compat.config(nextPlugin.configs.recommended),
  ...compat.config(nextPlugin.configs['core-web-vitals']),
];
