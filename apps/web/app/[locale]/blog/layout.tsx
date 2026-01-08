import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import HeaderOffsetLayout from "@/layouts/header-offset";
import {
  BASE_URL,
  getCanonicalUrl,
  getLanguageAlternates,
} from "@/utils/server/metadata";

export async function generateMetadata() {
  const t = await getTranslations("metadata./blog");

  const path = "/blog";
  const canonicalUrl = await getCanonicalUrl(path);

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
