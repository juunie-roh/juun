import '@pkg/config/tailwind/styles';

import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      codePanel: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Components'],
        locales: '',
      },
    },
  },
};

export default preview;
