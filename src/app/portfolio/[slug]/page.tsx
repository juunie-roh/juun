'use client';

import { Button } from '@juun/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Convert to client component with appropriate error handling
export default function PortfolioItemPage() {
  const params = useParams();
  const router = useRouter();
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadComponent() {
      if (!params || !params.slug) {
        router.push('/portfolio');
        return;
      }

      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

      try {
        // Dynamic import in client component
        const portfolio = await import(`../posts/${slug}.tsx`);
        if (portfolio.default) {
          setComponent(() => portfolio.default);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading portfolio item:', err);
        setError(true);
      }
    }

    loadComponent();
  }, [params, router]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tighter">
          Project Not Found
        </h2>
        <p className="mb-8 text-secondary-foreground">
          Sorry, the portfolio project you're looking for doesn't exist or has
          been removed.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 size-4" />
            Return to Portfolio
          </Link>
        </Button>
      </div>
    );
  }

  if (!Component) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 size-4" />
            Back to Portfolio
          </Link>
        </Button>
      </div>

      {/* Render the post component */}
      <Component />
    </div>
  );
}
