import { Skeleton } from '@juun/ui';

export default function PortfolioItemLoading() {
  return (
    <article className="mx-auto max-w-3xl">
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
      </div>

      {/* Project details section */}
      <div className="mt-12 space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-20 w-full rounded-lg" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </div>
    </article>
  );
}
