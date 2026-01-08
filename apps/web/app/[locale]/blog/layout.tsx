import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { BASE_URL } from "@/constants";
import HeaderOffsetLayout from "@/layouts/header-offset";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations("metadata./blog");
  const url = `${BASE_URL}/${locale}/blog`;

  const metadata: Metadata = {
    alternates: { canonical: url },

    title: t("title"),
    description: t("description"),

    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
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
