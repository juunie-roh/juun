"use client";

import { motion } from "framer-motion";
import { ChevronsDown, CirclePlay, Menu, X } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import MaxWidthLayout from "@/layouts/max-width";

import Breadcrumb from "./breadcrumb";
import I18nButton from "./i18n-button";
import ThemeSwitch from "./theme-switch";
import { useHeaderMotion } from "./use-header-motion";

export default function Header() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { motionStyles, state, setState, isHome, mounted } =
    useHeaderMotion(containerRef);

  // Non-home routes: render compact placeholder until mounted.
  // Home route: render full content tree immediately so <h1> is in the initial HTML (LCP).
  if (!mounted && !isHome) {
    return (
      <div className="h-auto overscroll-contain">
        <header className="fixed top-0 z-50 w-full">
          <nav className="h-header border-b bg-background" />
        </header>
      </div>
    );
  }

  // Pre-mount on home: motion styles suppressed (vh/vw are 0).
  // Use 100dvh as the container height fallback — matches window.innerHeight on modern browsers.
  const ms = mounted ? motionStyles : null;

  return (
    <div
      ref={containerRef}
      className={
        isHome ? "h-screen overscroll-contain" : "h-auto overscroll-contain"
      }
    >
      <motion.header className="fixed top-0 z-50 w-full" data-state={state}>
        <motion.nav
          role="banner"
          aria-label="Site header"
          className="relative isolate grid h-screen grid-cols-responsive grid-rows-11 overflow-hidden border-b bg-background lg:grid-rows-15"
          style={ms?.container ?? { height: "100dvh" }}
        >
          {/* link blog */}
          <motion.div
            role="navigation"
            aria-label="Blog navigation"
            className="@container-[size] z-1 col-span-5 col-start-2 row-start-3 lg:col-start-11 lg:row-span-5 lg:row-start-1"
            style={ms?.link.blog}
          >
            <Link
              href="/blog"
              prefetch
              onNavigate={() => setState("collapsed")}
              className="group flex size-full items-center justify-center overflow-hidden bg-primary lg:items-end"
            >
              <span className="relative block w-full origin-right text-end font-stabil-grotesk text-[min(100cqh,25cqw)] font-semibold tracking-tight text-background transition-transform duration-300 group-hover:scale-110 lg:origin-left lg:text-start lg:text-[40cqh]">
                Blog
              </span>
            </Link>
          </motion.div>

          {/* Horizontal separators */}
          <motion.div
            aria-hidden="true"
            className="col-span-full row-start-2 w-full lg:row-start-5"
            style={ms?.separator.slow.top}
          >
            <Separator className="bg-muted-foreground" />
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="col-span-full -row-start-2 w-full lg:-row-start-5"
            style={ms?.separator.slow.bottom}
          >
            <Separator className="bg-muted-foreground" />
          </motion.div>
          {/* Vertical separators */}
          <motion.div
            aria-hidden="true"
            className="col-start-2 row-span-full h-full lg:col-start-3"
            style={ms?.separator.left}
          >
            <Separator orientation="vertical" className="bg-muted-foreground" />
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="-col-start-2 row-span-full h-full lg:-col-start-5"
            style={ms?.separator.right}
          >
            <Separator orientation="vertical" className="bg-muted-foreground" />
          </motion.div>

          {/* tagline */}
          <motion.div
            role="region"
            aria-label="Site tagline"
            className="col-span-5 col-start-7 row-start-2 flex flex-col lg:col-start-3 lg:row-start-5"
            style={ms?.tagline}
          >
            <p className="text-end font-mono text-base leading-5.5 text-wrap text-primary md:text-lg lg:-translate-y-full lg:text-start lg:text-2xl">
              Technology-Agnostic
            </p>
            <p className="text-end font-mono text-base leading-5.5 text-wrap text-primary md:text-lg lg:-translate-y-full lg:text-start lg:text-2xl">
              Architectural Playground
            </p>
          </motion.div>

          {/* title */}
          <motion.div
            role="region"
            aria-label="Site branding"
            className="@container-[size] absolute top-[calc(100vh/11*6)] left-0 flex h-[calc(100vh/11)] min-h-header w-full items-center lg:top-[calc(100vh/15*6)] lg:h-[calc(100vh/15*3)]"
            style={ms?.title.container}
          >
            <motion.div
              className="relative mx-auto size-full"
              style={ms?.title.width}
            >
              <motion.div
                aria-hidden="true"
                className="absolute -top-px -left-[50vw] w-[200vw]"
                style={ms?.separator.slow.top}
              >
                <Separator className="bg-muted-foreground" />
              </motion.div>
              <motion.h1
                className="absolute -top-[24cqh] left-[calc(100vw/12)] inline-block origin-left cursor-default font-stabil-grotesk text-[135cqh] leading-none font-bold tracking-tight text-primary lg:left-[calc(100vw/16*2)]"
                style={ms?.title.font}
              >
                Juun
              </motion.h1>
              <motion.div
                className="absolute right-[calc(100vw/12)] size-[100cqh] bg-blend-overlay lg:right-[calc(100vw/16*4)]"
                style={ms?.title.button}
              >
                <Button
                  className="group size-full rounded-none hover:cursor-pointer disabled:opacity-100"
                  variant="default"
                  disabled={!state}
                  onClick={() => {
                    if (!state) return;
                    if (state === "collapsed") {
                      setState("expanded");
                    } else {
                      setState("collapsed");
                    }
                  }}
                >
                  {state === undefined ? (
                    <Image
                      src="/favicon.ico"
                      alt="icon"
                      fill
                      sizes="72px"
                      className="p-4 invert transition-all group-hover:scale-110 dark:invert-0"
                    />
                  ) : state === "collapsed" ? (
                    <Menu className="size-full transition-all group-hover:scale-110" />
                  ) : (
                    <X className="size-full transition-all group-hover:scale-110" />
                  )}
                  <span className="sr-only">Header Toggle Button</span>
                </Button>
              </motion.div>
              {/* theme switch */}
              <motion.div
                role="region"
                aria-label="Controllers"
                className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-2"
                style={ms?.theme_switch}
              >
                <I18nButton />
                <ThemeSwitch />
              </motion.div>
              <motion.div
                aria-hidden="true"
                className="absolute bottom-0 -left-[50vw] w-[200vw]"
                style={ms?.separator.slow.bottom}
              >
                <Separator className="bg-muted-foreground" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* link playground */}
          <motion.div
            role="navigation"
            aria-label="Playground navigation"
            className="@container relative isolate z-1 col-span-2 col-start-10 row-span-3 -row-start-5 overflow-hidden lg:col-start-1 lg:row-span-6 lg:-row-start-5"
            style={ms?.link.playground}
          >
            <Link
              href="/playground"
              prefetch
              onNavigate={() => setState("collapsed")}
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
              aria-hidden="true"
              className="absolute right-1/2 bottom-[calc(100vh/11)] translate-x-1/2 lg:right-[calc(100vw/16*2)] lg:bottom-[calc(100vh/15)]"
              style={ms?.indicator}
            >
              <ChevronsDown className="size-8 animate-bounce drop-shadow-sm drop-shadow-primary/50 lg:size-12" />
            </motion.div>
          )}
        </motion.nav>

        {/* breadcrumb */}
        <MaxWidthLayout>
          <div className="relative ml-4 w-fit">
            <div
              role="none"
              className="absolute left-0 h-1/2 w-full bg-border"
            />
            <Breadcrumb className="pointer-events-auto relative flex w-fit items-center rounded-lg bg-border p-1 transition-all duration-300" />
          </div>
        </MaxWidthLayout>
      </motion.header>
    </div>
  );
}
