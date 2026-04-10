import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter } from "next-intl/server";

import { Prose } from "@/components/ui/prose";
import cache from "@/lib/cache";
import md from "@/lib/server/md";
import {
  getCanonicalUrl,
  getLanguageAlternates,
} from "@/utils/server/metadata";
import { validateParams } from "@/utils/server/validate";

export async function generateStaticParams() {
  const items = await cache.timeline.select.all();

  return items.map((item) => ({
    id: item.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/timeline/[id]">): Promise<Metadata> {
  const validated = await validateParams(params);
  if (!validated) return {} satisfies Metadata;

  const { id, locale } = validated;
  const item = await cache.timeline.select.byId(id, locale);

  if (!item) return {} satisfies Metadata;

  const path = `/timeline/${id}`;
  const { title, tags, category, created_at, updated_at } = item;
  const { description } = item.translation;
  const canonicalUrl = getCanonicalUrl(locale, path);

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
}: PageProps<"/[locale]/timeline/[id]">) {
  const validated = await validateParams(params);
  if (!validated) notFound();

  const { id, locale } = validated;

  const item = await cache.timeline.select.byId(id, locale);

  if (!item) notFound();

  const [parsed, f] = await Promise.all([
    md.parse(item.translation.content),
    getFormatter({ locale }),
  ]);

  return (
    <article className="mx-auto max-w-4xl p-8">
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
