import { ReactNode } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

export default function CesiumUtilsSidebar({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <Sidebar
      className="mt-header h-[calc(100svh-var(--spacing-header))]"
      collapsible="offcanvas"
      side="right"
      variant="floating"
    >
      <SidebarHeader className="border-b p-4">
        <div>
          <h2 className="text-lg font-semibold">Cesium Utils</h2>
          <p className="text-sm text-muted-foreground">API Demonstration</p>
        </div>
      </SidebarHeader>
      <SidebarContent>{children}</SidebarContent>
    </Sidebar>
  );
}
