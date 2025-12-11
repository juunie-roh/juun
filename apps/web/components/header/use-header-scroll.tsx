"use client";

import { useMediaQuery } from "@juun/ui/hooks/use-media-query";
import { useScroll, useTransform } from "framer-motion";
import React, { useEffectEvent } from "react";

export function useHeaderScroll(
  containerRef: React.RefObject<HTMLElement | null> | undefined,
) {
  const HEADER_HEIGHT = 72;
  const SCROLL_STEP = [0, 0.25, 0.5, 0.75, 1];
  const isLarge = useMediaQuery("(width >= 64rem)");

  const [vh, setVh] = React.useState(1000); // Default fallback
  const [vw, setVw] = React.useState(1000);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // Start when top hits top, end when bottom hits top
  });

  const contentHeight = useTransform(scrollYProgress, SCROLL_STEP, [
    vh,
    vh,
    vh,
    HEADER_HEIGHT,
    HEADER_HEIGHT,
  ]);

  const translateRight = useTransform(scrollYProgress, SCROLL_STEP, [
    0,
    0.5 * vw,
    vw,
    vw,
    vw,
  ]);
  const translateLeft = useTransform(scrollYProgress, SCROLL_STEP, [
    0,
    -0.5 * vw,
    -1 * vw,
    -1 * vw,
    -1 * vw,
  ]);
  const translateBottom = useTransform(scrollYProgress, SCROLL_STEP, [
    0,
    0.25 * vh,
    0.5 * vh,
    0.5 * vh,
    0.5 * vh,
  ]);
  const translateTop = useTransform(scrollYProgress, SCROLL_STEP, [
    0,
    -0.25 * vh,
    -0.5 * vh,
    -0.5 * vh,
    -0.5 * vh,
  ]);

  const main = {
    top: useTransform(scrollYProgress, SCROLL_STEP, [
      isLarge ? (vh / 15) * 6 : (vh / 11) * 5,
      isLarge ? (vh / 15) * 6 : (vh / 11) * 5,
      isLarge ? (vh / 15) * 6 : (vh / 11) * 5,
      0,
      0,
    ]),
    height: useTransform(scrollYProgress, SCROLL_STEP, [
      isLarge ? (vh / 15) * 3 : HEADER_HEIGHT,
      isLarge ? (vh / 15) * 3 : HEADER_HEIGHT,
      isLarge ? (vh / 15) * 3 : HEADER_HEIGHT,
      HEADER_HEIGHT,
      HEADER_HEIGHT,
    ]),
    translateY: useTransform(scrollYProgress, SCROLL_STEP, [
      isLarge ? "0%" : "-50%",
      isLarge ? "0%" : "-50%",
      isLarge ? "0%" : "-50%",
      "0%",
      "0%",
    ]),
    toggle: {
      right: useTransform(scrollYProgress, SCROLL_STEP, [
        isLarge ? (vw / 16) * 4 : vw / 12,
        isLarge ? (vw / 16) * 4 : vw / 12,
        0.5 * vw,
        0.5 * vw,
        0.5 * vw,
      ]),
      translateX: useTransform(scrollYProgress, SCROLL_STEP, [
        isLarge ? "100%" : "0%",
        isLarge ? "100%" : "0%",
        "50%",
        "50%",
        "50%",
      ]),
    },
  };

  const handleResize = useEffectEvent(() => {
    setVh(window.innerHeight);
    setVw(window.innerWidth);
  });
  // const getHeaderHeight = useEffectEvent(() => setHeaderHeight());
  React.useEffect(() => {
    setVh(window.innerHeight);
    setVw(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    contentHeight,
    translateRight,
    translateLeft,
    translateTop,
    translateBottom,
    main,
  };
}
