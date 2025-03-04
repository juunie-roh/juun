import config from '@juun/config/tailwind';
import type { Config } from 'tailwindcss';
const extendedConfig: Config = {
  ...config,
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}'],
};
export default extendedConfig;
