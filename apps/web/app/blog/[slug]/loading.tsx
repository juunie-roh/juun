import { Skeleton } from '@pkg/ui/skeleton';
import { Fragment } from 'react';

export default function BlogItemLoading() {
  return (
    <Fragment>
      {/* Mobile table of contents skeleton */}
      <div className="xl:hidden">
        <div className="fixed right-5 top-20 z-40 mb-6 mt-2">
          <Skeleton className="size-10 rounded-md" />
        </div>
      </div>

      {/* Left aside - hidden on smaller screens */}
      <aside className="hidden xl:block" />

      {/* Main article content */}
      <article className="mx-auto w-full max-w-3xl px-4 pb-20 pt-4 md:px-8 xl:w-[48rem]">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-1/2" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </div>

        {/* Cover image */}
        <Skeleton className="aspect-video w-full rounded-lg" />

        {/* Content */}
        <div className="mt-8 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />

          {/* More content blocks */}
          <div className="mt-8 space-y-4">
            <Skeleton className="h-6 w-2/3" /> {/* Section heading */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/5" />
          </div>

          <div className="mt-8 space-y-4">
            <Skeleton className="h-6 w-1/2" /> {/* Another section heading */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* More content */}
        <div className="mt-8 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </article>

      {/* Right aside - Table of Contents skeleton for desktop */}
      <aside className="hidden xl:block">
        <div className="sticky left-0 top-1/4 max-w-64">
          <div className="w-full overflow-auto rounded-lg bg-card py-4 text-sm">
            <div className="mb-4 px-6">
              <Skeleton className="h-4 w-32" />{' '}
            </div>
            <nav className="max-h-[50vh] overflow-hidden overflow-y-auto px-3">
              <div className="space-y-2">
                <Skeleton className="h-8 w-full rounded-none rounded-r-md" />
                <Skeleton className="h-8 w-5/6 rounded-none rounded-r-md" />
                <Skeleton className="h-8 w-4/5 rounded-none rounded-r-md pl-4" />
                <Skeleton className="h-8 w-full rounded-none rounded-r-md" />
                <Skeleton className="h-8 w-3/4 rounded-none rounded-r-md pl-4" />
                <Skeleton className="h-8 w-5/6 rounded-none rounded-r-md" />
              </div>
            </nav>
          </div>
        </div>
      </aside>
    </Fragment>
  );
}
