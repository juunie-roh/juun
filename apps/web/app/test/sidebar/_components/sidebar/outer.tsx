import { Command } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import NavMain from "./nav-main";
import { NavUser } from "./nav-user";

// sample data
const data = {
  user: {
    name: "user 1",
    role: "Guest",
    avatar: "/",
  },
  items: [
    {
      id: "menu-1",
      title: "Menu 1",
      icon: "SquareTerminal",
      items: [
        { id: "menu-1-1", title: "History" },
        { id: "menu-1-2", title: "Starred" },
        { id: "menu-1-3", title: "Settings" },
      ],
    },
    {
      id: "menu-2",
      title: "Menu 2",
      icon: "Bot",
      items: [
        { id: "menu-2-1", title: "Genesis" },
        { id: "menu-2-2", title: "Explorer" },
        { id: "menu-2-3", title: "Quantum" },
      ],
    },
    {
      id: "menu-3",
      title: "Menu 3",
      icon: "BookOpen",
      items: [
        { id: "menu-3-1", title: "Introduction" },
        { id: "menu-3-2", title: "Get Started" },
        { id: "menu-3-3", title: "Tutorials" },
        { id: "menu-3-4", title: "Changelog" },
      ],
    },
  ],
} as const;

export default function OuterSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} collapsible="icon" className="z-50">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Juun</span>
                  <span className="truncate text-xs">Sidebar</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
