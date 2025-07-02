import a11y from './src/a11y.js';
import base from './src/base.js';
import next from './src/next.js';
import prettier from './src/prettier.js';
import react from './src/react.js';
import storybook from './src/storybook.js';
import unitTest from './src/unit-test.js';
import typescript from './src/typescript.js';

export default [
  ...base,
  ...typescript,
  ...react,
  ...a11y,
  ...next,
  ...unitTest,
  ...storybook,
  ...prettier,
];

export { a11y, base, next, prettier, react, storybook, unitTest, typescript };
