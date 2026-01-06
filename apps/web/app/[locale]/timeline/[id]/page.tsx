import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter, getLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Prose } from "@/components/ui/prose";
import { Link } from "@/i18n/navigation";
import cache from "@/lib/cache";
import md from "@/lib/server/md";

export default async function TimelineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const locale = await getLocale();
  const { id } = await params;
  const item = await cache.timeline.get.byId(Number(id));

  if (!item) notFound();

  const parsed = await md.parse(item.detail);
  const f = await getFormatter({ locale });

  return (
    <article className="mx-auto max-w-4xl p-8">
      <Button asChild>
        <Link href="/">
          <ChevronLeft />
          Return
        </Link>
      </Button>

      <header className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">{item.title}</h1>
        <p className="text-muted-foreground">
          {item.category} • {f.dateTime(item.created_at, "long")}
        </p>
      </header>

      <Prose>{md.render(parsed)}</Prose>
    </article>
  );
}

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
