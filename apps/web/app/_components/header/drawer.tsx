"use client";

import { Button } from "@juun/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@juun/ui/drawer";
import { ScrollArea } from "@juun/ui/scroll-area";
import { Separator } from "@juun/ui/separator";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";

import ThemeSwitch from "./switch";

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
            className={`text-left font-(family-name:--font-antonio) text-2xl font-bold tracking-tighter`}
          >
            <ThemeSwitch />
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            Navigation menu with links to different sections of the website
          </DrawerDescription>
          <DrawerClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
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
                    className="text-center text-xl font-medium transition-colors hover:text-primary"
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
