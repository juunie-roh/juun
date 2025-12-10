"use client";

import { useScroll, useTransform } from "framer-motion";
import React, { useEffectEvent } from "react";

export function useHeaderScroll(
  containerRef: React.RefObject<HTMLElement | null> | undefined,
) {
  const HEADER_HEIGHT = 72;
  const SCROLL_STEP = [0, 0.25, 0.5, 0.75, 1];
  const [vh, setVh] = React.useState(1000); // Default fallback
  const [vw, setVw] = React.useState(1000);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // Start when top hits top, end when bottom hits top
  });

  const contentHeight = useTransform(scrollYProgress, SCROLL_STEP, [
    vh,
    vh,
    HEADER_HEIGHT,
    HEADER_HEIGHT,
    HEADER_HEIGHT,
  ]);

  const translateRight = useTransform(scrollYProgress, SCROLL_STEP, [
    0,
    0.25 * vw,
    0.5 * vw,
    0.5 * vw,
    0.5 * vw,
  ]);
  const translateLeft = useTransform(scrollYProgress, SCROLL_STEP, [
    0,
    -0.25 * vw,
    -0.5 * vw,
    -0.5 * vw,
    -0.5 * vw,
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
  };
}
