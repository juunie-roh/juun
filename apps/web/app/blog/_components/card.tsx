import { AspectRatio } from "@juun/ui/aspect-ratio";
import { LogoAvatar } from "@juun/ui/logo-avatar";
import { Skeleton } from "@juun/ui/skeleton";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatDateSafe } from "@/utils/date";
import { safeUrl } from "@/utils/security";

import { BlogMetadata } from "../_utils/post";

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
    <Link href={`/blog/${slug}`} className="group block size-full">
      <div className="relative w-full">
        <div className="grid w-full grid-cols-1 gap-4">
          <AspectRatio
            ratio={16 / 9}
            className="bg-muted size-full overflow-hidden"
          >
            {post.metadata.image && (
              <LogoAvatar className="size-full rounded-none">
                <Image
                  src={post.metadata.image}
                  alt={post.metadata.title || "Blog post image"}
                  fill
                  className="size-full object-contain px-2 transition-transform duration-300 group-hover:scale-105"
                />
              </LogoAvatar>
            )}
          </AspectRatio>

          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            {post.metadata.date && (
              <div className="flex items-center gap-1">
                <Calendar className="size-3" />
                <span>{formatDateSafe(post.metadata.date)}</span>
              </div>
            )}
            <div className="ml-auto flex items-center gap-1">
              <Clock className="size-3" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          <div className="w-full max-w-fit text-lg font-bold leading-snug tracking-tight">
            {post.metadata.title}
          </div>

          <div className="mt-auto line-clamp-2 w-full max-w-fit">
            {post.metadata.description}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="group block size-full">
      <div className="relative w-full">
        <div className="grid w-full grid-cols-1 gap-4">
          {/* Image skeleton */}
          <AspectRatio
            ratio={16 / 9}
            className="bg-muted size-full overflow-hidden"
          >
            <Skeleton className="size-full" />
          </AspectRatio>

          {/* Metadata skeleton */}
          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Skeleton className="size-3" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="size-3" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Title skeleton */}
          <div className="w-full max-w-fit">
            <Skeleton className="h-6 w-3/4" />
          </div>

          {/* Description skeleton */}
          <div className="mt-auto w-full max-w-fit space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
