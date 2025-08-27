"use client";

import { Button } from "@juun/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@juun/ui/collapsible";
import { useMediaQuery } from "@juun/ui/hooks/use-media-query";
import { cn } from "@juun/ui/lib/utils";
import { ArrowRight, Bookmark } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { getHeadings, Heading } from "../_utils/post";

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

/**
 * Responsive Table of Contents
 * - Always expanded on xl screens and up
 * - Collapsible on smaller screens with just a bookmark icon
 */
export function TableOfContents({
  className,
  bordered = true,
  contentSelector = ".prose",
  headingSelector = "h2, h3",
}: TableOfContentsProps) {
  const isXL = useMediaQuery("min-width: 1280px");
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
    <ul className="text-muted-foreground border-l">
      {headings.map(({ id, text, level }) => (
        <li key={id} className="relative">
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-1",
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
                "text-wrap text-left",
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

  return isXL ? (
    <div
      className={cn(
        "bg-card hidden w-full overflow-auto rounded-lg py-4 text-sm xl:block",
        className,
      )}
    >
      <h4 className="mb-4 px-6 font-medium">JUMP TO SECTION</h4>
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
          "bg-card w-full max-w-64 rounded-md",
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
