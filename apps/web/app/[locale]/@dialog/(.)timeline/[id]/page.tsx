import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";

import TimelineDialog from "@/components/timeline/dialog";
import cache from "@/lib/cache";
import md from "@/lib/server/md";
import { validateId } from "@/utils/validation";

export async function generateStaticParams() {
  return (await cache.timeline.select.all()).map((item) => ({
    id: item.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/timeline/[id]">): Promise<Metadata> {
  const id = validateId((await params).id);
  if (!id) return {} satisfies Metadata;

  const { locale } = await params;
  const item = await cache.timeline.select.byId(id, locale as Locale);

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
}: PageProps<"/[locale]/timeline/[id]">) {
  const id = validateId((await params).id);
  if (!id) notFound();

  const { locale } = await params;
  const item = await cache.timeline.select.byId(id, locale as Locale);

  if (!item?.translation.content) notFound();

  const parsed = await md.parse(item.translation.content);

  return <TimelineDialog item={item}>{md.render(parsed)}</TimelineDialog>;
}
