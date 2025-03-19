import {
  a11y,
  base,
  react,
  typescript,
  storybook,
  unitTest,
  prettier,
} from '@pkg/config/eslint';

export default [
  ...base,
  ...a11y,
  ...react,
  ...typescript,
  ...storybook,
  ...unitTest,
  ...prettier,
];
