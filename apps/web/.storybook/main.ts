import type { StorybookConfig } from '@storybook/nextjs';
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
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  webpackFinal: async (config) => {
    config.module?.rules?.push(
      // svgr loader
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      // postcss loader
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
    );

    return config;
  },
};

export default config;
