import { PortfolioCardSkeleton } from '@/components/portfolio/card-skeleton';

export default function PortfolioLoading() {
  // Create an array to render multiple skeleton cards
  const skeletonCards = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skeletonCards.map((index) => (
          <div key={index} className="group block">
            <PortfolioCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
