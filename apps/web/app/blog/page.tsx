import { Suspense } from "react";

import { BlogCard, BlogCardSkeleton } from "./_components/card";
import { getPosts } from "./_utils/post";

export default function Blog() {
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium">No blog posts yet</h3>
          <p className="text-gray-500">
            Your blog posts will appear here once you add them to the posts
            directory.
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
          {posts.map((post) => (
            <Suspense fallback={<BlogCardSkeleton />} key={post.slug}>
              <BlogCard post={post} />
            </Suspense>
          ))}
        </div>
      )}
    </div>
  );
}
