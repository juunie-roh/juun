import { AspectRatio } from "@juun/ui/aspect-ratio";
import { Skeleton } from "@juun/ui/skeleton";
import { Fragment } from "react";

export default function BlogItemLoading() {
  return (
    <Fragment>
      {/* Header Section - matches BlogHeader structure */}
      <section>
        <div className="grid-cols-16 mx-auto grid place-items-center gap-8 px-4 pt-8">
          <div className="pt-18 col-span-full pb-10 lg:col-span-12 lg:col-start-3">
            <div className="flex flex-col gap-2 text-center">
              <Skeleton className="mx-auto h-10 w-3/4" />
              <Skeleton className="mx-auto h-5 w-1/2" />
            </div>
          </div>
          <div className="col-span-full w-full lg:col-span-12 lg:col-start-3">
            <AspectRatio ratio={16 / 9} className="w-full">
              <Skeleton className="size-full" />
            </AspectRatio>
          </div>
        </div>
      </section>

      {/* Content Section - matches BlogContent structure */}
      <section className="bg-background relative">
        <div className="grid-cols-16 m-auto grid gap-x-8 px-4">
          <hr className="mt-18 col-span-full border-t pt-5 md:col-span-8 md:col-start-5 lg:col-span-full" />
        </div>
        <div
          id="text-content"
          className="grid-cols-16 relative m-auto grid gap-x-8 px-4"
        >
          {/* Table of Contents Skeleton */}
          <div className="sticky top-24 z-[1] mb-8 hidden h-fit grid-cols-subgrid lg:col-span-4 lg:col-start-13 lg:row-start-1 lg:grid">
            <div className="col-span-full space-y-3">
              <Skeleton className="h-5 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="ml-2 h-3 w-5/6" />
                <Skeleton className="ml-4 h-3 w-4/6" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="ml-2 h-3 w-3/4" />
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="col-span-full grid w-full grid-cols-subgrid lg:col-start-5 lg:row-start-1">
            <div className="col-span-full mt-8 space-y-4 lg:col-span-8">
              {/* Paragraph blocks */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>

              {/* Section heading */}
              <Skeleton className="mt-8 h-6 w-2/3" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
              </div>

              {/* Another section */}
              <Skeleton className="mt-8 h-6 w-1/2" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              {/* Code block placeholder */}
              <div className="mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>

              {/* More content */}
              <div className="mt-8 space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section - placeholder for BlogFooter */}
      <section className="bg-background relative">
        <div className="grid-cols-16 m-auto grid gap-x-8 px-4 pb-12">
          <div className="col-span-full lg:col-span-8 lg:col-start-5">
            <div className="space-y-4 rounded-lg border p-6">
              <Skeleton className="h-6 w-1/3" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
