'use client';

import Link from 'next/link';
import React from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import ThemeController from './theme-controller';
import { Separator } from './ui/separator';

const navigationItems = [
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/techrecords', label: 'Tech Records' },
];

const Header = () => {
  return (
    <div className="absolute left-0 top-0 flex w-full items-center justify-between border-b px-8 py-4 backdrop-blur-md">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="mr-4">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Juun
                </h1>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {navigationItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <NavigationMenuItem>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {index < navigationItems.length - 1 && (
                <Separator orientation="vertical" className="h-5" decorative />
              )}
            </React.Fragment>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <ThemeController />
    </div>
  );
};

export default Header;
