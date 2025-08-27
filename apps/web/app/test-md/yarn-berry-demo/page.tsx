import { AspectRatio } from "@juun/ui/aspect-ratio";
import { Skeleton } from "@juun/ui/skeleton";
import { readFile } from "fs/promises";
import Image from "next/image";
import { join } from "path";
import { Suspense } from "react";

import { BlogHeader, BlogHeaderSkeleton } from "@/app/blog/_components/header";
import { BlogMetadata } from "@/app/blog/_utils/post";
import { MarkdownRenderer } from "@/components/md/renderer";
import md from "@/lib/md";

export default async function YarnBerryMarkdownDemo() {
  const markdownPath = join(process.cwd(), "app/test-md/yarn-berry.md");
  const markdownSource = await readFile(markdownPath, "utf-8");

  const { html, data } = await md.parse(markdownSource);

  return (
    <article className="xl:w-3xl mx-auto w-full max-w-3xl px-2 pb-20 pt-4 md:px-8">
      <Suspense fallback={<BlogHeaderSkeleton />}>
        <BlogHeader metadata={data as BlogMetadata} />
      </Suspense>
      {data.image && (
        <AspectRatio
          ratio={16 / 9}
          className="mb-8 size-full rounded-lg bg-[#514c87]"
        >
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src={data.image}
              alt={data.title}
              className="size-full object-contain p-8"
              fill
            />
          </Suspense>
        </AspectRatio>
      )}

      <MarkdownRenderer html={html} />
    </article>
  );
}
