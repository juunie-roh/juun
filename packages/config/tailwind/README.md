# @pkg/config/tailwind

Shared Tailwind CSS configuration with predefined themes, plugins, and utilities.

## Usage

Extend this configuration in your Tailwind CSS config file:

```js
// tailwind.config.ts
import config from '@pkg/config/tailwind';
import type { Config } from 'tailwindcss';

const extendedConfig: Config = {
  ...config,
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Add your content paths here
  ],
  // Add any project-specific overrides
};

export default extendedConfig;
```

## Features

- Predefined color scheme with light/dark mode support
- Custom color variables with semantic names
- Extended spacing, sizing, and typography scales
- Built-in typography plugin for rich text content
- Animation utilities for transitions and effects
- Chart colors for consistent data visualizations

## Importing Styles

To use the global styles:

```js
// In your layout or global CSS file
import '@pkg/config/tailwind/styles';
```

## CSS Variables

The configuration provides CSS variables for theme colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  /* ...other variables */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ...dark mode variables */
}
```

These variables can be accessed in your CSS using `hsl(var(--variable-name))` or through Tailwind classes like `bg-background` and `text-foreground`.