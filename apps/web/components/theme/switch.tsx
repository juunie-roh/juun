'use client';

import { Button } from '@pkg/ui';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  // Local animation state - decoupled from the actual theme
  const [animatingDark, setAnimatingDark] = useState(false);

  // Sync animation state with theme on mount
  useEffect(() => {
    if (theme) {
      setAnimatingDark(theme === 'dark');
    }
  }, [theme]);

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    // First update our animation state
    setAnimatingDark(!isDark);

    // Then update the actual theme after a small delay to let animation complete
    setTimeout(() => {
      setTheme(isDark ? 'light' : 'dark');
    }, 150); // Half the animation duration to feel responsive but let animation start
  };

  // Custom switch with both icons visible
  return (
    <Button
      variant="outline"
      size="icon"
      className="relative h-8 w-16 overflow-hidden rounded-full border border-input p-0"
      onClick={toggleTheme}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-muted" />

      {/* Moving thumb */}
      <div
        className="absolute size-6 rounded-full bg-background shadow transition-all duration-300 ease-in-out"
        style={{
          transform: animatingDark ? 'translateX(1rem)' : 'translateX(-1rem)',
          left: '50%',
          marginLeft: '-12px', // Half of the width of the thumb
        }}
      />

      {/* Sun icon - left side */}
      <div
        className="absolute left-[7px] top-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: animatingDark ? 0.4 : 1 }}
      >
        <Sun className="size-4" />
      </div>

      {/* Moon icon - right side */}
      <div
        className="absolute right-[7px] top-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{ opacity: animatingDark ? 1 : 0.4 }}
      >
        <Moon className="size-4" />
      </div>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
