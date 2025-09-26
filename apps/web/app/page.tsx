import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@juun/ui/carousel";
import { Suspense } from "react";

import { BlogCard, BlogCardSkeleton } from "./blog/_components/card";
import { getPosts } from "./blog/_utils/post";

export default function Home() {
  const posts = getPosts();

  return (
    <main className="w-full p-4">
      <section className="relative w-full">
        <h3 className="font-(family-name:--font-stabil-grotesk-trial) mb-4 text-3xl font-bold tracking-tight">
          Articles
        </h3>
        <Carousel opts={{ align: "start" }} className="w-full px-12">
          <CarouselContent>
            {posts.map((post) => (
              <CarouselItem
                key={post.slug}
                className="basis-[100%] md:basis-1/3"
              >
                <Suspense fallback={<BlogCardSkeleton />} key={post.slug}>
                  <BlogCard post={post} />
                </Suspense>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-0" />
          <CarouselNext className="-right-0" />
        </Carousel>
      </section>
    </main>
  );
}
