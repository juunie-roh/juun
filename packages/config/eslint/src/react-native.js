import { defineConfig } from 'eslint/config';
import reactNative from 'eslint-plugin-react-native';

export default defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-native': reactNative,
    },
  },
]);
