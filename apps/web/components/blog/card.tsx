import { Badge } from "@juun/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@juun/ui/card";
import { ScrollArea, ScrollBar } from "@juun/ui/scroll-area";
import { Skeleton } from "@juun/ui/skeleton";
import { CalendarIcon, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BlogMetadata } from "@/app/blog/blog.types";
import { formatDateSafe } from "@/utils/date.utils";
import { safeUrl } from "@/utils/security.utils";

export interface Post {
  slug: string;
  metadata: BlogMetadata;
}

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  // Prevent XSS (Cross-site scripting)
  const slug = safeUrl(post.slug);
  if (slug === null) return null;

  // Calculate estimated reading time (roughly 200 words per minute)
  const getReadingTime = (content?: string, wordCount?: number): number => {
    // If wordCount is provided in metadata, use it
    if (wordCount && wordCount > 0) {
      return Math.max(1, Math.ceil(wordCount / 200));
    }

    // Otherwise estimate based on available content
    if (!content) return 1;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  // For now we might only have description, but this should be updated
  // to use the full content word count once available in the metadata
  const readingTime = getReadingTime(
    post.metadata.description,
    post.metadata.wordCount,
  );

  return (
    <Link href={`/blog/${slug}`} className="group block w-full">
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg md:flex md:flex-row">
        {/* Image container - left side on md+ screens, top on mobile */}
        {post.metadata.image ? (
          <div className="overflow-hidden md:w-1/3 lg:w-2/5">
            <div className="aspect-video size-full bg-gray-300 md:aspect-auto">
              <Image
                src={post.metadata.image}
                alt={post.metadata.title || "Blog post image"}
                width={256}
                height={256}
                className="size-full object-contain p-8 transition-transform duration-300 group-hover:scale-105 md:h-56"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>
          </div>
        ) : (
          <div className="bg-linear-to-r aspect-video w-full from-blue-50 to-indigo-50 md:aspect-auto md:w-1/3 lg:w-2/5 dark:from-blue-950 dark:to-indigo-950" />
        )}

        {/* Content container - right side on md+ screens, below image on mobile */}
        <div className="flex flex-col md:w-2/3 lg:w-3/5">
          <CardHeader>
            <div className="text-muted-foreground flex items-center gap-3 text-xs">
              {post.metadata.date && (
                <div className="flex items-center gap-1">
                  <CalendarIcon className="size-3" />
                  <span>{formatDateSafe(post.metadata.date)}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>{readingTime} min read</span>
              </div>
            </div>
            <CardTitle className="group-hover:text-primary line-clamp-2 leading-normal transition-colors">
              {post.metadata.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-secondary-foreground mb-4 line-clamp-2">
              {post.metadata.description}
            </p>

            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <ScrollArea>
                <div className="flex flex-nowrap gap-2">
                  {post.metadata.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-nowrap text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
          </CardContent>

          <CardFooter className="mt-auto pt-0">
            <span className="text-primary text-sm font-medium">Read more</span>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}

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
