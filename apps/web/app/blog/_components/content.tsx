import { Prose } from "@juun/ui/prose";
import React from "react";

import { TableOfContents } from "./table-of-contents";

export default function BlogContent({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-background relative">
      <div className="grid-cols-16 m-auto grid gap-x-8 px-4">
        <hr className="mt-18 col-span-full border-t pt-5 md:col-span-8 md:col-start-5 lg:col-span-full" />
      </div>
      <div
        id="text-content"
        className="grid-cols-16 relative m-auto grid gap-x-8 px-4"
      >
        <div className="sticky top-24 z-[1] mb-8 hidden h-fit grid-cols-subgrid lg:col-span-4 lg:col-start-13 lg:row-start-1 lg:grid">
          <TableOfContents className="col-span-full" />
        </div>
        <div className="col-span-full grid w-full grid-cols-subgrid lg:col-start-5 lg:row-start-1">
          <Prose className="col-span-full mt-8 lg:col-span-8">{children}</Prose>
        </div>
      </div>
    </section>
  );
}
