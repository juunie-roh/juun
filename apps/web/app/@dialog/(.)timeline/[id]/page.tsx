import { Metadata } from "next";
import { notFound } from "next/navigation";

import { TIMELINE_ITEMS } from "@/app/timeline/_data";
import TimelineDialog from "@/components/timeline/dialog";
import md from "@/lib/md";

export default async function HomeTimelineDialog({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = TIMELINE_ITEMS.find((i) => i.id === parseInt(id));

  if (!item?.detail) notFound();

  const parsed = await md.parse(item.detail);

  return <TimelineDialog item={item}>{md.render(parsed)}</TimelineDialog>;
}

export async function generateStaticParams() {
  return TIMELINE_ITEMS.filter((item) => item.detail).map((item) => ({
    id: item.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = TIMELINE_ITEMS.find((item) => item.id === parseInt(id));

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
