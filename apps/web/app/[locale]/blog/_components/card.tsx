import { Post } from "@juun/db/post";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { LogoAvatar } from "@/components/ui/logo-avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/navigation";
import { safeUrl } from "@/utils/security";
import { capitalize } from "@/utils/string";

export function BlogCard({ metadata }: { metadata: Omit<Post, "content"> }) {
  const f = useFormatter();
  const t = useTranslations("components.blog.card");

  // Prevent XSS (Cross-site scripting)
  const url = safeUrl(`/blog/${metadata.id}`);
  if (url === null) return null;

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
    metadata.description ?? undefined,
    metadata.word_count,
  );

  return (
    <Link href={url} className="group block size-full font-sans">
      <div className="relative w-full">
        <div className="grid w-full grid-cols-1 gap-4">
          <AspectRatio
            ratio={16 / 9}
            className="size-full overflow-hidden bg-muted"
          >
            {metadata.image && (
              <LogoAvatar className="size-full rounded-none">
                <Image
                  src={metadata.image}
                  alt={metadata.title || "Blog post image"}
                  fill
                  className="size-full object-contain px-2 transition-transform duration-300 group-hover:scale-105"
                />
              </LogoAvatar>
            )}
          </AspectRatio>

          <div className="relative flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex flex-wrap justify-self-start">
              <Badge variant="default">
                {capitalize(metadata.category, /[_]+/g)}
              </Badge>
            </div>

            <div className="absolute right-0 flex flex-col items-start">
              <div className="flex items-center gap-1">
                <Calendar className="size-3" />
                <time dateTime={new Date(metadata.created_at).toISOString()}>
                  {f.dateTime(metadata.created_at, "short")}
                </time>
              </div>
              <div className="flex items-center justify-end gap-1">
                <Clock className="size-3" />
                <span>{t("readingTime", { readingTime })}</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-fit font-stabil-grotesk text-2xl leading-snug font-bold tracking-tight lg:text-lg">
            {metadata.title}
          </div>

          <div className="mt-auto w-full max-w-fit">{metadata.description}</div>
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
            className="size-full overflow-hidden bg-muted"
          >
            <Skeleton className="size-full" />
          </AspectRatio>

          {/* Metadata skeleton */}
          <div className="relative flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex flex-wrap justify-self-start">
              <Skeleton className="h-5 w-20" />
            </div>

            <div className="absolute right-0">
              <div className="flex items-center gap-1">
                <Skeleton className="size-3" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex items-center justify-end gap-1">
                <Skeleton className="size-3" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>

          {/* Title skeleton */}
          <div className="w-full max-w-fit font-stabil-grotesk text-2xl leading-snug font-bold tracking-tight lg:text-lg">
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
