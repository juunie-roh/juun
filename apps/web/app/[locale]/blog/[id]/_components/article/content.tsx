import React from "react";

import { Prose } from "@/components/ui/prose";
import { Separator } from "@/components/ui/separator";

import ListButton from "../button/list";
import TableOfContents from "./table-of-contents";

export default function BlogContent({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <section className="relative bg-background">
      <div
        className="m-auto grid grid-cols-responsive gap-x-responsive"
        role="none"
      >
        <Separator
          orientation="horizontal"
          className="col-span-full col-start-1 mt-18 mb-5 md:col-span-8 md:col-start-3 lg:col-span-full"
        />
      </div>
      <div
        id="text-content"
        className="relative m-auto grid grid-cols-responsive gap-x-responsive"
      >
        {/* Article Content */}
        <div className="col-span-full grid w-full grid-cols-subgrid md:col-start-3 lg:col-start-5 lg:row-start-1">
          <Prose className="col-span-full mt-8 font-sans md:col-span-8">
            {children}
          </Prose>
        </div>
        {/* Table Of Contents */}
        <div className="sticky top-24 z-1 mb-8 hidden h-fit grid-cols-subgrid space-y-4 lg:col-span-4 lg:col-start-13 lg:row-start-1 lg:grid">
          <ListButton className="col-span-full w-fit justify-self-start" />
          <TableOfContents className="col-span-full" />
        </div>
      </div>
    </section>
  );
}
