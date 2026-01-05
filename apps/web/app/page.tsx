import { Suspense } from "react";

import Timeline from "@/components/timeline";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HeaderOffsetLayout from "@/layouts/header-offset";
import MaxWidthLayout from "@/layouts/max-width";
import cache from "@/lib/cache";

import { BlogCard, BlogCardSkeleton } from "./blog/_components/card";

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
              <Carousel opts={{ align: "start" }} className="w-full px-12">
                <CarouselContent>
                  {posts.map((post) => (
                    <CarouselItem
                      key={post.id}
                      className="basis-full md:basis-1/3"
                    >
                      <Suspense fallback={<BlogCardSkeleton />} key={post.id}>
                        <BlogCard metadata={post} />
                      </Suspense>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
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
