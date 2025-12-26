"use client";

import { useAppSidebar } from "@/app/test/sidebar/_contexts/app-sidebar";
import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

export default function InnerSidebar() {
  const { content } = useAppSidebar();

  return (
    <Sidebar className="left-(--sidebar-width-icon)">
      <SidebarHeader>{content}</SidebarHeader>
      <SidebarRail />
    </Sidebar>
  );
}
