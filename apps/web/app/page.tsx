import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@juun/ui/carousel";
import { Marquee } from "@juun/ui/marquee";
import { Suspense } from "react";

import ConfirmWheel from "@/components/wheel/ConfirmWheel";
import FiveWheel from "@/components/wheel/FiveWheel";
import FourWheel from "@/components/wheel/FourWheel";

import { BlogCard, BlogCardSkeleton } from "./blog/_components/card";
import { getPosts } from "./blog/_utils/post";

export default function Home() {
  const posts = getPosts();

  return (
    <main className="w-full p-4">
      <Marquee>
        <span className="mx-4 text-4xl">Marquee Item 1</span>
        <span className="mx-4 text-4xl">Marquee Item 2</span>
        <span className="mx-4 text-4xl">Marquee Item 3</span>
        <span className="mx-4 text-4xl">Marquee Item 4</span>
        <span className="mx-4 text-4xl">Marquee Item 5</span>
      </Marquee>
      <Marquee direction="right">
        <span className="mx-4 text-4xl">Marquee Item 1</span>
        <span className="mx-4 text-4xl">Marquee Item 2</span>
        <span className="mx-4 text-4xl">Marquee Item 3</span>
        <span className="mx-4 text-4xl">Marquee Item 4</span>
        <span className="mx-4 text-4xl">Marquee Item 5</span>
      </Marquee>
      <div className="flex w-full flex-col items-center justify-center md:flex-row">
        <ConfirmWheel />
        <FourWheel />
        <FiveWheel />
      </div>
      <div className="relative w-full">
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
      </div>
    </main>
  );
}
