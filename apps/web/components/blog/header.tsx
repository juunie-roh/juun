import { Badge, Skeleton } from '@juun/ui';

import type { BlogMetadata } from '@/types/post.types';

export function BlogHeader({ metadata }: { metadata: BlogMetadata }) {
  return (
    <div className="mb-8">
      <h1 className="mb-4 text-3xl font-bold tracking-tighter">
        {metadata.title}
      </h1>
      <p className="text-lg">{metadata.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {metadata.tags &&
          metadata.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
      </div>
    </div>
  );
}

export function BlogHeaderSkeleton() {
  return (
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
  );
}
