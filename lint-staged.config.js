export default {
  'src/**/*.+(ts|tsx)': [() => 'yarn tsc -p tsconfig.json --noEmit'],
  'apps/web/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p apps/web/tsconfig.json --noEmit',
  ],
  'packages/ui/**/*.+(ts|tsx)': [
    () => 'yarn tsc -p packages/ui/tsconfig.json --noEmit',
  ],
  '**/*.+(ts|tsx|js|jsx)': ['eslint --fix --cache'],
};
