import { Suspense } from "react";

import cache from "@/lib/cache";

import { BlogCard, BlogCardSkeleton } from "./_components/card";

export default async function Blog() {
  const posts = await cache.post.get.all();

  return (
    <main className="mx-auto px-4">
      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium">No blog posts yet</h3>
          <p className="text-gray-500">
            Your blog posts will appear here once you add them to the posts
            directory.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-4">
          {posts.map((post) => (
            <Suspense fallback={<BlogCardSkeleton />} key={post.id}>
              <BlogCard metadata={post} />
            </Suspense>
          ))}
        </div>
      )}
    </main>
  );
}
