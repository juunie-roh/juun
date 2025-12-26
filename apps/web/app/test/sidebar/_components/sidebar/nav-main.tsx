"use client";

import { BookOpen, Bot, ChevronRight, SquareTerminal } from "lucide-react";

import { useAppSidebar } from "@/app/test/sidebar/_contexts/app-sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export interface NavMainItem {
  id: string;
  title: string;
  icon: "SquareTerminal" | "Bot" | "BookOpen";
  items?: readonly {
    id: string;
    title: string;
    content?: string;
  }[];
}

export default function NavMain({ items }: { items: readonly NavMainItem[] }) {
  const { active, setActive, outer, innerOpen, setInnerOpen, setContent } =
    useAppSidebar();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const iconMap = {
            SquareTerminal,
            Bot,
            BookOpen,
          } as const;

          const Icon = iconMap[item.icon as keyof typeof iconMap];

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
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
