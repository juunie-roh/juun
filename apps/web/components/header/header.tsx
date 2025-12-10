"use client";

import { useMediaQuery } from "@juun/ui/hooks/use-media-query";
import { Separator } from "@juun/ui/separator";
import { motion } from "framer-motion";
import { CirclePlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import Breadcrumb from "./breadcrumb";
import { useHeaderScroll } from "./useHeaderScroll";

export default function Header() {
  const isHome = usePathname() === "/";
  const [expanded, setExpanded] = React.useState<boolean>();
  const containerRef = React.useRef(null);
  const {
    contentHeight,
    translateRight,
    translateLeft,
    translateTop,
    translateBottom,
  } = useHeaderScroll(containerRef);
  const isLarge = useMediaQuery("(width >= 64rem)");

  React.useEffect(() => {
    if (isHome) setExpanded(undefined);
  }, [isHome]);

  return (
    <div
      ref={containerRef}
      className={expanded === undefined ? "h-[200vh]" : "h-auto"}
    >
      <motion.header className="fixed top-0 size-full">
        <motion.div
          className="relative isolate grid h-screen grid-cols-responsive grid-rows-11 overflow-hidden border-b bg-background lg:grid-rows-15"
          style={{
            height:
              expanded === undefined ? contentHeight : expanded ? "100vh" : 0,
          }}
        >
          <motion.div
            className="@container z-1 col-span-1 col-start-1 row-span-4 row-start-2 lg:col-span-5 lg:col-start-11 lg:row-span-5 lg:row-start-1"
            style={{
              translateX: isLarge ? translateRight : translateLeft,
              translateY: translateTop,
            }}
          >
            <Link
              href="/blog"
              prefetch
              className="group flex size-full w-full justify-center overflow-hidden bg-primary lg:block"
            >
              <span className="relative inline-block origin-top-left text-end font-stabil-grotesk text-[calc(100cqw)] font-semibold tracking-tight text-background transition-all duration-500 [writing-mode:sideways-lr] group-hover:scale-110 lg:[writing-mode:unset]">
                Blog
              </span>
            </Link>
          </motion.div>

          {/* Horizontal separators */}
          <motion.div
            className="col-span-full row-start-2 w-full lg:row-start-5"
            style={{ translateY: translateTop }}
          >
            <Separator className="bg-muted-foreground" />
          </motion.div>
          <motion.div
            className="col-span-full -row-start-2 w-full lg:-row-start-5"
            style={{ translateY: translateBottom }}
          >
            <Separator className="bg-muted-foreground" />
          </motion.div>
          {/* Vertical separators */}
          <motion.div
            className="col-start-2 row-span-full h-full lg:col-start-3"
            style={{ translateX: translateLeft }}
          >
            <Separator orientation="vertical" className="bg-muted-foreground" />
          </motion.div>
          <motion.div
            className="-col-start-2 row-span-full h-full lg:-col-start-5"
            style={{ translateX: translateRight }}
          >
            <Separator orientation="vertical" className="bg-muted-foreground" />
          </motion.div>

          <motion.div
            className="col-span-10 col-start-2 row-start-2 flex w-full flex-col lg:col-start-3 lg:row-start-5 lg:-translate-y-2/5"
            style={{
              translateX: isLarge ? translateLeft : translateRight,
              translateY: translateTop,
            }}
          >
            <div className="text-end font-mono text-base leading-5.5 text-wrap text-primary md:text-lg lg:text-start lg:text-2xl">
              Technology-Agnostic
            </div>
            <div className="text-end font-mono text-base leading-5.5 text-wrap text-primary md:text-lg lg:text-start lg:text-2xl">
              Architectural Playground
            </div>
          </motion.div>

          <div className="@container-[size] relative col-span-10 col-start-2 row-start-6 flex h-full items-center lg:col-start-3 lg:row-span-3 lg:row-start-7">
            <motion.div
              className="absolute top-0 -left-[50vw] w-[200vw]"
              style={{ translateY: translateTop }}
            >
              <Separator className="bg-muted-foreground" />
            </motion.div>
            <motion.h1
              className="absolute -top-[23cqh] inline-block font-stabil-grotesk text-[135cqh] leading-none font-bold tracking-tight text-primary"
              style={{ translateX: translateLeft }}
            >
              <Link href="/">Juun</Link>
            </motion.h1>
            <motion.div
              className="absolute bottom-0 -left-[50vw] w-[200vw]"
              style={{ translateY: translateBottom }}
            >
              <Separator className="bg-muted-foreground" />
            </motion.div>
          </div>

          <motion.div className="relative col-span-2 col-start-10 row-span-3 -row-start-5 lg:col-start-1 lg:row-span-6 lg:-row-start-5"></motion.div>

          <motion.div
            className="@container relative isolate z-1 col-span-2 col-start-10 row-span-3 -row-start-5 overflow-hidden lg:col-start-1 lg:row-span-6 lg:-row-start-5"
            style={{
              translateX: isLarge ? translateLeft : translateRight,
              translateY: translateBottom,
            }}
          >
            <Link
              href="/playground"
              prefetch
              className="group flex size-full w-full overflow-hidden bg-primary px-3 py-4"
            >
              <span className="absolute top-0 right-0 origin-top font-stabil-grotesk text-4xl font-semibold text-background transition-all duration-500 [writing-mode:vertical-lr] group-hover:scale-110">
                Playground
              </span>
              <CirclePlay className="absolute -bottom-[20cqw] -left-[20cqw] size-[80cqw] origin-bottom-left self-start text-muted-foreground transition-all duration-500 group-hover:scale-125" />
            </Link>
          </motion.div>
        </motion.div>
        <Breadcrumb className="relative bottom-0 left-1/2 w-fit -translate-x-1/2 overflow-hidden rounded-full bg-border p-1 transition-all duration-300" />
      </motion.header>
    </div>
  );
}
