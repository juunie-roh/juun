import Image from "next/image";
import { Suspense } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogHeaderProps {
  metadata: {
    title: string;
    description: string | null;
    image: string | null;
  };
}

export default function BlogHeader({ metadata }: BlogHeaderProps) {
  return (
    <header className="mx-auto grid grid-cols-responsive place-items-center gap-x-responsive pt-8">
      <div className="col-span-full pt-18 pb-10 lg:col-span-12 lg:col-start-3">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-stabil-grotesk text-4xl font-bold tracking-tight lg:col-span-8">
            {metadata.title}
          </h1>
          <p className="font-sans text-sm lg:col-span-full">
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
