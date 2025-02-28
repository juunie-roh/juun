export default {
  '*.+(ts|tsx)': [() => 'yarn tsc -p tsconfig.json --noEmit'],
  '**/*.+(ts|tsx|js|jsx)': ['eslint --fix'],
};
