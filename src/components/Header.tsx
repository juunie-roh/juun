'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';

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
  const [dragPosition, setDragPosition] = useState(0);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      isDragging.current = true;
      const clientY =
        'touches' in e
          ? (e as React.TouchEvent).touches[0]?.clientY
          : (e as React.MouseEvent).clientY;
      if (!clientY) return;
      dragStartY.current = clientY;
    },
    [],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDragging.current) return;
      const currentY =
        'touches' in e
          ? (e as React.TouchEvent).touches[0]?.clientY
          : (e as React.MouseEvent).clientY;
      if (!currentY) return;
      const deltaY = currentY - dragStartY.current;

      // Only allow dragging downwards
      if (deltaY < 0) return;

      // Limit the drag distance
      const maxDrag = window.innerHeight / 2;
      const newPosition = Math.min(deltaY, maxDrag);

      setDragPosition(newPosition);

      // Prevent default to stop scrolling
      // e.preventDefault();
    },
    [],
  );

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;

    // If dragged more than 25% of the sheet height, close it
    if (dragPosition > window.innerHeight / 8) {
      setIsOpen(false);
    }

    // Reset position with animation
    setDragPosition(0);
  }, [dragPosition]);

  return (
    <header className="fixed left-0 top-0 flex w-full items-center justify-between border-b px-4 md:px-8 py-4 backdrop-blur-xl">
      <Link href="/" className="z-50">
        <h1
          className={`${antonio.className} scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl`}
        >
          Juun
        </h1>
      </Link>

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

      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" shape="circle">
              <Menu />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[75%] w-screen border-0 p-0 rounded-t-md transition-transform touch-none"
            style={{
              transform: `translateY(${dragPosition}px)`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            <div className="w-full flex justify-center py-2">
              <div className="w-12 h-1 rounded-full bg-muted-foreground/20" />
            </div>
            <SheetHeader className="absolute left-4 top-4">
              <SheetTitle className={`${antonio.className} font-bold text-3xl`}>
                Juun
                <span className="sr-only">Navigation Menu</span>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation menu with links to different sections of the
                website
              </SheetDescription>
            </SheetHeader>
            <nav className="flex h-full flex-col items-center justify-between px-4 py-20">
              <div className="flex w-full max-w-md flex-col items-start gap-4">
                {navigationItems.map((item, index) => (
                  <React.Fragment key={item.href}>
                    <Link
                      href={item.href}
                      className="text-lg transition-colors hover:text-primary"
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
              <div className="w-full max-w-md">
                <ThemeController className="w-full" />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
