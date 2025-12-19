// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import {
  a11y,
  base,
  react,
  typescript,
  prettier,
  defineConfig,
} from "@config/eslint";

export default defineConfig([
  ...base,
  ...a11y,
  ...react,
  ...typescript,
  ...prettier,
  ...storybook.configs["flat/recommended"],
]);
