import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@pkg/ui';
import Image from 'next/image';
import Link from 'next/link';

import { PortfolioMetadata } from '@/app/portfolio/portfolio.types';
import { formatDateSafe } from '@/utils/date.utils';
import { safeUrl } from '@/utils/security.utils';

export interface Post {
  slug: string;
  metadata: PortfolioMetadata;
}

interface PortfolioCardProps {
  post: Post;
}

export function PortfolioCard({ post }: PortfolioCardProps) {
  // prevent XSS(Cross-site scripting)
  const slug = safeUrl(post.slug);
  if (slug === null) return null;

  return (
    <Link href={`/portfolio/${slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        {post.metadata.image ? (
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
            <Image
              src={post.metadata.image}
              alt={post.metadata.title || 'Portfolio image'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-gradient-to-r from-blue-100 to-indigo-100" />
        )}
        <CardHeader>
          <CardTitle className="line-clamp-1 leading-normal group-hover:text-blue-600">
            {post.metadata.title}
          </CardTitle>
          <p className="line-clamp-3 min-h-[72px] text-secondary-foreground">
            {post.metadata.description}
          </p>
        </CardHeader>

        <CardContent>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-600">
            View project
          </span>
          {post.metadata.date && (
            <span className="text-xs text-muted-foreground">
              {formatDateSafe(post.metadata.date)}
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

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
