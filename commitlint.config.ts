const config = {
  extends: ['@commitlint/config-conventional'],
  scopes: [
    'component',
    'css-style',
    'custom-hook',
    'store',
    'util',
    'api',

    'wrong codes',
    'spaghetti codes',
    'alien codes',

    'assets',
    'package',

    'lint',
    'formatting',

    'config',
    'workflow',

    // NOTE: .releaserc.js
    'breaking',
    'no-release',
    'README',
  ],
  allowCustomScopes: true,
};
export default config;
