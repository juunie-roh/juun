import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@juun/ui/navigation-menu";
import { Separator } from "@juun/ui/separator";
import type { Meta, StoryObj } from "@storybook/nextjs";
import Link from "next/link";
import { Fragment } from "react";

import ThemeProvider from "../../_contexts/theme-provider";
import Breadcrumb from "./breadcrumb";
import HeaderDrawer from "./drawer";
import ThemeSwitch from "./switch";

const navigationItems = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
];

/**
 * A modified version of the Header component for Storybook demonstration.
 */
interface HeaderProps {
  /**
   * Custom path to display in breadcrumbs for demo purposes
   */
  mockPath?: string;
}

const Header = ({ mockPath }: HeaderProps) => {
  // Mock the usePathname hook for Storybook by passing a custom path to Breadcrumb
  const breadcrumbSegments = mockPath
    ? mockPath
        .split("/")
        .filter((segment) => segment !== "")
        .map((segment, index, array) => ({
          href: `/${array.slice(0, index + 1).join("/")}`,
          label: segment
            .replace(/-|_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()),
          isCurrent: index === array.length - 1,
        }))
    : [];

  return (
    <header className="bg-background/50 sticky top-0 z-50 flex w-full items-center border-b px-4 backdrop-blur-lg">
      <div className="h-(--header-height) flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="font-(family-name:--font-antonio) scroll-m-20 text-3xl font-bold tracking-tighter lg:text-4xl">
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
      <Breadcrumb
        className="bg-border absolute -bottom-4 w-fit overflow-hidden rounded-full p-1 transition-all duration-300"
        segments={breadcrumbSegments}
      />
    </header>
  );
};

// Meta information for Storybook
const meta: Meta<typeof Header> = {
  title: "Home/Header",
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
    mockPath: {
      control: "text",
      description:
        "Mock pathname for breadcrumb demonstration. In the real component, this is auto-generated with `usePathname()`.",
      defaultValue: "",
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
    mockPath: "",
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
    mockPath: "/portfolio",
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
    mockPath: "/portfolio/project-name",
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
    mockPath: "/blog/category/post-title/comments",
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
    mockPath: "/portfolio",
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
    mockPath: "/portfolio/project-name",
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
    mockPath: "/portfolio/project-name/details",
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
