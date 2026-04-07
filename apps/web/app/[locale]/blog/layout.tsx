import { Metadata } from "next";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

import HeaderOffsetLayout from "@/layouts/header-offset";
import {
  BASE_URL,
  getCanonicalUrl,
  getLanguageAlternates,
} from "@/utils/server/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "/blog.metadata" });

  const path = "/blog";
  const canonicalUrl = getCanonicalUrl(locale, path);

  const metadata: Metadata = {
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(path),
    },

    title: t("title"),
    description: t("description"),

    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${BASE_URL}/images/juun.png`],
    },
  };

  return metadata;
}

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HeaderOffsetLayout>
      <main className="mx-auto">{children}</main>
    </HeaderOffsetLayout>
  );
}
