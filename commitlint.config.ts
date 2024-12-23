import { RuleConfigSeverity, type UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  // parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'scope-enum': [
      RuleConfigSeverity.Warning,
      'always',
      [
        'component',
        'story',
        'hook',
        'store',
        'util',
        'api',
        // refactoring codes
        'wrong',
        'spaghetti',
        'alien',
        // external
        'asset',
        'package',
        // settings
        'config',
        'workflow',
        // others
        'breaking',
        'readme',
      ],
    ],
  },
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
            description: 'Changes on service api',
            title: 'API',
          },

          wrong: {
            description: 'Fixes on wrong codes',
            title: 'Wrong Codes',
          },
          spaghetti: {
            description: 'Fixes on spaghetti codes',
            title: 'Spaghetti Codes',
          },
          alien: {
            description: 'Fixes on incomprehensive codes',
            title: 'Alien Codes',
          },

          asset: {
            description: 'Changes on assets of the project',
            title: 'Assets',
          },
          package: {
            description: 'Changes on node packages',
            title: 'Packages',
          },

          config: {
            description: 'Changes on configurations for this project',
            title: 'Configurations',
          },
          workflow: {
            description: 'Updates on workflows',
            title: 'Workflows',
          },

          breaking: {
            description: 'A BREAKING CHANGE commits',
            title: 'BREAKING',
          },
          readme: {
            description: 'Changes on README.md',
            title: 'README',
          },
        },
      },
    },
  },
  // scopes: ['css-style', 'lint', 'formatting'],
};
export default config;
