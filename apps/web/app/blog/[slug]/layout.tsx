import { ScrollProgressBar } from '@pkg/ui';

import { TableOfContents } from '@/components/blog/table-of-contents';

export default function BlogItemLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative grid min-h-screen w-full grid-cols-1 xl:grid-cols-[1fr_min-content_1fr]">
      <ScrollProgressBar />
      <div className="xl:hidden">
        <TableOfContents
          className="fixed right-5 top-20 z-40 mb-6 mt-2"
          contentSelector=".prose"
          headingSelector="h2, h3"
        />
      </div>

      <aside className="hidden xl:block" />
      <article className="mx-auto w-full max-w-3xl px-4 pb-20 pt-4 md:px-8 xl:w-[48rem]">
        {children}
      </article>
      <aside className="hidden xl:block">
        <TableOfContents
          className="sticky left-0 top-1/4 max-w-64"
          contentSelector=".prose"
          headingSelector="h2, h3"
        />
      </aside>
    </div>
  );
}
