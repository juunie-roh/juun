'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ComponentProps } from 'react';

export default function Providers({
  children,
  ...props
}: ComponentProps<typeof NextThemeProvider>) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}
