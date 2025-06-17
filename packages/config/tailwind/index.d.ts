import type { Config } from 'tailwindcss';

declare const config: Omit<Config, 'content'>;

export default config;
