"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@juun/ui/navigation-menu";
import { Separator } from "@juun/ui/separator";
import Link from "next/link";
import { Fragment } from "react";

import Breadcrumb from "./breadcrumb";
import HeaderDrawer from "./drawer";
import ThemeSwitch from "./switch";

const navigationItems = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background/50 px-4 backdrop-blur-lg">
      <div className="flex h-header w-full items-center justify-between">
        <Link href="/">
          <h1 className="scroll-m-20 font-(family-name:--font-antonio) text-3xl font-bold tracking-tighter lg:text-4xl">
            Juun
          </h1>
        </Link>

        {/* Desktop Navigation - properly hidden on mobile */}
        <div className="hidden md:block">
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item, index) => (
                  <Fragment key={item.href}>
                    <NavigationMenuItem className="flex items-center gap-1 tracking-tight">
                      <NavigationMenuLink
                        href={item.href}
                        className={`${navigationMenuTriggerStyle()} bg-transparent`}
                      >
                        {item.label}
                      </NavigationMenuLink>
                      {index < navigationItems.length - 1 && (
                        <Separator
                          orientation="vertical"
                          className="h-5"
                          decorative
                        />
                      )}
                    </NavigationMenuItem>
                  </Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <ThemeSwitch />
          </div>
        </div>

        {/* Mobile Navigation - properly hidden on desktop */}
        <div className="block md:hidden">
          <HeaderDrawer navigationItems={navigationItems} />
        </div>
      </div>
      <Breadcrumb className="absolute -bottom-4 w-fit overflow-hidden rounded-full bg-border p-1 transition-all duration-300" />
    </header>
  );
}
