"use client";

import { Sidebar, SidebarHeader, SidebarRail } from "@juun/ui/sidebar";

import { useAppSidebar } from "@/contexts/app-sidebar";

export default function InnerSidebar() {
  const { content } = useAppSidebar();

  return (
    <Sidebar className="left-(--sidebar-width-icon)">
      <SidebarHeader>{content}</SidebarHeader>
      <SidebarRail />
    </Sidebar>
  );
}
