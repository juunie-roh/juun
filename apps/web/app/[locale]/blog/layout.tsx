import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import HeaderOffsetLayout from "@/layouts/header-offset";
import {
  BASE_URL,
  getCanonicalUrl,
  getLanguageAlternates,
} from "@/utils/server/metadata";
import { validateParams } from "@/utils/server/validate";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const validated = await validateParams(params);
  if (!validated) return {};

  const { locale } = validated;
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
}: LayoutProps<"/[locale]/blog">) {
  return (
    <HeaderOffsetLayout>
      <main className="mx-auto">{children}</main>
    </HeaderOffsetLayout>
  );
}
