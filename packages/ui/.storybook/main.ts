import type { StorybookConfig } from '@storybook/react-webpack5';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  const pkgPath = join(value, 'package.json');
  const pkgURL =
    typeof import.meta.resolve === 'function'
      ? import.meta.resolve(pkgPath)
      : new URL(pkgPath, import.meta.url).href;
  return dirname(fileURLToPath(pkgURL));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
      },
      propFilter: {
        skipPropsWithoutDoc: false,
      },
    },
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@storybook/test': getAbsolutePath('@storybook/test'),
    };
    if (config.module?.rules) {
      config.module.rules.push(
        // Add SVGR loader for SVG files
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        // Tailwind css loader
        {
          test: /\.css$/,
          use: [
            {
              loader: getAbsolutePath('postcss-loader'),
              options: {
                postcssOptions: {
                  plugins: [
                    getAbsolutePath('tailwindcss'),
                    getAbsolutePath('autoprefixer'),
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx)$/,
          loader: getAbsolutePath('babel-loader'),
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              // Add React automatic JSX transform
              ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
            ],
          },
          exclude: '/node_modules/',
        },
      );
    }

    // Return the modified config
    return config;
  },
};

export default config;
