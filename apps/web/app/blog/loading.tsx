import { BlogCardSkeleton } from '@/components/blog/card-skeleton';

export default function BlogLoading() {
  // Create an array to render multiple skeleton cards (reduced to 4 for horizontal layout)
  const skeletonCards = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <div className="flex flex-col space-y-6">
        {skeletonCards.map((index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
