'use client';

import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@juun/ui';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useCallback, useEffect, useState } from 'react';

import { antonio } from '@/assets/fonts';

import ThemeSwitch from '../theme/switch';

const DRAG_THRESHOLD = 0.25; // 25% of sheet height
const TRANSITION_DURATION = 200; // ms

interface HeaderSheetProps {
  navigationItems: { href: string; label: string }[];
}

export default function HeaderSheet({ navigationItems }: HeaderSheetProps) {
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
    <Sheet open={isOpen} onOpenChange={(open) => !isClosing && setIsOpen(open)}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
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
          <SheetTitle
            className={`${antonio.className} text-3xl font-bold tracking-tighter`}
          >
            <ThemeSwitch />
            <span className="sr-only">Navigation Menu</span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation menu with links to different sections of the website
          </SheetDescription>
        </SheetHeader>
        <nav className="flex h-full flex-col items-center justify-between px-4 py-20">
          <div className="flex w-full max-w-md flex-col items-start gap-4">
            {navigationItems.map((item, index) => (
              <Fragment key={item.href}>
                <Link
                  href={item.href}
                  className="text-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                {index < navigationItems.length - 1 && (
                  <Separator className="w-full" decorative />
                )}
              </Fragment>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
