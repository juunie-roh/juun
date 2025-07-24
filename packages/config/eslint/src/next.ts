import nextPlugin from '@next/eslint-plugin-next';
import { safeLegacyConfig } from './util.ts';
import { Linter } from 'eslint';

export default [
  ...safeLegacyConfig(nextPlugin.configs.recommended),
  ...safeLegacyConfig(nextPlugin.configs['core-web-vitals']),
] satisfies Linter.Config[];
