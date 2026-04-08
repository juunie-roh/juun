import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

import Timeline from "@/components/timeline";
import HeaderOffsetLayout from "@/layouts/header-offset";
import MaxWidthLayout from "@/layouts/max-width";
import cache from "@/lib/cache";
import {
  BASE_URL,
  getCanonicalUrl,
  getLanguageAlternates,
} from "@/utils/server/metadata";

import ArticleCarousel from "./_components/article-carousel";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale: l } = await params;
  const locale = l as Locale;
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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const posts = await cache.post.select.byCategory("ANALYSIS", locale);
  const items = await cache.timeline.select.all("desc", locale);

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
            <div className="flex items-center gap-2 border-b px-4 py-2">
              <h2 className="font-stabil-grotesk text-3xl font-bold tracking-tight">
                Decision Records
              </h2>
              {/* <TimelineOrderButton href="/" order={order} /> */}
            </div>
            <Timeline items={items} />
          </section>
        </MaxWidthLayout>
      </main>
    </HeaderOffsetLayout>
  );
}
