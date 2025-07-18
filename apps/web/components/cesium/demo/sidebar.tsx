import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@pkg/ui/sidebar";

import ApiCombobox from "./api-combobox";
import FeatureList from "./feature-list";

export default function CesiumUtilsSidebar() {
  return (
    <Sidebar
      className="mt-[var(--header-height)] h-[calc(100svh-var(--header-height))]"
      collapsible="offcanvas"
      side="right"
      variant="floating"
    >
      <SidebarHeader className="border-b p-4">
        <div>
          <h2 className="text-lg font-semibold">Cesium Utils</h2>
          <p className="text-muted-foreground text-sm">API Demonstration</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Select API</SidebarGroupLabel>
          <SidebarGroupContent>
            <ApiCombobox />
          </SidebarGroupContent>
        </SidebarGroup>
        <FeatureList />
      </SidebarContent>
    </Sidebar>
  );
}
