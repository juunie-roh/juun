import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import TimelineDialog from "@/components/timeline/dialog";
import cache from "@/lib/cache";
import md from "@/lib/server/md";

export async function generateStaticParams() {
  return (await cache.timeline.select.all()).map((item) => ({
    id: item.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const locale = await getLocale();
  const { id } = await params;
  const item = await cache.timeline.select.byId(Number(id), locale);

  if (!item) return {} satisfies Metadata;

  const { title } = item;
  const { description } = item.translation;

  return {
    title,
    description,
    keywords: item.tags,
    openGraph: {
      type: "article",
      title,
      description,
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
  const locale = await getLocale();
  const { id } = await params;
  const item = await cache.timeline.select.byId(Number(id), locale);

  if (!item?.translation.content) notFound();

  const parsed = await md.parse(item.translation.content);

  return <TimelineDialog item={item}>{md.render(parsed)}</TimelineDialog>;
}
