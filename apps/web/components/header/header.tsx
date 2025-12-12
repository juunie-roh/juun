"use client";

import { Button } from "@juun/ui/button";
import { Separator } from "@juun/ui/separator";
import { motion } from "framer-motion";
import { ChevronsDown, CirclePlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Breadcrumb from "./breadcrumb";
import { useHeaderMotion } from "./use-header-motion";

export default function Header() {
  const containerRef = React.useRef(null);
  const { motionStyles, state, setState, isHome } =
    useHeaderMotion(containerRef);

  return (
    <div
      ref={containerRef}
      className={
        isHome ? "h-[200vh] overscroll-contain" : "h-auto overscroll-contain"
      }
    >
      <motion.header className="fixed top-0 z-50 w-full" data-state={state}>
        <motion.div
          className="relative isolate grid h-screen grid-cols-responsive grid-rows-11 overflow-hidden border-b bg-background lg:grid-rows-15"
          style={motionStyles.container}
        >
          {/* link blog */}
          <motion.div
            className="@container-[size] z-1 col-span-5 col-start-2 row-start-3 lg:col-start-11 lg:row-span-5 lg:row-start-1"
            style={motionStyles.link.blog}
          >
            <Link
              href="/blog"
              prefetch
              onNavigate={() => {
                setState("collapsed");
              }}
              className="group flex size-full items-center justify-center overflow-hidden bg-primary lg:items-end"
            >
              <span className="relative block w-full origin-right text-end font-stabil-grotesk text-[min(100cqh,25cqw)] font-semibold tracking-tight text-background transition-all duration-500 group-hover:scale-110 lg:origin-left lg:text-start lg:text-[40cqh]">
                Blog
              </span>
            </Link>
          </motion.div>

          {/* Horizontal separators */}
          <motion.div
            className="col-span-full row-start-2 w-full lg:row-start-5"
            style={motionStyles.separator.top}
          >
            <Separator className="bg-muted-foreground" />
          </motion.div>
          <motion.div
            className="col-span-full -row-start-2 w-full lg:-row-start-5"
            style={motionStyles.separator.bottom}
          >
            <Separator className="bg-muted-foreground" />
          </motion.div>
          {/* Vertical separators */}
          <motion.div
            className="col-start-2 row-span-full h-full lg:col-start-3"
            style={motionStyles.separator.left}
          >
            <Separator orientation="vertical" className="bg-muted-foreground" />
          </motion.div>
          <motion.div
            className="-col-start-2 row-span-full h-full lg:-col-start-5"
            style={motionStyles.separator.right}
          >
            <Separator orientation="vertical" className="bg-muted-foreground" />
          </motion.div>

          {/* tagline */}
          <motion.div
            className="col-span-5 col-start-7 row-start-2 flex flex-col lg:col-start-3 lg:row-start-5"
            style={motionStyles.tagline}
          >
            <div className="text-end font-mono text-base leading-5.5 text-wrap text-primary md:text-lg lg:-translate-y-full lg:text-start lg:text-2xl">
              Technology-Agnostic
            </div>
            <div className="text-end font-mono text-base leading-5.5 text-wrap text-primary md:text-lg lg:-translate-y-full lg:text-start lg:text-2xl">
              Architectural Playground
            </div>
          </motion.div>

          {/* title */}
          <motion.div
            className="@container-[size] absolute top-[calc(100vh/11*6)] left-0 flex h-[calc(100vh/11)] min-h-header w-full items-center lg:top-[calc(100vh/15*6)] lg:h-[calc(100vh/15*3)]"
            style={motionStyles.title.container}
          >
            <motion.div
              className="absolute -top-px -left-[50vw] w-[200vw]"
              style={motionStyles.separator.top}
            >
              <Separator className="bg-muted-foreground" />
            </motion.div>
            <motion.h1
              className="absolute -top-[24cqh] left-[calc(100vw/12)] inline-block cursor-default font-stabil-grotesk text-[135cqh] leading-none font-bold tracking-tight text-primary lg:left-[calc(100vw/16*2)]"
              style={motionStyles.separator.right}
            >
              Juun
            </motion.h1>
            <motion.div
              className="absolute right-[calc(100vw/12)] size-[100cqh] bg-blend-overlay lg:right-[calc(100vw/16*4)]"
              style={motionStyles.title.button}
            >
              <Button
                className="size-full rounded-none"
                variant="ghost"
                aria-disabled={!state}
                onClick={() => {
                  if (!state) return;
                  if (state === "collapsed") {
                    setState("expanded");
                  } else {
                    setState("collapsed");
                  }
                }}
              >
                <Image src="/favicon.ico" alt="icon" fill className="p-3" />
                <span className="sr-only">Header Toggle Button</span>
              </Button>
            </motion.div>
            <motion.div
              className="absolute bottom-0 -left-[50vw] w-[200vw]"
              style={motionStyles.separator.bottom}
            >
              <Separator className="bg-muted-foreground" />
            </motion.div>
          </motion.div>

          {/* link playground */}
          <motion.div
            className="@container relative isolate z-1 col-span-2 col-start-10 row-span-3 -row-start-5 overflow-hidden lg:col-start-1 lg:row-span-6 lg:-row-start-5"
            style={motionStyles.link.playground}
          >
            <Link
              href="/playground"
              prefetch
              onNavigate={() => {
                setState("collapsed");
              }}
              className="group flex size-full w-full overflow-hidden bg-primary px-3 py-4"
            >
              <span className="absolute top-0 right-0 origin-top font-stabil-grotesk text-4xl font-semibold text-background transition-all duration-500 [writing-mode:vertical-lr] group-hover:scale-110">
                Playground
              </span>
              <CirclePlay className="absolute -bottom-[20cqw] -left-[20cqw] size-[80cqw] origin-bottom-left self-start text-muted-foreground transition-all duration-500 group-hover:scale-125" />
            </Link>
          </motion.div>

          {state === undefined && (
            <motion.div
              className="absolute right-1/2 bottom-4 translate-x-1/2 lg:right-4 lg:translate-x-0"
              style={motionStyles.indicator}
            >
              <ChevronsDown className="size-8 animate-bounce drop-shadow-sm drop-shadow-primary/50 lg:size-12" />
            </motion.div>
          )}
        </motion.div>

        {/* breadcrumb */}
        <div className="relative bottom-0 left-1/2 h-3.5 w-fit -translate-x-1/2 bg-border">
          <Breadcrumb className="relative w-fit overflow-hidden rounded-full bg-border p-1 transition-all duration-300" />
        </div>
      </motion.header>
    </div>
  );
}
