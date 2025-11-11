import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@juun/ui/carousel";
import { Fragment, Suspense } from "react";

import cache from "@/lib/cache";

import HeroHome from "./_components/hero-home";
import { BlogCard, BlogCardSkeleton } from "./blog/_components/card";

export default async function Home() {
  const posts = await cache.post.get.all();

  return (
    <Fragment>
      <HeroHome />
      <main className="w-full p-4">
        <section className="relative mx-auto w-full max-w-7xl">
          <h2 className="mb-4 font-stabil-grotesk text-3xl font-bold tracking-tight">
            Articles
          </h2>
          <Carousel opts={{ align: "start" }} className="w-full px-12">
            <CarouselContent>
              {posts.map((post) => (
                <CarouselItem key={post.id} className="basis-full md:basis-1/3">
                  <Suspense fallback={<BlogCardSkeleton />} key={post.id}>
                    <BlogCard metadata={post} />
                  </Suspense>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </section>
      </main>
    </Fragment>
  );
}
