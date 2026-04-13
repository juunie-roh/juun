import { ArrowUpRight } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Prose } from "@/components/ui/prose";
import { Link } from "@/i18n/navigation";
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
    <article className="relative">
      {/* Hero header */}
      <header className="flex min-h-[40vh] flex-col border-b md:flex-row">
        {/* Primary aside: id + date */}
        <aside className="flex w-full shrink-0 items-end justify-between bg-primary p-6 text-background md:w-40 md:flex-col md:p-8">
          <span className="font-stabil-grotesk text-5xl leading-none font-bold tracking-tight underline underline-offset-8 md:text-6xl">
            {item.id.toString().padStart(3, "0")}
          </span>
          <time
            dateTime={new Date(item.created_at).toISOString()}
            className="font-victor-serif text-sm md:text-base"
          >
            {f.dateTime(item.created_at, {
              month: "short",
              year: "numeric",
            })}
          </time>
        </aside>

        {/* Title + description + meta */}
        <div className="flex flex-1 flex-col justify-between gap-6 px-4 py-8 md:px-10 md:py-12">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {item.category}
            </span>
            <h1 className="font-stabil-grotesk text-3xl leading-tight font-bold tracking-tight md:text-5xl">
              {item.title}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              {item.translation.description}
            </p>
          </div>

          {(item.tags.length > 0 || item.article || item.playground) && (
            <div className="flex flex-wrap items-center gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.article && (
                <Link
                  href={item.article}
                  prefetch
                  className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:underline"
                >
                  Article
                  <ArrowUpRight className="size-3" />
                </Link>
              )}
              {item.playground && (
                <Link
                  href={item.playground}
                  prefetch
                  className="inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:underline"
                >
                  Playground
                  <ArrowUpRight className="size-3" />
                </Link>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Prose content */}
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <Prose>{md.render(parsed)}</Prose>
      </section>

      {/* Footer meta */}
      <footer className="mx-auto max-w-3xl border-t px-4 py-8 md:px-6">
        <dl className="flex flex-col gap-2 font-mono text-xs text-muted-foreground md:flex-row md:gap-6">
          <div className="flex gap-2">
            <dt className="tracking-widest uppercase">Created</dt>
            <dd>
              <time dateTime={item.created_at.toISOString()}>
                {f.dateTime(item.created_at, "long")}
              </time>
            </dd>
          </div>
          {item.updated_at.getTime() !== item.created_at.getTime() && (
            <div className="flex gap-2">
              <dt className="tracking-widest uppercase">Updated</dt>
              <dd>
                <time dateTime={item.updated_at.toISOString()}>
                  {f.dateTime(item.updated_at, "long")}
                </time>
              </dd>
            </div>
          )}
        </dl>
      </footer>
    </article>
  );
}
