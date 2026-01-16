import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter, getLocale } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Prose } from "@/components/ui/prose";
import { Link } from "@/i18n/navigation";
import cache from "@/lib/cache";
import md from "@/lib/server/md";
import {
  getCanonicalUrl,
  getLanguageAlternates,
} from "@/utils/server/metadata";

export async function generateStaticParams() {
  const items = await cache.timeline.select.all();

  return items.map((item) => ({
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

  const path = `/timeline/${id}`;
  const { title, tags, category, created_at, updated_at } = item;
  const { description } = item.translation;
  const canonicalUrl = await getCanonicalUrl(path);

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(path),
    },

    title,
    description,
    keywords: tags,
    authors: [{ name: "Juun", url: "https://juun.vercel.app" }],

    openGraph: {
      type: "article",
      title,
      description,
      siteName: "Juun's Playground",
      url: canonicalUrl,
      tags,

      publishedTime: created_at.toISOString(),
      modifiedTime: updated_at.toISOString(),
      authors: ["Juun Roh"],
      section: category,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  } satisfies Metadata;
}

export default async function TimelineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const locale = await getLocale();
  const { id } = await params;
  const item = await cache.timeline.select.byId(Number(id), locale);

  if (!item) notFound();

  const parsed = await md.parse(item.translation.content);
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
          {item.category} •{" "}
          <time dateTime={item.created_at.toISOString()}>
            {f.dateTime(item.created_at, "long")}
          </time>
        </p>
      </header>

      <Prose>{md.render(parsed)}</Prose>
    </article>
  );
}
