import type { Post } from "@juun/db/post";
import { AspectRatio } from "@juun/ui/aspect-ratio";
import { Skeleton } from "@juun/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";

export default function BlogHeader({
  metadata,
}: {
  metadata: Omit<
    Post,
    "id" | "content" | "category" | "word_count" | "created_at"
  >;
}) {
  return (
    <header className="mx-auto grid grid-cols-responsive place-items-center gap-x-responsive pt-8">
      <div className="col-span-full pt-18 pb-10 lg:col-span-12 lg:col-start-3">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-(family-name:--font-stabil-grotesk-trial,--font-rix) text-4xl font-bold tracking-tight lg:col-span-8">
            {metadata.title}
          </h1>
          <p className="font-(family-name:--font-geist-sans) text-sm lg:col-span-full">
            {metadata.description}
          </p>
        </div>
      </div>
      {metadata.image && (
        <div className="col-span-full w-full lg:col-span-12 lg:col-start-3">
          <AspectRatio ratio={16 / 9} className="w-full bg-muted">
            <Suspense fallback={<Skeleton className="size-full" />}>
              <Image
                src={metadata.image}
                alt={metadata.title}
                className="size-full object-contain"
                fill
              />
            </Suspense>
          </AspectRatio>
        </div>
      )}
    </header>
  );
}
