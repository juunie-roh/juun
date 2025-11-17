import { Button } from "@juun/ui/button";
import { cn } from "@juun/ui/lib/utils";
import { Skeleton } from "@juun/ui/skeleton";
import {
  Box,
  Calendar,
  ChevronRight,
  ImageOff,
  PanelLeftDashed,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import md from "@/lib/md";
import { formatDateSafe } from "@/utils/date";

import { PlaygroundCategory, PlaygroundItem as Item } from "../_data";

export default async function PlaygroundItem({
  title,
  description,
  date,
  category,
  href,
  image,
  imageStyle,
  className,
}: Item & { className?: string }) {
  const IconMap: Record<PlaygroundCategory, React.JSX.Element> = {
    "3D": <Box />,
    UI: <PanelLeftDashed />,
    CMS: <Workflow />,
  };

  return (
    <article
      className={cn(
        "relative flex w-full flex-col-reverse border-y bg-background md:flex-row",
        className,
      )}
    >
      {/* Text section */}
      <div className="flex w-full basis-1/2 flex-col">
        {/* Category Header */}
        <header className="flex w-full items-center gap-2 border-b-2 border-dashed px-8 py-[18px]">
          <div className="rounded bg-primary p-0.5 text-primary-foreground [&>svg]:size-[18px]">
            {IconMap[category]}
          </div>
          <span className="text-lg leading-none font-semibold tracking-tight">
            {category}
          </span>
        </header>
        <div className="me-0 flex flex-1 flex-col gap-4 p-8 group-hover:underline sm:me-8">
          <h2 className="font-stabil-grotesk text-3xl font-bold tracking-tight">
            {title}
          </h2>
          {md.render(await md.parse(description))}
          <footer className="flex items-center justify-between">
            {/* Date */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="inline-block size-4" />
              {formatDateSafe(date)}
            </div>
            {/* Link */}
            <Button variant="link" asChild className="w-fit">
              <Link href={href}>
                See more <ChevronRight />
              </Link>
            </Button>
          </footer>
        </div>
      </div>

      {/* Image section */}
      <div className="relative min-h-96 w-full basis-1/2 bg-muted sm:min-h-0">
        {image ? (
          // If image exists
          <React.Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src={image}
              alt={`${title} Thumbnail`}
              fill
              style={imageStyle}
            />
          </React.Suspense>
        ) : (
          // No image, defaults to:
          <div className="flex size-full min-h-96 items-center justify-center sm:min-h-0">
            <ImageOff className="size-10 text-muted-foreground" />
          </div>
        )}
      </div>
    </article>
  );
}
