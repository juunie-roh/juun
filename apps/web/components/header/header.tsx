'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  Separator,
} from '@pkg/ui';
import Link from 'next/link';
import { Fragment } from 'react';

import { antonio } from '@/assets/fonts';

import ThemeSwitch from '../theme/switch';
import Breadcrumb from './breadcrumb';
import HeaderDrawer from './drawer';

const navigationItems = [
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
];

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/50 p-4 backdrop-blur-lg md:px-8"
      tabIndex={-1}
    >
      <div>
        <div className="flex items-center justify-between">
          <Link href="/" legacyBehavior>
            <h1
              className={`${antonio.className} scroll-m-20 text-3xl font-bold tracking-tighter lg:text-4xl`}
            >
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
      </div>
      <Breadcrumb className="absolute -bottom-4 w-fit overflow-hidden rounded-full bg-border p-1 transition-all duration-300" />
    </header>
  );
}
