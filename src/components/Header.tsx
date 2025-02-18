'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

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

const DRAG_THRESHOLD = 0.25; // 25% of sheet height
const TRANSITION_DURATION = 200; // ms

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  // Reset states when sheet is opened
  useEffect(() => {
    if (isOpen) {
      setDragOffset(0);
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (isClosing) return;
      const clientY =
        'touches' in e
          ? e.touches[0]?.clientY
          : (e as React.MouseEvent).clientY;
      setStartY(clientY || 0);
      setIsDragging(true);
    },
    [isClosing],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDragging || isClosing) return;

      const clientY =
        'touches' in e
          ? e.touches[0]?.clientY
          : (e as React.MouseEvent).clientY;
      const delta = Math.max(0, (clientY || 0) - startY); // Only allow downward drag

      setDragOffset(delta);
      e.preventDefault();
    },
    [isDragging, startY, isClosing],
  );

  const closeSheet = useCallback((finalOffset: number) => {
    setIsClosing(true);
    setDragOffset(finalOffset);

    // Use window.innerHeight for the full close animation
    requestAnimationFrame(() => {
      setDragOffset(window.innerHeight);
    });

    // Wait for animation to complete before actually closing
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, TRANSITION_DURATION);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || isClosing) return;
    setIsDragging(false);

    const sheetHeight = window.innerHeight * 0.75; // 75% of viewport height
    if (dragOffset > sheetHeight * DRAG_THRESHOLD) {
      // Close from current position
      closeSheet(dragOffset);
    } else {
      // Reset position
      setDragOffset(0);
    }
  }, [isDragging, dragOffset, isClosing, closeSheet]);

  return (
    <header className="fixed left-0 top-0 flex w-full items-center justify-between border-b p-4 md:px-8">
      <div className="absolute inset-0 backdrop-blur-xl" />

      <Link href="/" className="z-50">
        <h1
          className={`${antonio.className} scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl`}
        >
          Juun
        </h1>
      </Link>

      <div className="z-50 hidden md:flex md:items-center md:gap-4">
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

      <div className="z-50 md:hidden">
        <Sheet
          open={isOpen}
          onOpenChange={(open) => !isClosing && setIsOpen(open)}
        >
          <SheetTrigger asChild>
            <Button variant="ghost" shape="circle">
              <Menu />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-3/4 w-screen rounded-t-md border-0 p-0"
            style={{
              position: 'fixed',
              bottom: `-${dragOffset}px`,
              left: 0,
              transition: !isDragging
                ? `bottom ${TRANSITION_DURATION}ms ease-out`
                : 'none',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            <div className="flex w-full justify-center py-2">
              <div className="h-1 w-12 rounded-full bg-muted-foreground/20" />
            </div>
            <SheetHeader className="absolute left-4 top-4">
              <SheetTitle className={`${antonio.className} text-3xl font-bold`}>
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
