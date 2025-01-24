'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { antonio } from '@/assets/fonts';
import Button from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import ThemeController from './theme-controller';

const navigationItems = [
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/techrecords', label: 'Tech Records' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 flex w-full items-center justify-between border-b px-4 md:px-8 py-4 backdrop-blur-xl">
      {/* Logo - visible on both mobile and desktop */}
      <Link href="/" className="z-50">
        <h1
          className={`${antonio.className} scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl`}
        >
          Juun
        </h1>
      </Link>

      {/* Desktop Navigation - hidden on mobile */}
      <div className="hidden md:flex md:items-center md:gap-4">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationItems.map((item, index) => (
              <React.Fragment key={item.href}>
                <NavigationMenuItem className="flex items-center gap-1">
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                  {index < navigationItems.length - 1 && (
                    <Separator
                      orientation="vertical"
                      className="h-5"
                      decorative
                    />
                  )}
                </NavigationMenuItem>
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeController />
      </div>

      {/* Mobile Navigation - hidden on desktop */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" shape="circle">
              <Menu />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="h-screen w-screen border-0 p-0">
            <SheetHeader className="absolute left-4 top-4">
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation menu with links to different sections of the
                website
              </SheetDescription>
            </SheetHeader>
            <nav className="flex h-full flex-col items-center justify-between px-4 py-20">
              <div className="flex w-full max-w-sm flex-col items-center gap-8">
                {navigationItems.map((item, index) => (
                  <React.Fragment key={item.href}>
                    <Link
                      href={item.href}
                      className="text-2xl transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {index < navigationItems.length - 1 && (
                      <Separator className="w-full" decorative />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full max-w-sm">
                <ThemeController className="w-full" />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
