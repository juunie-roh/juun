import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@juun/ui/carousel";
import { Suspense } from "react";

import Timeline from "@/components/timeline";
import HeaderOffsetLayout from "@/layouts/header-offset";
import MaxWidthLayout from "@/layouts/max-width";
import cache from "@/lib/cache";

import HeroHome from "./_components/hero-home";
import { BlogCard, BlogCardSkeleton } from "./blog/_components/card";

export default async function Home() {
  const posts = await cache.post.get.all();
  const items = await cache.timeline.get.all();

  return (
    <HeaderOffsetLayout>
      <HeroHome />
      <main className="mb-10 size-full border-y">
        <MaxWidthLayout borderX>
          {/* Decision Records */}
          <section className="relative w-full border-b" id="timeline">
            <div className="flex items-center gap-2 border-b px-4 py-2">
              <h2 className="font-stabil-grotesk text-3xl font-bold tracking-tight">
                Decision Records
              </h2>
              {/* <TimelineOrderButton href="/" order={order} /> */}
            </div>
            <Timeline items={items} />
          </section>

          {/* Blog Articles Carousel */}
          <section className="relative w-full">
            <h2 className="mb-4 border-b px-4 py-2 font-stabil-grotesk text-3xl font-bold tracking-tight">
              Articles
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
        </MaxWidthLayout>
      </main>
    </HeaderOffsetLayout>
  );
}
