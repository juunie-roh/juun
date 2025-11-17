import { cn } from "@juun/ui/lib/utils";

import BaseLayout from "@/layouts/base";

import PlaygroundItem from "./_components/item";
import { PLAYGROUND_ITEMS } from "./_data";

export default function Playground() {
  return (
    <main>
      <BaseLayout>
        {PLAYGROUND_ITEMS.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-12 text-center">
            <h3 className="mb-2 text-lg font-medium">No portfolio items yet</h3>
            <p className="text-gray-500">
              Your portfolio items will appear here once you add them to the
              posts directory.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 border bg-(image:--bg-dashed)">
            {PLAYGROUND_ITEMS.map((item, index) => (
              <PlaygroundItem
                key={`playground-item-${index}`}
                {...item}
                className={cn(
                  index === 0 && "border-t-0",
                  index === PLAYGROUND_ITEMS.length - 1 && "border-b-0",
                )}
              />
            ))}
          </div>
        )}
      </BaseLayout>
    </main>
  );
}
