import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getPosts } from './util';

export default function Portfolio() {
  const posts = getPosts();

  return (
    <div className="space-y-12">
      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium">No portfolio items yet</h3>
          <p className="text-gray-500">
            Your portfolio items will appear here once you add them to the posts
            directory.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              href={`/portfolio/${post.slug}`}
              key={post.slug}
              className="group block"
            >
              <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
                {post.metadata.image ? (
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    <div
                      className="size-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.metadata.image})` }}
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gradient-to-r from-blue-100 to-indigo-100" />
                )}

                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-blue-600">
                    {post.metadata.title}
                  </CardTitle>
                  {post.metadata.description && (
                    <p className="line-clamp-3 text-secondary-foreground">
                      {post.metadata.description}
                    </p>
                  )}
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
                    <span className="text-xs text-gray-500">
                      {post.metadata.date}
                    </span>
                  )}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
