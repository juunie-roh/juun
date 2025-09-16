import { AspectRatio } from "@juun/ui/aspect-ratio";
import { Skeleton } from "@juun/ui/skeleton";
import Image from "next/image";
import { Suspense } from "react";

import { BlogMetadata } from "../_utils/post";

export function BlogHeader({ metadata }: { metadata: BlogMetadata }) {
  return (
    <section>
      <div className="md:grid-cols-16 mx-auto grid grid-cols-12 place-items-center gap-4 px-4 pt-8 md:gap-8">
        <div className="pt-18 col-span-full pb-10 lg:col-span-12 lg:col-start-3">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-4xl font-bold tracking-tighter lg:col-span-8">
              {metadata.title}
            </h1>
            <p className="text-sm lg:col-span-full">{metadata.description}</p>
          </div>
        </div>
        {metadata.image && (
          <div className="col-span-full w-full lg:col-span-12 lg:col-start-3">
            <AspectRatio ratio={16 / 9} className="w-full">
              <Suspense fallback={<Skeleton className="size-full" />}>
                <Image
                  src={metadata.image}
                  alt={metadata.title}
                  className="size-full object-fill"
                  fill
                />
              </Suspense>
            </AspectRatio>
          </div>
        )}
      </div>
    </section>
  );
}
