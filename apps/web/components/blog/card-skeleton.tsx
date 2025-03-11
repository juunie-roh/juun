import { Card, CardContent, CardFooter, CardHeader, Skeleton } from '@juun/ui';

export function BlogCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden md:flex md:flex-row">
      {/* Image skeleton - left side on md+ screens, top on mobile */}
      <div className="md:w-1/3 lg:w-2/5">
        <Skeleton className="aspect-video size-full md:aspect-auto md:h-full" />
      </div>

      {/* Content skeleton - right side on md+ screens, below image on mobile */}
      <div className="flex flex-col md:w-2/3 lg:w-3/5">
        {/* Title and metadata skeleton */}
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>

        {/* Description skeleton */}
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </CardContent>

        {/* Footer skeleton */}
        <CardFooter className="mt-auto">
          <Skeleton className="h-4 w-20" />
        </CardFooter>
      </div>
    </Card>
  );
}
