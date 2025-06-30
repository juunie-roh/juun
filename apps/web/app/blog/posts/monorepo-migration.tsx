import { AspectRatio } from '@pkg/ui/aspect-ratio';
import { Skeleton } from '@pkg/ui/skeleton';
import Image from 'next/image';
import { Fragment, Suspense } from 'react';

import { BlogHeader, BlogHeaderSkeleton } from '@/components/blog/header';

export const metadata = {
  title: 'Monorepo Migration with Turborepo',
  description: `How I've migrated the project to monorepo structure.`,
  date: '2025-03-13',
  tags: ['Next.js', 'Turborepo', 'Monorepo', 'Yarn Berry'],
  image: '/images/logo/turborepo.svg',
};

export default function MonorepoMigration() {
  return (
    <Fragment>
      <Suspense fallback={<BlogHeaderSkeleton />}>
        <BlogHeader metadata={metadata} />
      </Suspense>
      {metadata.image && (
        <AspectRatio
          ratio={16 / 9}
          className="mb-8 size-full rounded-lg bg-gray-100"
        >
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src={metadata.image}
              alt={metadata.title}
              className="size-full object-contain"
              fill
            />
          </Suspense>
        </AspectRatio>
      )}

      <div className="prose mt-8 max-w-none text-primary">
        <h2>Monorepo</h2>
        <p>Nextjs</p>
      </div>
    </Fragment>
  );
}
