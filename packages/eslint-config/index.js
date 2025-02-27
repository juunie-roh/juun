import a11y from './src/a11y.js';
import base from './src/base.js';
import next from './src/next.js';
import prettier from './src/prettier.js';
import react from './src/react.js';
import storybook from './src/storybook.js';
import tailwindcss from './src/tailwindcss.js';
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
  ...tailwindcss,
  ...prettier,
];

export { default as a11y } from './src/a11y.js';
export { default as base } from './src/base.js';
export { default as next } from './src/next.js';
export { default as prettier } from './src/prettier.js';
export { default as react } from './src/react.js';
export { default as storybook } from './src/storybook.js';
export { default as tailwindcss } from './src/tailwindcss.js';
export { default as unitTest } from './src/unit-test.js';
export { default as typescript } from './src/typescript.js';
