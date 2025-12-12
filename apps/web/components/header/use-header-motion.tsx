"use client";

import { useMediaQuery } from "@juun/ui/hooks/use-media-query";
import {
  animate,
  type MotionStyle,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

export function useHeaderMotion(
  containerRef?: React.RefObject<HTMLElement | null> | undefined,
) {
  // Match with --spacing-header variable at tailwind global.css
  const HEADER_HEIGHT = 72;
  // Same media query with tailwind "lg:" prefix
  const lg = useMediaQuery("(width >= 64rem)");
  // Variables for screen ratio
  const [vh, setVh] = React.useState(1000);
  const [vw, setVw] = React.useState(1000);

  const ANIMATION_STEP = [0, 0.25, 0.5, 0.75, 1];
  const isHome = usePathname() === "/";

  const [state, setState] = React.useState<
    "expanded" | "collapsed" | undefined
  >(isHome ? undefined : "collapsed");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start when top hits top, end when bottom hits top
    offset: ["start start", "end start"],
  });
  // Progress for button-triggered animations
  const toggleProgress = useMotionValue(state === "expanded" ? 0 : 1);

  // initial values for title area
  const titleTop = lg ? ((100 * vh) / 15) * 6 : ((100 * vh) / 11) * 5;
  const titleHeight = lg ? ((100 * vh) / 15) * 3 : HEADER_HEIGHT;
  const titleAdjustment = lg ? "0%" : "-50%";
  const titleButtonRight = lg ? ((100 * vw) / 16) * 4 : (100 * vw) / 12;
  const titleButtonAdjustment = lg ? "100%" : "0%";

  // animation output ranges
  const HEADER_HEIGHT_TO_FIXED = [
    100 * vh,
    100 * vh,
    100 * vh,
    HEADER_HEIGHT,
    HEADER_HEIGHT,
  ];

  const SLIDE_OUT_TO_LEFT = [0, -50 * vw, -100 * vw, -100 * vw, -100 * vw];
  const SLIDE_OUT_TO_TOP = [0, -50 * vh, -100 * vh, -100 * vh, -100 * vh];
  const SLIDE_OUT_TO_RIGHT = [0, 50 * vw, 100 * vw, 100 * vw, 100 * vw];
  const SLIDE_OUT_TO_BOTTOM = [0, 50 * vh, 100 * vh, 100 * vh, 100 * vh];
  const DELAYED_SLIDE_OUT_TO_BOTTOM = [0, 0, 0, 50 * vh, 100 * vh];

  const TITLE_TOP_TO_ZERO = [titleTop, titleTop, titleTop, 0, 0];
  const TITLE_HEIGHT_TO_FIXED = [
    titleHeight,
    titleHeight,
    titleHeight,
    HEADER_HEIGHT,
    HEADER_HEIGHT,
  ];
  const TITLE_POSITION_ADJUSTMENT = [
    titleAdjustment,
    titleAdjustment,
    titleAdjustment,
    "0%",
    "0%",
  ];
  const TITLE_BUTTON_RIGHT_TO_CENTER = [
    titleButtonRight,
    titleButtonRight,
    50 * vw,
    50 * vw,
    50 * vw,
  ];
  const TITLE_BUTTON_POSITION_ADJUSTMENT = [
    titleButtonAdjustment,
    titleButtonAdjustment,
    "50%",
    "50%",
    "50%",
  ];

  // Switch between scroll-based and manual progress
  const progress = state === undefined ? scrollYProgress : toggleProgress;

  const motionStyles = {
    container: {
      height: useTransform(progress, ANIMATION_STEP, HEADER_HEIGHT_TO_FIXED),
    } satisfies MotionStyle,

    separator: {
      left: {
        translateX: useTransform(progress, ANIMATION_STEP, SLIDE_OUT_TO_RIGHT),
      } satisfies MotionStyle,
      top: {
        translateY: useTransform(progress, ANIMATION_STEP, SLIDE_OUT_TO_TOP),
      } satisfies MotionStyle,
      right: {
        translateX: useTransform(progress, ANIMATION_STEP, SLIDE_OUT_TO_LEFT),
      } satisfies MotionStyle,
      bottom: {
        translateY: useTransform(progress, ANIMATION_STEP, SLIDE_OUT_TO_BOTTOM),
      } satisfies MotionStyle,
    },

    tagline: {
      translateX: useTransform(
        progress,
        ANIMATION_STEP,
        lg ? SLIDE_OUT_TO_LEFT : SLIDE_OUT_TO_RIGHT,
      ),
      translateY: useTransform(progress, ANIMATION_STEP, SLIDE_OUT_TO_TOP),
    } satisfies MotionStyle,

    link: {
      blog: {
        translateX: useTransform(
          progress,
          ANIMATION_STEP,
          lg ? SLIDE_OUT_TO_RIGHT : SLIDE_OUT_TO_LEFT,
        ),
        translateY: useTransform(progress, ANIMATION_STEP, SLIDE_OUT_TO_TOP),
      } satisfies MotionStyle,
      playground: {
        translateX: useTransform(
          progress,
          ANIMATION_STEP,
          lg ? SLIDE_OUT_TO_LEFT : SLIDE_OUT_TO_RIGHT,
        ),
        translateY: useTransform(progress, ANIMATION_STEP, SLIDE_OUT_TO_BOTTOM),
      } satisfies MotionStyle,
    },

    title: {
      container: {
        top: useTransform(progress, ANIMATION_STEP, TITLE_TOP_TO_ZERO),
        height: useTransform(progress, ANIMATION_STEP, TITLE_HEIGHT_TO_FIXED),
        translateY: useTransform(
          progress,
          ANIMATION_STEP,
          TITLE_POSITION_ADJUSTMENT,
        ),
      } satisfies MotionStyle,
      button: {
        right: useTransform(
          progress,
          ANIMATION_STEP,
          TITLE_BUTTON_RIGHT_TO_CENTER,
        ),
        translateX: useTransform(
          progress,
          ANIMATION_STEP,
          TITLE_BUTTON_POSITION_ADJUSTMENT,
        ),
      } satisfies MotionStyle,
    },

    indicator: {
      translateY: useTransform(
        progress,
        ANIMATION_STEP,
        DELAYED_SLIDE_OUT_TO_BOTTOM,
      ),
    } satisfies MotionStyle,
  };

  const handleResize = React.useEffectEvent(() => {
    // Match with css syntax, divide by 100
    setVh(window.innerHeight / 100);
    setVw(window.innerWidth / 100);
  });

  React.useEffect(() => {
    // Match with css syntax, divide by 100
    setVh(window.innerHeight / 100);
    setVw(window.innerWidth / 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll progress and handle state transitions at home
  React.useEffect(() => {
    if (!isHome) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Continuously sync manualProgress with scroll position
      toggleProgress.set(latest);

      // Handle state transitions based on scroll position
      if (latest === 1 && state !== "collapsed") {
        // When scroll reaches end, set to collapsed
        setState("collapsed");
      } else if (latest < 1 && state === "collapsed") {
        // When scrolling back up from collapsed, reset to undefined
        setState(undefined);
      }
    });

    return () => unsubscribe();
  }, [isHome, state, scrollYProgress, toggleProgress]);

  // Control animation internally
  React.useEffect(() => {
    if (state === "expanded") {
      animate(progress, 0, { duration: 1, ease: "easeInOut" });
    } else if (state === "collapsed") {
      animate(progress, 1, { duration: 1, ease: "easeInOut" });
    }
  }, [state, progress]);
  // prevent scroll on fully expanded state by toggle button
  React.useEffect(() => {
    if (state === "expanded") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state]);

  return {
    motionStyles,
    state,
    setState,
    isHome,
  };
}
