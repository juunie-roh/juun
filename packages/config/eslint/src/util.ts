import { fileURLToPath } from 'url';
import path from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import type { Linter } from 'eslint';

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);

export const compat = new FlatCompat({
  baseDirectory: _dirname,
});

export function convertPluginConfig(pluginConfig: any): Linter.Config[] {
  const flatConfig = compat.config(pluginConfig);

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '🚀 ~ convertPluginConfig ~ Converted config structure:',
      JSON.stringify(flatConfig, null, 2),
    );
  }

  return flatConfig;
}

// Type-safe wrapper for legacy configs
export function safeLegacyConfig(config: unknown): Linter.Config[] {
  return compat.config(config as Linter.LegacyConfig);
}
