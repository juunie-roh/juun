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
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(var(--primary))', // Base text color
            h1: { color: 'hsl(var(--primary))' },
            h2: { color: 'hsl(var(--primary))' },
            h3: { color: 'hsl(var(--primary))' },
            strong: { color: 'hsl(var(--primary))' },
            a: { color: 'hsl(var(--primary))' },
            code: { color: 'hsl(var(--primary))' },
            // Add other elements as needed
          },
        },
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
