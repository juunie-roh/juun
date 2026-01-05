"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbSegment {
  href: string;
  label: string;
  isCurrent: boolean;
}

interface BreadcrumbProps {
  homeHref?: string;
  showHome?: boolean;
  homeLabel?: string;
  segments?: BreadcrumbSegment[];
  className?: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  // Skip empty segments and filter out any dynamic route parameters (segments that start with "[" and end with "]")
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment !== "" && !segment.match(/^\[.*\]$/));

  // Generate breadcrumb segments
  return pathSegments.map((segment, index) => {
    // Create the href up to current segment
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

    let label = segment;

    // Check if this segment is a blog post ID
    const blogIndex = pathSegments.indexOf("blog");
    if (blogIndex !== -1 && index === blogIndex + 1) {
      const numericId = parseInt(segment, 10);
      if (!isNaN(numericId)) {
        label = "Article";
      }
    }

    // If not a blog post ID, format the label: convert kebab-case or snake_case to Title Case
    if (label === segment) {
      label = segment
        .replace(/-|_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    // Check if this is the current (last) segment
    const isCurrent = index === pathSegments.length - 1;

    return { href, label, isCurrent };
  });
}

export default function Breadcrumb({
  homeHref = "/",
  homeLabel = "Home",
  segments: customSegments,
  className,
}: BreadcrumbProps) {
  const pathname = usePathname();

  const segments = customSegments
    ? customSegments
    : generateBreadcrumbs(pathname);

  return (
    <BreadcrumbRoot className={className}>
      <BreadcrumbList key="List">
        <BreadcrumbItem>
          {segments.length > 0 ? (
            <>
              <BreadcrumbLink asChild>
                <Link href={homeHref}>
                  <Home className="ml-1 size-4" aria-label={homeLabel} />
                </Link>
              </BreadcrumbLink>
            </>
          ) : (
            <BreadcrumbPage className="cursor-default rounded-md bg-background px-1.5 shadow-sm">
              <span className="flex items-center">
                <Home className="mr-2 -ml-1 size-4" />
                {homeLabel}
              </span>
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {segments.length > 0 && <BreadcrumbSeparator />}

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return isLast || segment.isCurrent ? (
            <BreadcrumbItem key={segment.href}>
              <BreadcrumbPage className="cursor-default rounded-md bg-background px-1.5 shadow-sm">
                {segment.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={segment.href}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={segment.href}>{segment.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}
