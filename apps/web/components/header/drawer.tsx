"use client";

import { Button } from "@pkg/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@pkg/ui/drawer";
import { ScrollArea } from "@pkg/ui/scroll-area";
import { Separator } from "@pkg/ui/separator";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";

import { antonio } from "@/assets/fonts";

import ThemeSwitch from "../theme/switch";

interface HeaderDrawerProps {
  navigationItems: { href: string; label: string }[];
}

export default function HeaderDrawer({ navigationItems }: HeaderDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open main menu">
          <Menu className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="relative">
          <DrawerTitle
            className={`${antonio.className} text-left text-2xl font-bold tracking-tighter`}
          >
            <ThemeSwitch />
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Navigation menu with links to different sections of the website
          </DrawerDescription>
          <DrawerClose className="ring-offset-background focus:ring-ring focus:outline-hidden absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DrawerClose>
        </DrawerHeader>
        <ScrollArea className="h-96 w-full px-4 pb-4">
          <nav className="flex flex-col gap-4">
            {navigationItems.map((item, index) => (
              <Fragment key={item.href}>
                <Button asChild variant="link">
                  <Link
                    href={item.href}
                    className="hover:text-primary text-center text-xl font-medium transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </Button>
                {index < navigationItems.length - 1 && (
                  <Separator className="w-full" decorative />
                )}
              </Fragment>
            ))}
          </nav>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
