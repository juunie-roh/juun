'use client';

import { ScrollProgressBar } from '@pkg/ui';
import { cn } from '@pkg/ui/lib/utils';
import { ReactNode } from 'react';

import { TableOfContents } from './table-of-contents';

interface BlogPostLayoutProps {
  /**
   * Blog post content
   */
  children: ReactNode;
  /**
   * Optional additional className for the container
   */
  className?: string;
}

/**
 * Layout component for blog posts with Table of Contents
 */
export function BlogPostLayout({ children, className }: BlogPostLayoutProps) {
  return (
    <>
      {/* Reading progress bar */}
      <ScrollProgressBar />

      <div
        className={cn(
          'relative mx-auto max-w-3xl px-4 pb-20 pt-4 md:px-8',
          className,
        )}
      >
        {/* Table of Contents - responsive for all screen sizes */}
        <TableOfContents
          className="fixed right-5 top-20 z-40 mb-6 mt-2 xl:top-24 xl:my-0 xl:w-64"
          contentSelector=".prose"
          headingSelector="h2, h3"
        />

        {/* Main content - centered on page */}
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
