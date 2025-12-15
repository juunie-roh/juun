import { Metadata } from "next";
import { notFound } from "next/navigation";

import TimelineDialog from "@/components/timeline/dialog";
import cache from "@/lib/cache";
import md from "@/lib/md";

export async function generateStaticParams() {
  return (await cache.timeline.get.all()).map((item) => ({
    id: item.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await cache.timeline.get.byId(Number(id));

  if (!item) return {} satisfies Metadata;

  return {
    title: item.title,
    description: item.description,
    keywords: item.tags,
    openGraph: {
      type: "article",
      title: item.title,
      description: item.description,
      siteName: `Juun - Timeline Detail`,
      images: ["/images/juun.png"],
      url: `https://juun.vercel.app/timeline/${item.id}`,
    },
  } satisfies Metadata;
}

export default async function HomeTimelineDialog({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await cache.timeline.get.byId(Number(id));

  if (!item?.detail) notFound();

  const parsed = await md.parse(item.detail);

  return <TimelineDialog item={item}>{md.render(parsed)}</TimelineDialog>;
}
