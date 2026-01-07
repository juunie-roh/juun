"use client";

import { ArrowRight, Bookmark } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  /**
   * CSS class for the container
   */
  className?: string;
  /**
   * Add border to the ToC
   */
  bordered?: boolean;
  /**
   * Container selector where headers are located
   * Defaults to '.prose' which is the standard blog content container
   */
  contentSelector?: string;
  /**
   * Header selectors to include in the ToC
   * Defaults to h2 and h3 elements
   */
  headingSelector?: string;
}

type Heading = {
  id: string;
  text: string;
  level: number;
  element: Element;
};

/**
 * Extract ID from heading element
 * If no ID exists, generate one from the text content
 * @param heading Target heading element to get ID from.
 */
function getIdFromHeading(heading: Element): string {
  // If the heading already has an id, use it
  if (heading.id) {
    return heading.id;
  }

  // Otherwise, generate an id from the heading text
  const id = heading.textContent
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Set the id on the heading element
  if (id) {
    heading.id = id;
  }

  return id || "";
}

function getHeadings(
  contentSelector: string,
  headingSelector: string,
): Heading[] | undefined {
  // Find the content container
  const container = document.querySelector(contentSelector);
  if (!container) return;

  // Find all headings in the container
  const elements = Array.from(container.querySelectorAll(headingSelector));

  // Process headings
  const headingElements = elements.map((element) => {
    // Get or create an ID for the heading
    const id = getIdFromHeading(element);
    // Get heading level (h2 = 2, h3 = 3, etc.)
    const level = parseInt(element.tagName[1] as string, 10);

    return {
      id,
      text: element.textContent || "",
      level,
      element,
    };
  });

  return headingElements;
}

/**
 * Responsive Table of Contents
 * - Always expanded on xl screens and up
 * - Collapsible on smaller screens with just a bookmark icon
 */
export default function TableOfContents({
  className,
  bordered = true,
  contentSelector = ".prose",
  headingSelector = "h2, h3",
}: TableOfContentsProps) {
  const t = useTranslations("components.blog.article.table-of-contents");
  const isLg = useMediaQuery("width > 64rem");
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const headingElements = getHeadings(contentSelector, headingSelector);
    if (!headingElements) return;

    setHeadings(headingElements);

    // Set up intersection observer to detect which heading is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -80% 0px", // Consider heading visible when in the top 20% of viewport
      },
    );

    // Observe all headings
    headingElements.forEach(({ element }) => {
      observer.observe(element);
    });

    return () => {
      // Clean up
      headingElements.forEach(({ element }) => {
        observer.unobserve(element);
      });
    };
  }, [contentSelector, headingSelector]);

  // If no headings found, don't render
  if (headings.length === 0) {
    return null;
  }

  const handleHeadingClick = (id: string) => {
    // Scroll to the heading element
    const element = document.getElementById(id);
    if (element) {
      // Get element position and scroll to it with an offset
      const yOffset = -80; // Offset for header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  // The TOC content - shared between mobile collapsible and desktop fixed version
  const tocContent = (
    <ul className="border-l text-muted-foreground">
      {headings.map(({ id, text, level }) => (
        <li key={id} className="relative">
          <div
            className={cn(
              "absolute top-0 left-0 h-full w-1",
              activeId === id && "bg-primary",
            )}
          />
          <Button
            variant="ghost"
            className="h-auto w-full justify-start rounded-l-none"
            onClick={() => handleHeadingClick(id)}
          >
            <span
              className={cn(
                "text-left text-wrap",
                level === 3 && "pl-4",
                activeId === id && "text-primary",
              )}
            >
              {text}
            </span>
          </Button>
        </li>
      ))}
    </ul>
  );

  return isLg ? (
    <div
      className={cn(
        "hidden w-full overflow-auto rounded-lg bg-card py-4 text-sm lg:block",
        className,
      )}
    >
      <h4 className="mb-4 px-6 font-medium">{t("title")}</h4>
      <nav className="max-h-[50vh] overflow-hidden overflow-y-auto px-3">
        {tocContent}
      </nav>
    </div>
  ) : (
    <div className={cn("xl:hidden", className)}>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn(
          "w-full max-w-64 rounded-md bg-card",
          bordered && "border",
        )}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              isOpen && "flex w-full items-center justify-between px-2.5",
            )}
          >
            {isOpen ? (
              <Fragment>
                <ArrowRight />
                <Bookmark className="fill-primary" />
              </Fragment>
            ) : (
              <>
                <Bookmark />
              </>
            )}
            <span className="sr-only">Toggle table of contents</span>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="mt-2 max-h-[50vh] overflow-y-auto px-4 pb-4">
            {tocContent}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
