"use client";

import { useMediaQuery } from "@juun/ui/hooks/use-media-query";
import {
  animate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffectEvent } from "react";

export function useHeaderMotion(
  containerRef?: React.RefObject<HTMLElement | null> | undefined,
) {
  const HEADER_HEIGHT = 72;
  const ANIMATION_STEP = [0, 0.25, 0.5, 0.75, 1];
  const isLarge = useMediaQuery("(width >= 64rem)");
  const isHome = usePathname() === "/";

  const [vh, setVh] = React.useState(1000); // Default fallback
  const [vw, setVw] = React.useState(1000);

  const [state, setState] = React.useState<"expanded" | "collapsed">();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // Start when top hits top, end when bottom hits top
  });

  // Manual progress for button-triggered animations
  const manualProgress = useMotionValue(state === "expanded" ? 0 : 1);

  // Switch between scroll-based and manual progress
  const activeProgress = state === undefined ? scrollYProgress : manualProgress;

  const scroll = {
    container: {
      height: useTransform(activeProgress, ANIMATION_STEP, [
        vh,
        vh,
        vh,
        HEADER_HEIGHT,
        HEADER_HEIGHT,
      ]),
    },

    translate: {
      top: useTransform(activeProgress, ANIMATION_STEP, [
        0,
        -0.25 * vh,
        -0.5 * vh,
        -0.5 * vh,
        -0.5 * vh,
      ]),
      right: useTransform(activeProgress, ANIMATION_STEP, [
        0,
        0.5 * vw,
        vw,
        vw,
        vw,
      ]),
      bottom: useTransform(activeProgress, ANIMATION_STEP, [
        0,
        0.25 * vh,
        0.5 * vh,
        0.5 * vh,
        0.5 * vh,
      ]),
      left: useTransform(activeProgress, ANIMATION_STEP, [
        0,
        -0.5 * vw,
        -1 * vw,
        -1 * vw,
        -1 * vw,
      ]),
    },

    main: {
      top: useTransform(activeProgress, ANIMATION_STEP, [
        isLarge ? (vh / 15) * 6 : (vh / 11) * 5,
        isLarge ? (vh / 15) * 6 : (vh / 11) * 5,
        isLarge ? (vh / 15) * 6 : (vh / 11) * 5,
        0,
        0,
      ]),
      height: useTransform(activeProgress, ANIMATION_STEP, [
        isLarge ? (vh / 15) * 3 : HEADER_HEIGHT,
        isLarge ? (vh / 15) * 3 : HEADER_HEIGHT,
        isLarge ? (vh / 15) * 3 : HEADER_HEIGHT,
        HEADER_HEIGHT,
        HEADER_HEIGHT,
      ]),
      translateY: useTransform(activeProgress, ANIMATION_STEP, [
        isLarge ? "0%" : "-50%",
        isLarge ? "0%" : "-50%",
        isLarge ? "0%" : "-50%",
        "0%",
        "0%",
      ]),
      toggle: {
        right: useTransform(activeProgress, ANIMATION_STEP, [
          isLarge ? (vw / 16) * 4 : vw / 12,
          isLarge ? (vw / 16) * 4 : vw / 12,
          0.5 * vw,
          0.5 * vw,
          0.5 * vw,
        ]),
        translateX: useTransform(activeProgress, ANIMATION_STEP, [
          isLarge ? "100%" : "0%",
          isLarge ? "100%" : "0%",
          "50%",
          "50%",
          "50%",
        ]),
      },
    },
  };

  const handleResize = useEffectEvent(() => {
    setVh(window.innerHeight);
    setVw(window.innerWidth);
  });

  React.useEffect(() => {
    setVh(window.innerHeight);
    setVw(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // React.useEffect(() => {
  //   if (isHome) setState(undefined);
  // }, [isHome]);

  // Track scroll progress and update state when at home
  React.useEffect(() => {
    if (!isHome || state !== undefined) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Continuously sync manualProgress with scroll position
      manualProgress.set(latest);

      // When scroll reaches end, set to collapsed
      if (latest >= 0.95) {
        setState("collapsed");
      }
    });

    return () => unsubscribe();
  }, [isHome, state, scrollYProgress, manualProgress]);

  // Sync manualProgress and reset to undefined when scrolling back up from collapsed state at home
  React.useEffect(() => {
    if (!isHome || state !== "collapsed") return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Continuously sync manualProgress with scroll position
      manualProgress.set(latest);

      // When scrolling back up, reset to undefined
      if (latest < 0.95) {
        setState(undefined);
      }
    });

    return () => unsubscribe();
  }, [isHome, state, scrollYProgress, manualProgress]);

  // Animation controls for manual state transitions
  const animateToExpanded = () => {
    return animate(manualProgress, 0, {
      duration: 1,
      ease: "easeInOut",
    });
  };

  const animateToCollapsed = () => {
    return animate(manualProgress, 1, {
      duration: 1,
      ease: "easeInOut",
    });
  };

  return {
    scroll,
    state,
    setState,
    animateToExpanded,
    animateToCollapsed,
    isHome,
  };
}
