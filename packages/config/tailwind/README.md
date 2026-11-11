# @config/tailwind

Shared Tailwind CSS v4 setup: the global stylesheet with the project's design tokens, and the PostCSS config. Tailwind v4 is configured in CSS, so there is no JS `tailwind.config` file.

## Files

| File | Purpose |
| --- | --- |
| `globals.css` | Imports Tailwind, `tw-animate-css` and `@tailwindcss/typography`, and defines the design tokens, dark mode and base styles |
| `postcss.config.js` | PostCSS config using `@tailwindcss/postcss` |

## Usage

Re-export the PostCSS config from the app:

```js
// apps/web/postcss.config.js
import config from "@config/tailwind/postcss.config.js";

export default config;
```

Import the stylesheet once, in the root layout (and in `.storybook/preview.tsx` for Storybook):

```tsx
import "@config/tailwind/globals.css";
```

`globals.css` declares its content sources with `@source "../../../apps/web/**/*.{ts,tsx}"`. Add a new `@source` line if another app needs its classes generated.

shadcn/ui points at this file too (`tailwind.css` in `apps/web/components.json`), so `shadcn add` writes token changes here.

## Design Tokens

Tokens are defined in three layers:

1. **Raw values** in `:root` (light) and `.dark` (dark), as `oklch(...)` colors and plain CSS values.
2. **Utility mapping** in `@theme inline`, which turns them into Tailwind utilities (`--color-background: var(--background)` → `bg-background`).
3. **Base styles** in `@layer base` (border color, body background and text, monospace for `code`/`pre`).

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ...other variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ...dark mode variables */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... */
}
```

Use them through utilities such as `bg-background`, `text-muted-foreground` and `border-border`, or directly with `var(--background)`.

### Available tokens

- **Colors:** the shadcn semantic set (`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`), `chart-1`…`chart-5` and `sidebar-*`
- **Radius:** `--radius` (0.625rem), with `radius-sm`/`md`/`lg`/`xl` derived from it
- **Fonts:** `font-sans` (Geist, then Noto Sans KR), `font-mono` (Geist Mono), `font-stabil-grotesk` and `font-victor-serif` (Latin-only display fonts that fall back to `font-sans`)
- **Spacing:** `--spacing-header` (`pt-header`, the fixed header height)
- **Layout:** `grid-cols-responsive` and `gap-responsive` (16 columns / 32px, or 12 columns / 16px at 1024px and below)
- **Animations:** `animate-marquee`, `animate-marquee-reverse`, `animate-marquee2` and `animate-marquee2-reverse`
- **Backgrounds:** `--bg-dashed`, a dashed SVG pattern with separate light and dark strokes

Font variables (`--font-geist-sans` and so on) are set by `next/font` in `apps/web/assets/fonts/index.ts`.

## Dark Mode

Dark mode uses the class strategy: `@custom-variant dark (&:is(.dark *))`, with the `.dark` class toggled by `next-themes`. Every color token needs a value in both `:root` and `.dark`.
