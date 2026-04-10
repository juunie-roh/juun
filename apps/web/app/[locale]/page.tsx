import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";

import EntriesList from "@/components/timeline/entries";
import HeaderOffsetLayout from "@/layouts/header-offset";
import MaxWidthLayout from "@/layouts/max-width";
import cache from "@/lib/cache";
import {
  BASE_URL,
  getCanonicalUrl,
  getLanguageAlternates,
} from "@/utils/server/metadata";
import { validateParams } from "@/utils/server/validate";

import ArticleCarousel from "./_components/article-carousel";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const validated = await validateParams(params);
  if (!validated) return {};

  const { locale } = validated;
  const t = await getTranslations({ locale, namespace: "/.metadata" });
  const canonicalUrl = getCanonicalUrl(locale as Locale);
  const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(),
    },

    title: { template: t("title.template"), default: t("title.default") },
    description: t("description"),
    applicationName: t("applicationName"),
    authors: [{ name: "Juun", url: "https://github.com/juunie-roh/juun" }],
    // generator: "Next.js",
    keywords: [
      "react",
      "server components",
      "ssr",
      "Juun",
      "playground",
      "monorepo",
      "turborepo",
      "tailwindcss",
      "shadcn/ui",
      "next",
    ],

    openGraph: {
      type: "website",
      title: { template: t("title.template"), default: t("title.default") },
      description: t("description"),
      siteName: t("openGraph.siteName"),
      images: [`${BASE_URL}/images/juun.png`],
      url: canonicalUrl,
    },

    twitter: {
      card: "summary_large_image",
      title: { template: t("title.template"), default: t("title.default") },
      description: t("description"),
      // creator: "@juun_roh", // if you have a Twitter handle
      images: [`${BASE_URL}/images/juun.png`],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    icons: {
      icon: "/favicon.ico",
      // shortcut: "/favicon-16x16.png",
      // apple: "/apple-touch-icon.png",
    },

    verification: {
      google: "DSWX9T0ryTPX662pi_ffZ-CXOJglx8olV7olIsOHfBg",
    },
  };

  return metadata;
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const validated = await validateParams(params);
  if (!validated) return notFound();

  const { locale } = validated;
  const [posts, items, f] = await Promise.all([
    cache.post.select.byCategory("ANALYSIS", locale),
    cache.timeline.select.all("desc", locale),
    getFormatter({ locale }),
  ]);

  const entries = items.map((item) => ({
    ...item,
    formattedDate: f.dateTime(item.created_at, {
      month: "short",
      year: "numeric",
    }),
  }));

  return (
    <HeaderOffsetLayout>
      {/* <HeroHome /> */}
      <main className="my-10 size-full border-y">
        <MaxWidthLayout borderX>
          {/* Blog Articles Carousel */}
          <section className="relative w-full border-b">
            <h2 className="mb-4 border-b px-4 py-2 font-stabil-grotesk text-3xl font-bold tracking-tight">
              Featured Articles
            </h2>
            <div className="px-4">
              <ArticleCarousel posts={posts} />
            </div>
          </section>

          {/* Decision Records */}
          <section className="relative w-full" id="timeline">
            <header className="flex flex-col gap-3 border-b px-4 py-8 md:px-6 md:py-12">
              <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
                Index
              </span>
              <h1 className="font-stabil-grotesk text-4xl leading-none font-bold tracking-tight md:text-6xl">
                Decision Records
              </h1>
              <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
                Architectural and product decisions across the project's
                development
              </p>
            </header>

            {entries.length === 0 ? (
              <div className="px-4 py-16 text-center text-sm text-muted-foreground md:px-6">
                No records yet.
              </div>
            ) : (
              <EntriesList items={entries} />
            )}
          </section>
        </MaxWidthLayout>
      </main>
    </HeaderOffsetLayout>
  );
}
