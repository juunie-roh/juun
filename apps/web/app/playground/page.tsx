import BaseLayout from "@/layouts/base";
import md from "@/lib/md";

import PlaygroundItem from "./_components/item";
import { PLAYGROUND_ITEMS } from "./_data";

export default async function Playground() {
  const items = await Promise.all(
    PLAYGROUND_ITEMS.map(async (item) => ({
      ...item,
      description: md.render(await md.parse(item.description)),
    })),
  );

  return (
    <main>
      <BaseLayout>
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
      </BaseLayout>
    </main>
  );
}
