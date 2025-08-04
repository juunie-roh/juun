import { SidebarInset, SidebarProvider } from "@juun/ui/sidebar";

import InnerSidebar from "@/components/sidebar/inner";
import OuterSidebar from "@/components/sidebar/outer";
import {
  AppSidebarProvider,
  InnerSidebarProvider,
} from "@/contexts/app-sidebar";

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
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
          </SidebarInset>
        </InnerSidebarProvider>
      </AppSidebarProvider>
    </SidebarProvider>
  );
}
