import { defineConfig } from "eslint/config";
import base from "@config/eslint/base.js";
import typescript from "@config/eslint/typescript.js";
import react from "@config/eslint/react.js";
import reactNative from "@config/eslint/react-native.js";
import prettier from "@config/eslint/prettier.js";

export default defineConfig([
  ...base,
  ...typescript,
  ...react,
  ...reactNative,
  ...prettier,
]);
