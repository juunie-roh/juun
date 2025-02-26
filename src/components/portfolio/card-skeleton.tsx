import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Skeleton from '@/components/ui/skeleton';

export function PortfolioCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="aspect-video w-full" />

      {/* Title and description skeleton */}
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>

      {/* Tags skeleton */}
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </CardContent>

      {/* Footer skeleton */}
      <CardFooter className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </CardFooter>
    </Card>
  );
}
