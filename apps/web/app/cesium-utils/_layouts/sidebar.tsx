import { Sidebar, SidebarContent, SidebarHeader } from "@juun/ui/sidebar";
import { ReactNode } from "react";

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
