'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '@/components/ui/button';

// Convert to client component with appropriate error handling
export default function PortfolioItemPage() {
  const params = useParams();
  const router = useRouter();
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    }

    loadComponent();
  }, [params, router]);

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-y-2 border-blue-500"></div>
      </div>
    );
  }

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
        <Link
          href="/portfolio"
          className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>
      </div>

      {/* Render the post component */}
      <Component />
    </div>
  );
}
