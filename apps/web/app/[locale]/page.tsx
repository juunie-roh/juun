import Timeline from "@/components/timeline";
import HeaderOffsetLayout from "@/layouts/header-offset";
import MaxWidthLayout from "@/layouts/max-width";
import cache from "@/lib/cache";

import ArticleCarousel from "./_components/article-carousel";

export default async function Home() {
  const posts = await cache.post.get.byCategory("ANALYSIS");
  const items = await cache.timeline.get.all();

  return (
    <HeaderOffsetLayout>
      {/* <HeroHome /> */}
      <main className="my-10 size-full border-y">
        <MaxWidthLayout borderX>
          {/* Blog Articles Carousel */}
          <section className="relative w-full border-b">
            <h2 className="mb-4 border-b px-4 py-2 font-stabil-grotesk text-3xl font-bold tracking-tight">
              Featured Articles
            </h2>
            <div className="px-4">
              <ArticleCarousel posts={posts} />
            </div>
          </section>

          {/* Decision Records */}
          <section className="relative w-full" id="timeline">
            <div className="flex items-center gap-2 border-b px-4 py-2">
              <h2 className="font-stabil-grotesk text-3xl font-bold tracking-tight">
                Decision Records
              </h2>
              {/* <TimelineOrderButton href="/" order={order} /> */}
            </div>
            <Timeline items={items} />
          </section>
        </MaxWidthLayout>
      </main>
    </HeaderOffsetLayout>
  );
}
