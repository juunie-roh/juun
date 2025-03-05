import { getPosts } from './util';

export default function Portfolio() {
  const posts = getPosts();

  return (
    <div className="space-y-12">
      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
          <h3 className="mb-2 text-lg font-medium">No blog items yet</h3>
          <p className="text-gray-500">
            Your blog items will appear here once you add them to the posts
            directory.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* {posts.map((post) => (
            <PortfolioCard key={post.slug} post={post} />
          ))} */}
        </div>
      )}
    </div>
  );
}
