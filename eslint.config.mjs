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
    settings: {
      next: {
        rootDir: ".",
      },
    },
    plugins: {
      "@next/next": nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off"
    }
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
          endOfLine: "auto",
          semi: true,
          trailingComma: "es5",
          tabWidth: 2,
          printWidth: 100
        }
      ]
    }
  },

  // Global settings
  {
    ignores: [
      ".next/*",
      "node_modules/*", 
      ".yarn/*",
      "coverage/*",
      "dist/*",
      "build/*",
      "out/*"
    ]
  },

  // Base JS/TS configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      prettier: prettierPlugin
    },
    rules: {
      "import/extensions": "off",
      "no-param-reassign": "off",
      "no-underscore-dangle": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn"
    }
  },

  // TypeScript specific configuration
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "unused-imports": unusedImportsPlugin,
      tailwindcss: tailwindPlugin,
      "simple-import-sort": simpleImportSortPlugin
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    settings: {
      tailwindcss: {
        config: "tailwind.config.js",
        cssFiles: ["**/*.css", "**/*.scss"],
        whitelist: []
      }
    },
    rules: {
      // React
      "react/function-component-definition": "off",
      "react/destructuring-assignment": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      
      // TypeScript
      "@typescript-eslint/comma-dangle": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-use-before-define": ["error", { 
        "functions": false,
        "classes": true,
        "variables": true,
        "typedefs": true
      }],
      
      // Imports
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "import/order": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
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
      "consistent-return": "off",
      "max-len": ["error", { 
        "code": 100,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }]
    }
  },

  // Testing configuration
  {
    files: ["**/*.test.*", "**/*.spec.*"],
    plugins: {
      jest: jestPlugin
    },
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals
      }
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/valid-expect": "error"
    }
  },

  // Playwright E2E testing
  {
    files: ["**/*.spec.ts"],
    plugins: {
      playwright: playwrightPlugin
    },
    rules: {
      ...playwrightPlugin.configs.recommended.rules
    }
  },

  // Storybook configuration
  {
    files: ["*.stories.*"],
    plugins: {
      storybook: storybookPlugin
    },
    rules: {
      ...storybookPlugin.configs.recommended.rules,
      "import/no-extraneous-dependencies": ["error", {
        "devDependencies": true
      }]
    }
  }
];