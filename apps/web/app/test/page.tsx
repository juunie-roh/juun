import { Separator } from "@juun/ui/separator";
import { CirclePlay } from "lucide-react";
import Link from "next/link";

export default function TestHero() {
  return (
    <section role="banner" className="bg-primary">
      <div className="relative isolate grid h-[calc(100vh-var(--spacing-header)-1px)] grid-cols-responsive grid-rows-11 overflow-hidden lg:grid-rows-15">
        <Link
          href="/blog"
          className="group @container z-1 col-span-1 col-start-1 row-span-4 row-start-2 flex w-full justify-center overflow-hidden bg-muted lg:col-span-5 lg:col-start-11 lg:row-span-5 lg:row-start-1 lg:block"
        >
          <span className="relative inline-block origin-top-left text-end font-stabil-grotesk text-[calc(100cqw)] font-semibold tracking-tight text-primary transition-all duration-500 [writing-mode:sideways-lr] group-hover:scale-110 lg:[writing-mode:unset]">
            Blog
          </span>
        </Link>

        {/* Horizontal separators */}
        <Separator className="absolute col-span-full row-start-2 bg-muted-foreground lg:row-start-5" />
        <Separator className="absolute col-span-full -row-start-2 bg-muted-foreground lg:-row-start-5" />
        {/* Vertical separators */}
        <Separator
          orientation="vertical"
          className="absolute col-start-2 row-span-full bg-muted-foreground lg:col-start-3"
        />
        <Separator
          orientation="vertical"
          className="absolute -col-start-2 row-span-full bg-muted-foreground lg:-col-start-5"
        />

        <div className="absolute col-span-10 col-start-2 row-start-2 flex w-full flex-col lg:col-start-3 lg:row-start-5 lg:-translate-y-1/2">
          <div className="text-end font-mono text-base leading-5.5 text-wrap text-background md:text-lg lg:text-start lg:text-2xl">
            Technology-Agnostic
          </div>
          <div className="text-end font-mono text-base leading-5.5 text-wrap text-background md:text-lg lg:text-start lg:text-2xl">
            Architectural Playground
          </div>
        </div>

        <div className="@container-[size] relative col-span-10 col-start-2 row-start-6 flex h-full items-center lg:col-start-3 lg:row-span-3 lg:row-start-7">
          <Separator className="absolute top-0 -left-[50vw] w-[200vw]! bg-muted-foreground" />

          <h1 className="absolute -top-[24cqh] font-stabil-grotesk text-[136cqh] leading-none font-bold tracking-tight text-background">
            Juun
          </h1>

          <Separator className="absolute bottom-0 -left-[50vw] w-[200vw]! bg-muted-foreground" />
        </div>

        <Link
          href="/playground"
          className="group @container relative isolate z-1 col-span-2 col-start-10 row-span-3 -row-start-5 w-full overflow-hidden bg-accent px-3 py-4 lg:col-start-1 lg:row-span-6 lg:-row-start-5"
        >
          <span className="absolute top-0 right-0 origin-top font-stabil-grotesk text-4xl font-semibold transition-all duration-500 [writing-mode:vertical-lr] group-hover:scale-110">
            Playground
          </span>
          <CirclePlay className="absolute -bottom-[20cqw] -left-[20cqw] size-[80cqw] origin-bottom-left self-start text-muted-foreground transition-all duration-500 group-hover:scale-125" />
        </Link>
      </div>
    </section>
  );
}
