import { AspectRatio, Skeleton } from '@juun/ui';
import Image from 'next/image';
import { Fragment, Suspense } from 'react';

import { BlogHeader, BlogHeaderSkeleton } from '@/components/blog/header';

export const metadata = {
  title: 'Monorepo Migration with Turborepo',
  description: '한글 폰트 테스트',
  date: '2025-03-13',
  tags: ['Next.js', 'Turborepo', 'Monorepo'],
  image: '/images/logo/turborepo-logo.svg',
};

export default function FontTest() {
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
              className="size-full object-cover"
              fill
            />
          </Suspense>
        </AspectRatio>
      )}

      <div className="prose mt-8 max-w-none text-primary">
        <h2>Monorepo</h2>
        <p>하이</p>
      </div>
    </Fragment>
  );
}
