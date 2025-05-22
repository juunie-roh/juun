'use client';

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@pkg/ui';
import { cn } from '@pkg/ui/lib/utils';
import { ArrowRight, Bookmark } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';

import { getHeadings, Heading } from '@/app/blog/blog.utils';

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
  contentSelector = '.prose',
  headingSelector = 'h2, h3',
}: TableOfContentsProps) {
  // Store the extracted headings
  const [headings, setHeadings] = useState<Heading[]>([]);

  // Track the active heading
  const [activeId, setActiveId] = useState<string>('');

  // Collapsible state
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
        rootMargin: '0px 0px -80% 0px', // Consider heading visible when in the top 20% of viewport
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
        behavior: 'smooth',
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
              'absolute left-0 top-0 w-1 h-full',
              activeId === id && 'bg-primary',
            )}
          />
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-normal rounded-l-none py-5 text-base',
              level === 3 && 'indent-6',
            )}
            onClick={() => handleHeadingClick(id)}
          >
            {text}
          </Button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={className}>
      {/* Always visible on xl screens */}
      <div
        className={cn(
          'hidden xl:block w-full overflow-hidden rounded-lg bg-card py-4 text-sm',
          bordered && 'border',
        )}
      >
        <h4 className="mb-4 px-6 font-medium">Index</h4>
        <nav className="max-h-[calc(100vh-18rem)] overflow-auto px-3">
          {tocContent}
        </nav>
      </div>

      {/* Collapsible on smaller screens */}
      <div className="xl:hidden">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className={cn('w-full rounded-md bg-card', bordered && 'border')}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                isOpen && 'flex w-full items-center justify-between px-2.5',
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
    </div>
  );
}
