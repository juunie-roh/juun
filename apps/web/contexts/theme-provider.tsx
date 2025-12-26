"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { type ComponentProps, useEffect, useState } from "react";

export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemeProvider>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a div with the same structure but no theme-specific styling
    // This ensures the initial render matches between server and client
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

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
