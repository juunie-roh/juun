import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@juun/ui/carousel";
import { Fragment, Suspense } from "react";

import Timeline from "@/components/timeline";
import TimelineOrderButton from "@/components/timeline/order-button";
import cache from "@/lib/cache";

import HeroHome from "./_components/hero-home";
import { BlogCard, BlogCardSkeleton } from "./blog/_components/card";
import { TIMELINE_ITEMS } from "./timeline/_data";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ order?: "asc" | "desc" }>;
}) {
  const params = await searchParams;
  const order = params.order;

  const posts = await cache.post.get.all();

  return (
    <Fragment>
      <HeroHome />
      <main className="mb-10 size-full">
        {/* Decision Records */}
        <section
          className="relative mx-auto w-full max-w-7xl border-x border-b"
          id="timeline"
        >
          <div className="flex items-center gap-2 border-b px-4 py-2">
            <h2 className="font-stabil-grotesk text-3xl font-bold tracking-tight">
              Decision Records
            </h2>
            <TimelineOrderButton href="/" order={order} />
          </div>
          <Timeline items={TIMELINE_ITEMS} order={order} />
        </section>

        {/* Blog Articles */}
        <section className="relative mx-auto w-full max-w-7xl border border-t-0">
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
      </main>
    </Fragment>
  );
}
