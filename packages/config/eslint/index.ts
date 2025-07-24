import { Linter } from 'eslint';

import a11y from './src/a11y.ts';
import base from './src/base.ts';
import next from './src/next.ts';
import prettier from './src/prettier.ts';
import react from './src/react.ts';
import storybook from './src/storybook.ts';
import typescript from './src/typescript.ts';

export default [
  ...base,
  ...typescript,
  ...react,
  ...a11y,
  ...next,
  ...storybook,
  ...prettier,
] as Linter.Config[];

export { a11y, base, next, prettier, react, storybook, typescript };
