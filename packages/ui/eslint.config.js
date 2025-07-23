// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import {
  a11y,
  base,
  react,
  typescript,
  unitTest,
  prettier,
} from "@config/eslint";

export default [
  ...base,
  ...a11y,
  ...react,
  ...typescript,
  ...unitTest,
  ...prettier,
  ...storybook.configs["flat/recommended"],
];
