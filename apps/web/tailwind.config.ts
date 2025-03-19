import config from '@pkg/config/tailwind';
import type { Config } from 'tailwindcss';
const extendedConfig: Config = {
  ...config,
  theme: {
    extend: {
      ...config.theme?.extend,
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'var(--font-rix)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
export default extendedConfig;
