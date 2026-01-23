"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import React from "react";

import { Button } from "@/components/ui/button";

export default function ThemeSwitch() {
  const t = useTranslations("/.header.theme");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const segments = React.useMemo(
    () =>
      [
        // { value: "system", icon: Monitor, label: "System" },
        { value: "light", icon: Sun, label: "Light" },
        { value: "dark", icon: Moon, label: "Dark" },
      ] as const,
    [],
  );

  // Sync mounted state
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Update active index when theme changes
  React.useEffect(() => {
    if (theme) {
      const index = segments.findIndex((s) => s.value === theme);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [theme, segments]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex h-8 w-auto items-center rounded-full border border-input bg-muted p-0.5">
        <div className="flex gap-0.5">
          {/* Placeholder segments */}
          {Array(segments.length).map((_v, i) => (
            <div key={i} className="size-7 rounded-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-8 w-auto items-center rounded-full border border-input bg-muted p-0.5">
      {/* Sliding thumb */}
      <div
        className="absolute size-7 rounded-full bg-background shadow-sm transition-all duration-300 ease-in-out"
        style={{
          transform: `translateX(calc(${activeIndex} * (1.75rem + 0.125rem)))`,
          left: "0.125rem",
        }}
      />

      <div className="relative flex gap-0.5">
        {segments.map(({ value, icon: Icon, label }, index) => {
          const isActive = theme === value;
          return (
            <Button
              key={value}
              variant="ghost"
              size="icon"
              onClick={() => {
                // First update our animation state immediately
                setActiveIndex(index);

                // Then update the actual theme after a small delay to let animation complete
                setTimeout(() => {
                  setTheme(value);
                }, 150);
              }}
              className="relative z-10 size-7 rounded-full p-0 hover:bg-transparent"
              aria-label={t("aria-label", { label })}
              aria-pressed={isActive}
            >
              <Icon
                className={`size-4 transition-opacity duration-200 ${isActive ? "opacity-100" : "opacity-40"}`}
              />
            </Button>
          );
        })}
      </div>
      <span className="sr-only">{t("label")}</span>
    </div>
  );
}
