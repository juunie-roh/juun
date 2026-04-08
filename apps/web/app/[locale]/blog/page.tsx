import type { Locale } from "next-intl";

import BaseInnerLayout from "@/layouts/base-inner";
import MaxWidthLayout from "@/layouts/max-width";
import cache from "@/lib/cache";

import BlogItemsNotFoundAlert from "./_components/alert/items-not-found";
import { BlogCard } from "./_components/card";

export default async function Blog({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  const posts = await cache.post.select.all(locale as Locale);

  return (
    <MaxWidthLayout>
      <BaseInnerLayout>
        {posts.length === 0 ? (
          <div className="flex items-center justify-center">
            <BlogItemsNotFoundAlert />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-4">
            {posts.map((post, index) => (
              <BlogCard metadata={post} index={index} key={post.id} />
            ))}
          </div>
        )}
      </BaseInnerLayout>
    </MaxWidthLayout>
  );
}
