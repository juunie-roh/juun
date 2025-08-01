"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@juun/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@juun/ui/sidebar";
import * as Lucide from "lucide-react";

import { useAppSidebar } from "@/contexts/app-sidebar";

export interface NavMainItem {
  id: string;
  title: string;
  icon: keyof typeof Lucide | string;
  items?: {
    id: string;
    title: string;
    content?: string;
  }[];
}

export default function NavMain({ items }: { items: NavMainItem[] }) {
  const { active, setActive, outer, innerOpen, setInnerOpen, setContent } =
    useAppSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = Lucide[
            item.icon as keyof typeof Lucide
          ] as Lucide.LucideIcon;

          return (
            <Collapsible
              key={item.id}
              asChild
              className="group/collapsible"
              open={active === item.id}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={() => {
                      if (!outer.open) outer.setOpen(true);
                      if (innerOpen) setInnerOpen(false);
                      setActive(item.id);
                    }}
                  >
                    <Icon />
                    <span>{item.title}</span>
                    <Lucide.ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.id}>
                        <SidebarMenuSubButton
                          onClick={() => {
                            setInnerOpen(true);
                            outer.setOpen(false);
                            setContent(
                              subItem.content ||
                                `${item.title} > ${subItem.title}`,
                            );
                          }}
                        >
                          {subItem.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
