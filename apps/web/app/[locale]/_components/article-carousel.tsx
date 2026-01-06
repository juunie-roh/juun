import { Post } from "@juun/db/post";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { BlogCard, BlogCardSkeleton } from "../blog/_components/card";

export default function ArticleCarousel({
  posts,
}: {
  posts: Omit<Post, "content">[];
}) {
  return (
    <Carousel opts={{ align: "start" }} className="w-full px-12">
      <CarouselContent>
        {posts.map((post) => (
          <CarouselItem key={post.id} className="basis-full lg:basis-1/3">
            <React.Suspense fallback={<BlogCardSkeleton />} key={post.id}>
              <BlogCard metadata={post} />
            </React.Suspense>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
