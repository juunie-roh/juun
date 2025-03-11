import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@juun/ui';
import { CalendarIcon, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Define the types for our post data
interface PostMetadata {
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  date?: string;
  wordCount?: number; // Total word count of the full post content
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
}

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  // Prevent XSS (Cross-site scripting)
  const slug: string | null =
    typeof post.slug === 'string' ? encodeURIComponent(post.slug) : null;

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
            <div className="aspect-video size-full bg-gray-100 md:aspect-auto">
              <Image
                src={post.metadata.image}
                alt={post.metadata.title || 'Blog post image'}
                width={600}
                height={340}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>
          </div>
        ) : (
          <div className="aspect-video w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 md:aspect-auto md:w-1/3 lg:w-2/5" />
        )}

        {/* Content container - right side on md+ screens, below image on mobile */}
        <div className="flex flex-col md:w-2/3 lg:w-3/5">
          <CardHeader>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              {post.metadata.date && (
                <div className="flex items-center gap-1">
                  <CalendarIcon className="size-3" />
                  <span>{post.metadata.date}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>{readingTime} min read</span>
              </div>
            </div>
            <CardTitle className="line-clamp-2 transition-colors group-hover:text-primary">
              {post.metadata.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-4 line-clamp-2 text-secondary-foreground">
              {post.metadata.description}
            </p>

            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="mt-auto pt-0">
            <span className="text-sm font-medium text-primary">Read more</span>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
