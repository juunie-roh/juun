"use client";

import { SidebarProvider, useSidebar } from "@juun/ui/sidebar";
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type AppSidebarContextProps = {
  // Outer sidebar (from page-level SidebarProvider)
  outer: ReturnType<typeof useSidebar>;

  // Inner sidebar state (controlled by context)
  innerOpen?: boolean;
  setInnerOpen: (open: boolean) => void;

  // Navigation state
  active?: string | null;
  setActive: (menu: string | null) => void;
  content?: string | null;
  setContent: (content: string | null) => void;
};

const AppSidebarContext = createContext<AppSidebarContextProps | null>(null);

export function useAppSidebar() {
  const context = useContext(AppSidebarContext);
  if (!context) {
    throw new Error("useAppSidebar must be used within a AppSidebarProvider.");
  }
  return context;
}

export function InnerSidebarProvider({ children }: { children: ReactNode }) {
  const { innerOpen, setInnerOpen } = useAppSidebar();

  return (
    <SidebarProvider open={innerOpen} onOpenChange={setInnerOpen}>
      {children}
    </SidebarProvider>
  );
}

export function AppSidebarProvider({ children }: { children: ReactNode }) {
  const outer = useSidebar(); // From page-level SidebarProvider
  const [innerOpen, setInnerOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  return (
    <AppSidebarContext.Provider
      value={{
        outer,
        innerOpen,
        setInnerOpen,
        active,
        setActive,
        content,
        setContent,
      }}
    >
      {children}
    </AppSidebarContext.Provider>
  );
}
