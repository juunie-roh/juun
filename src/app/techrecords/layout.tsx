import type { Metadata } from 'next';

import InnerLayout from '@/layouts/InnerLayout';

export const metadata: Metadata = {
  title: 'Tech Records',
  description: 'Simple records',
};

export default function PostListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh">
      <InnerLayout>{children}</InnerLayout>
    </div>
  );
}
