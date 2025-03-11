import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@juun/ui';
import Image from 'next/image';
import Link from 'next/link';

// Define the types for our post data
interface PostMetadata {
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  date?: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
}

interface PortfolioCardProps {
  post: Post;
}

export function PortfolioCard({ post }: PortfolioCardProps) {
  // prevent XSS(Cross-site scripting)
  const slug: string | null =
    typeof post.slug === 'string' ? encodeURIComponent(post.slug) : null;

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
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-gradient-to-r from-blue-100 to-indigo-100" />
        )}
        <CardHeader>
          <CardTitle className="line-clamp-1 group-hover:text-blue-600">
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
            <span className="text-xs text-gray-500">{post.metadata.date}</span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
