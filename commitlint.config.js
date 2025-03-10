import { RuleConfigSeverity } from '@commitlint/types';

/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'body-max-line-length': [RuleConfigSeverity.Warning, 'always', 100],
    'scope-enum': [
      RuleConfigSeverity.Error, // Changed to Error for stricter enforcement
      'always',
      [
        // Component-related
        'component',
        'story',
        'hook',
        'store',
        'util',
        'api',
        'ui',

        // Refactoring codes - more professional naming
        'refactor-major',
        'refactor-cleanup',
        'refactor-performance',

        // External
        'asset',
        'package',
        'deps',

        // Documentation
        'docs',
        'readme',

        // Settings
        'config',
        'workflow',
        'ci',

        // Localization
        'i18n',

        // Testing
        'test',
        'e2e',

        // Others
        'breaking',
        'security',
        'accessibility',
        'types',
      ],
    ],
    'subject-case': [RuleConfigSeverity.Warning, 'always', 'sentence-case'],
  },
  /** @type {import('@commitlint/types').UserPromptConfig} */
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description:
              'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description:
              'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description:
              'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description:
              'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)',
        messages: {},
        enum: {
          component: {
            description: 'Changes on components',
            title: 'Components',
          },
          story: {
            description: 'Adding or updating storybook components',
            title: 'Storybook',
          },
          hook: {
            description: 'Changes on react custom hooks',
            title: 'Custom Hooks',
          },
          store: {
            description: 'Changes on state managements',
            title: 'Store',
          },
          util: {
            description: 'Adding or correcting utilities',
            title: 'Utilities',
          },
          api: {
            description: 'Changes on service API',
            title: 'API',
          },
          ui: {
            description: 'Changes to UI components',
            title: 'UI',
          },

          'refactor-major': {
            description: 'Major refactoring changes',
            title: 'Major Refactoring',
          },
          'refactor-cleanup': {
            description: 'Code cleanup and simplification',
            title: 'Code Cleanup',
          },
          'refactor-performance': {
            description: 'Performance-focused refactoring',
            title: 'Performance Refactoring',
          },

          asset: {
            description: 'Changes on assets of the project',
            title: 'Assets',
          },
          package: {
            description: 'Changes on node packages',
            title: 'Packages',
          },
          deps: {
            description: 'Dependency updates',
            title: 'Dependencies',
          },

          docs: {
            description: 'Documentation changes',
            title: 'Documentation',
          },
          readme: {
            description: 'Changes on README.md',
            title: 'README',
          },

          config: {
            description: 'Changes on configurations for this project',
            title: 'Configurations',
          },
          workflow: {
            description: 'Updates on workflows',
            title: 'Workflows',
          },
          ci: {
            description: 'Changes to CI configuration',
            title: 'CI',
          },

          i18n: {
            description: 'Internationalization and localization',
            title: 'i18n',
          },

          test: {
            description: 'Changes to tests',
            title: 'Tests',
          },
          e2e: {
            description: 'End-to-end testing',
            title: 'E2E Tests',
          },

          breaking: {
            description: 'A BREAKING CHANGE commits',
            title: 'BREAKING',
          },
          security: {
            description: 'Security-related changes',
            title: 'Security',
          },
          accessibility: {
            description: 'Accessibility improvements',
            title: 'Accessibility',
          },
          types: {
            description: 'TypeScript type changes',
            title: 'Types',
          },
        },
      },
    },
  },
};

export default config;
