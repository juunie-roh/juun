import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { BASE_URL } from "@/constants";
import BaseInnerLayout from "@/layouts/base-inner";
import HeaderOffsetLayout from "@/layouts/header-offset";
import MaxWidthLayout from "@/layouts/max-width";
import md from "@/lib/server/md";

import PlaygroundItem from "./_components/item";
import { PLAYGROUND_ITEMS } from "./_data";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("metadata./playground");

  const url = `${BASE_URL}/${locale}/playground`;

  return {
    alternates: { canonical: url },

    title: t("title"),
    description: t("description"),

    openGraph: {
      title: t("title"),
      description: t("description"),
      url,
      images: [`${BASE_URL}/images/juun.png`],
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${BASE_URL}/images/juun.png`],
    },
  } satisfies Metadata;
}

export default async function Playground() {
  const items = await Promise.all(
    PLAYGROUND_ITEMS.map(async (item) => ({
      ...item,
      description: md.render(await md.parse(item.description)),
    })),
  );

  return (
    <HeaderOffsetLayout>
      <MaxWidthLayout>
        <BaseInnerLayout>
          <main>
            <div className="flex flex-col gap-8 border bg-(image:--bg-dashed) py-8">
              {items.length === 0 ? (
                <PlaygroundItem
                  title="No Items Found"
                  category="Not Found"
                  description={<>No items available!</>}
                  date={new Date("1900-01-01")}
                  href="/playground"
                />
              ) : (
                items.map((item, index) => (
                  <PlaygroundItem key={`playground-item-${index}`} {...item} />
                ))
              )}
            </div>
          </main>
        </BaseInnerLayout>
      </MaxWidthLayout>
    </HeaderOffsetLayout>
  );
}
