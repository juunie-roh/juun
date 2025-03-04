import {
  a11y,
  base,
  react,
  typescript,
  storybook,
  unitTest,
  prettier,
} from '@juun/config/eslint';

export default [
  ...base,
  ...a11y,
  ...react,
  ...typescript,
  ...storybook,
  ...unitTest,
  ...prettier,
];
