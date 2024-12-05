import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import jestPlugin from "eslint-plugin-jest";
import playwrightPlugin from "eslint-plugin-playwright";
import storybookPlugin from "eslint-plugin-storybook";

/** @type {import('eslint').Flat.Config[]} */
export default [
  // Base ESLint config
  js.configs.recommended,
  // Next.js config
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...nextPlugin.configs["core-web-vitals"],
    ...nextPlugin.configs.typescript
  },
  // Prettier config
  prettierConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          endOfLine: "auto"
        }
      ]
    }
  },

  // Global settings
  {
    ignores: [".next/*", "node_modules/*", ".yarn/*"]
  },

  // Base JS/TS configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "prettier": prettierPlugin
    },
    rules: {
      "import/extensions": "off",
      "no-param-reassign": "off",
      "no-underscore-dangle": "off",
      "prettier/prettier": ["error", {
        singleQuote: true,
        endOfLine: "auto"
      }]
    }
  },

  // TypeScript specific configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "unused-imports": unusedImportsPlugin,
      "tailwindcss": tailwindPlugin,
      "simple-import-sort": simpleImportSortPlugin
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    settings: {
      tailwindcss: {
        config: "tailwind.config.js"
      }
    },
    rules: {
      // Prettier
      "prettier/prettier": ["error", {
        singleQuote: true,
        endOfLine: "auto"
      }],
      
      // React
      "react/function-component-definition": "off",
      "react/destructuring-assignment": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      
      // TypeScript
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
      
      // Imports
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "import/order": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_" 
      }],
      
      // General
      "no-restricted-syntax": [
        "error",
        "ForInStatement",
        "LabeledStatement",
        "WithStatement"
      ],
      "no-param-reassign": "off",
      "no-underscore-dangle": "off",
      "consistent-return": "off"
    }
  },

  // Testing configuration
  {
    files: ["tests/**/*, *.test.*"],
    plugins: {
      jest: jestPlugin
    },
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals
      }
    }
  },

  // Playwright E2E testing
  {
    files: ["**/*.spec.ts"],
    ...playwrightPlugin.configs.recommended
  },

  // Storybook configuration
  {
    files: ["*.stories.*"],
    ...storybookPlugin.configs.recommended,
    rules: {
      "import/no-extraneous-dependencies": ["error", {
        "devDependencies": true
      }]
    }
  }
];