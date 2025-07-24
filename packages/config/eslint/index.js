import a11y from './src/a11y.js';
import base from './src/base.js';
import next from './src/next.js';
import prettier from './src/prettier.js';
import react from './src/react.js';
import storybook from './src/storybook.js';
import typescript from './src/typescript.js';

export default [
  ...base,
  ...typescript,
  ...react,
  ...a11y,
  ...next,
  ...storybook,
  ...prettier,
];

export { a11y, base, next, prettier, react, storybook, typescript };
