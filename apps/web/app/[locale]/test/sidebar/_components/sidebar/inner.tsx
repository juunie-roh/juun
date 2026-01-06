"use client";

import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

import { useAppSidebar } from "../../_contexts/app-sidebar";

export default function InnerSidebar() {
  const { content } = useAppSidebar();

  return (
    <Sidebar className="left-(--sidebar-width-icon)">
      <SidebarHeader>{content}</SidebarHeader>
      <SidebarRail />
    </Sidebar>
  );
}
