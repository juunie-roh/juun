import { Suspense } from "react";

import { PortfolioCard, PortfolioCardSkeleton } from "./_components/card";
import { getPosts } from "./utils";

export default function Playground() {
  const posts = getPosts();

  return posts.length === 0 ? (
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
        <Suspense fallback={<PortfolioCardSkeleton />} key={post.slug}>
          <PortfolioCard post={post} />
        </Suspense>
      ))}
    </div>
  );
}
