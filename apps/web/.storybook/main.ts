import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-vitest",
    "storybook-next-intl",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  // webpackFinal: async (config) => {
  //   config.module?.rules?.push(
  //     // svgr loader
  //     {
  //       test: /\.svg$/,
  //       use: ["@svgr/webpack"],
  //     },
  //   );

  //   return config;
  // },
};

export default config;
