import type { Metadata } from "next";

import BaseInnerLayout from "@/layouts/base-inner";
import HeaderOffsetLayout from "@/layouts/header-offset";
import MaxWidthLayout from "@/layouts/max-width";
import md from "@/lib/server/md";

import PlaygroundItem from "./_components/item";
import { PLAYGROUND_ITEMS } from "./_data";

export const metadata: Metadata = {
  title: "Playground",
  description: "Experimented or experimenting technologies",
};

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
                  date="1900-01-01"
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
