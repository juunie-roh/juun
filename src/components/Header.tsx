import Link from 'next/link';
import React from 'react';

import { antonio } from '@/assets/fonts';
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

export default function Header() {
  return (
    <header className="fixed left-0 top-0 flex w-full items-center justify-between border-b px-8 py-4 backdrop-blur-xl">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="mr-4">
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink>
                <h1
                  className={`${antonio.className} scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl`}
                >
                  Juun
                </h1>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          {navigationItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <NavigationMenuItem className="flex items-center gap-1 place-self-end">
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
    </header>
  );
}
