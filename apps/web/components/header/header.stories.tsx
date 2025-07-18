// Import the components we need
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@pkg/ui/breadcrumb";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@pkg/ui/navigation-menu";
import { Separator } from "@pkg/ui/separator";
import type { Meta, StoryObj } from "@storybook/react";
import { Home } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import { antonio } from "@/assets/fonts";

import ThemeProvider from "../theme/provider";
import ThemeSwitch from "../theme/switch";
import HeaderSheet from "./drawer";

// For the demo, we'll create a custom Header component that accepts a custom path
// This mirrors your actual Header component but allows us to control breadcrumbs

/**
 * A modified version of the Header component that accepts a custom path for breadcrumbs,
 * so we can demonstrate different states in Storybook.
 */
interface HeaderWithBreadcrumbProps {
  /**
   * Path segments to display in the breadcrumb
   */
  segments?: string[];
}

const Header = ({ segments = [] }: HeaderWithBreadcrumbProps) => {
  // Mock antonio font for storybook

  // Navigation items
  const navigationItems = [
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
  ];

  // Generate breadcrumb items
  const breadcrumbItems = [
    { href: "/", label: "Home", isCurrent: segments.length === 0 },
    ...segments.map((segment, index) => ({
      href: `/${segments.slice(0, index + 1).join("/")}`,
      label: segment
        .replace(/-|_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      isCurrent: index === segments.length - 1,
    })),
  ];

  return (
    <header className="bg-background/50 sticky top-0 z-50 w-full border-b p-4 backdrop-blur-lg md:px-8">
      <div>
        <div className="flex items-center justify-between">
          <Link href="/">
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
                      <NavigationMenuItem className="flex items-center gap-1">
                        <Link
                          href={item.href}
                          className={navigationMenuTriggerStyle()}
                        >
                          {item.label}
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

              {/* Mock theme switch button */}
              <ThemeSwitch />
            </div>
          </div>

          {/* Mobile Navigation - properly hidden on desktop */}
          <div className="block md:hidden">
            <HeaderSheet navigationItems={navigationItems} />
          </div>
        </div>
      </div>
      {/* Breadcrumb with custom path */}
      <div className="bg-border absolute -bottom-4 w-fit overflow-hidden rounded-full p-1 transition-all duration-300">
        <BreadcrumbList>
          <BreadcrumbItem>
            {breadcrumbItems[0]?.isCurrent ? (
              <BreadcrumbPage className="bg-background m-0 cursor-default rounded-full px-2">
                <span className="flex items-center">
                  <Home className="-ml-1 mr-2 size-4" />
                  {breadcrumbItems[0]?.label}
                </span>
              </BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink asChild>
                  <a href={breadcrumbItems[0]?.href}>
                    <Home className="ml-1 size-4" />
                    <span className="sr-only">{breadcrumbItems[0]?.label}</span>
                  </a>
                </BreadcrumbLink>
              </>
            )}
          </BreadcrumbItem>

          {segments.length > 0 && <BreadcrumbSeparator />}

          {segments.map((_, index) => {
            const item = breadcrumbItems[index + 1];
            const isLast = index === segments.length - 1;

            return isLast || item?.isCurrent ? (
              <BreadcrumbItem key={item?.href}>
                <BreadcrumbPage className="bg-background cursor-default rounded-full px-2">
                  {item?.label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <Fragment key={item?.href}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <a href={item?.href}>{item?.label}</a>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </div>
    </header>
  );
};

// Meta information for Storybook
const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      subtitle:
        "Main navigation header with breadcrumbs showing different path states.",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    segments: {
      control: false,
      description:
        "Path segments to display in the breadcrumb. This is auto generated with `usePathname()` in Next.",
      defaultValue: [],
    },
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider>
          <div className="min-h-[200px]">
            <Story />
            <div className="mt-20 p-4">
              <h2 className="text-lg font-semibold">Page Content</h2>
              <p>Content would appear here below the header.</p>
            </div>
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Header>;

// Different path examples for breadcrumb
export const HomePath: Story = {
  args: {
    segments: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Header with home path breadcrumb.",
      },
    },
  },
};

export const PortfolioPath: Story = {
  args: {
    segments: ["portfolio"],
  },
  parameters: {
    docs: {
      description: {
        story: "Header with portfolio path breadcrumb.",
      },
    },
  },
};

export const NestedPath: Story = {
  args: {
    segments: ["portfolio", "project-name"],
  },
  parameters: {
    docs: {
      description: {
        story: "Header with a nested path breadcrumb.",
      },
    },
  },
};

export const DeepPath: Story = {
  args: {
    segments: ["blog", "category", "post-title", "comments"],
  },
  parameters: {
    docs: {
      description: {
        story: "Header with a deeply nested path breadcrumb.",
      },
    },
  },
};

// Responsive viewport examples
export const Mobile: Story = {
  args: {
    segments: ["portfolio"],
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Header as displayed on mobile devices with hamburger menu.",
      },
    },
  },
};

export const Tablet: Story = {
  args: {
    segments: ["portfolio", "project-name"],
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Header as displayed on tablet devices.",
      },
    },
  },
};

export const Desktop: Story = {
  args: {
    segments: ["portfolio", "project-name", "details"],
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "Header as displayed on desktop with full navigation.",
      },
    },
  },
};
