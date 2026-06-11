import { defineConfig } from 'eslint/config';
import base from './src/base.js';
import next from './src/next.js';
import prettier from './src/prettier.js';
import react from './src/react.js';
import storybook from './src/storybook.js';
import typescript from './src/typescript.js';

export default defineConfig([
  ...base,
  ...typescript,
  ...react,
  ...next,
  ...storybook,
  ...prettier,
]);

export { defineConfig, base, next, prettier, react, storybook, typescript };
