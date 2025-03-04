import config from '@juun/config/tailwind';
import type { Config } from 'tailwindcss';
const extendedConfig: Config = {
  ...config,
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
export default extendedConfig;
