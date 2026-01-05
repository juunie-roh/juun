"use client";

import {
  animate,
  type MotionStyle,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

export function useHeaderMotion(
  containerRef?: React.RefObject<HTMLElement | null> | undefined,
) {
  // Match with --spacing-header variable at tailwind global.css, --spacing(15)
  const HEADER_HEIGHT = 60;
  // --container-7xl
  const CONTAINER_7XL = 1280;
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
  // Initialize to 1 when collapsed, 0 otherwise (expanded or undefined)
  const toggleProgress = useMotionValue(state === "collapsed" ? 1 : 0);

  // initial values for title area
  const titleTop = lg ? ((100 * vh) / 15) * 6 : ((100 * vh) / 11) * 5;
  const titleHeight = lg ? ((100 * vh) / 15) * 3 : HEADER_HEIGHT;
  const titleContainerPosition = lg ? "0%" : "-50%";
  const titleFontPosition = lg ? ((100 * vw) / 16) * 2 : (100 * vw) / 12;
  const titleButtonRight = lg ? `${(100 / 16) * 4}%` : `${100 / 12}%`;
  const titleButtonAdjustment = lg ? "100%" : "0%";

  // animation output ranges
  const HEADER_HEIGHT_TO_FIXED = [
    100 * vh,
    100 * vh,
    100 * vh,
    100 * vh,
    HEADER_HEIGHT,
  ];

  const SLIDE_OUT_TO_LEFT = [0, -50 * vw, -100 * vw, -100 * vw, -100 * vw];
  const SLIDE_OUT_TO_TOP = [0, -50 * vh, -100 * vh, -100 * vh, -100 * vh];
  const SLIDE_OUT_TO_RIGHT = [0, 50 * vw, 100 * vw, 100 * vw, 100 * vw];
  const SLIDE_OUT_TO_BOTTOM = [0, 50 * vh, 100 * vh, 100 * vh, 100 * vh];
  const SLOW_SLIDE_OUT_TO_TOP = [0, 0, 0 * vh, -25 * vh, -50 * vh];
  const SLOW_SLIDE_OUT_TO_BOTTOM = [0, 0, 0 * vh, 25 * vh, 50 * vh];
  const DELAYED_SLIDE_OUT_TO_BOTTOM = [0, 0, 0, 50 * vh, 100 * vh];

  const TITLE_TOP_TO_ZERO = [titleTop, titleTop, titleTop, titleTop, 0];
  const TITLE_HEIGHT_TO_FIXED = [
    titleHeight,
    titleHeight,
    titleHeight,
    titleHeight,
    HEADER_HEIGHT,
  ];
  const TITLE_CONTAINER_POSITION_TO_ZERO = [
    titleContainerPosition,
    titleContainerPosition,
    titleContainerPosition,
    titleContainerPosition,
    "0%",
  ];
  const TITLE_CONTAINER_MAX_WIDTH = [
    100 * vw,
    100 * vw,
    100 * vw,
    100 * vw,
    CONTAINER_7XL,
  ];
  const TITLE_FONT_POSITION_TO_FIXED = [
    titleFontPosition,
    titleFontPosition,
    16,
    16,
    16,
  ];
  const TITLE_FONT_SCALE_TO_HALF = ["100%", "100%", "50%", "50%", "50%"];
  const TITLE_BUTTON_RIGHT_TO_CENTER = [
    titleButtonRight,
    titleButtonRight,
    "50%",
    "50%",
    "50%",
  ];
  const TITLE_BUTTON_POSITION_ADJUSTMENT = [
    titleButtonAdjustment,
    titleButtonAdjustment,
    "50%",
    "50%",
    "50%",
  ];
  const BREADCRUMB_POSITION_ADJUSTMENT = ["0%", "0%", "0%", "0%", "-50%"];
  const THEME_SWITCH_POSITION_ADJUSTMENT = [
    100 * vw,
    100 * vw,
    100 * vw,
    50 * vw,
    0,
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
      slow: {
        top: {
          translateY: useTransform(
            progress,
            ANIMATION_STEP,
            SLOW_SLIDE_OUT_TO_TOP,
          ),
        } satisfies MotionStyle,
        bottom: {
          translateY: useTransform(
            progress,
            ANIMATION_STEP,
            SLOW_SLIDE_OUT_TO_BOTTOM,
          ),
        } satisfies MotionStyle,
      },
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
          TITLE_CONTAINER_POSITION_TO_ZERO,
        ),
      } satisfies MotionStyle,
      width: {
        maxWidth: useTransform(
          progress,
          ANIMATION_STEP,
          TITLE_CONTAINER_MAX_WIDTH,
        ),
      } satisfies MotionStyle,
      font: {
        left: useTransform(
          progress,
          ANIMATION_STEP,
          TITLE_FONT_POSITION_TO_FIXED,
        ),
        scale: useTransform(progress, ANIMATION_STEP, TITLE_FONT_SCALE_TO_HALF),
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

    breadcrumb: {
      translateY: useTransform(
        progress,
        ANIMATION_STEP,
        BREADCRUMB_POSITION_ADJUSTMENT,
      ),
    } satisfies MotionStyle,
    theme_switch: {
      translateX: useTransform(
        progress,
        ANIMATION_STEP,
        THEME_SWITCH_POSITION_ADJUSTMENT,
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
