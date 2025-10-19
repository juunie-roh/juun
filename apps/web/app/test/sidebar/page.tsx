import { SidebarInset, SidebarProvider } from "@juun/ui/sidebar";

import { InnerSidebar, OuterSidebar } from "./_components";
import {
  AppSidebarProvider,
  InnerSidebarProvider,
} from "./_contexts/app-sidebar";

export default function SidebarPage() {
  return (
    <SidebarProvider>
      <AppSidebarProvider>
        <OuterSidebar />
        <InnerSidebarProvider>
          <InnerSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
        </InnerSidebarProvider>
      </AppSidebarProvider>
    </SidebarProvider>
  );
}
