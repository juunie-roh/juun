import { getPosts } from './util';

export default function Portfolio() {
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <div className="relative flex flex-col gap-8">
        {posts.length === 0 ? (
          <div className="absolute w-full rounded-lg border border-dashed border-gray-500 p-12 text-center">
            <span className="mb-2 text-lg font-medium">No blog items yet</span>
            <p className="text-gray-500">
              Your blog items will appear here once you add them to the posts
              directory.
            </p>
          </div>
        ) : (
          <div>
            {/* {posts.map((post) => (
            <PortfolioCard key={post.slug} post={post} />
          ))} */}
          </div>
        )}
      </div>
    </div>
  );
}
