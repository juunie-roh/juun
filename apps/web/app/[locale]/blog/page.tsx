import { Suspense } from "react";

import BaseInnerLayout from "@/layouts/base-inner";
import MaxWidthLayout from "@/layouts/max-width";
import cache from "@/lib/cache";

import BlogItemsNotFoundAlert from "./_components/alert/items-not-found";
import { BlogCard, BlogCardSkeleton } from "./_components/card";

export default async function Blog() {
  const posts = await cache.post.select.all();

  return (
    <MaxWidthLayout>
      <BaseInnerLayout>
        {posts.length === 0 ? (
          <div className="flex items-center justify-center">
            <BlogItemsNotFoundAlert />
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
      </BaseInnerLayout>
    </MaxWidthLayout>
  );
}
