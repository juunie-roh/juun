"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface ScrollProgressBarProps {
  /**
   * CSS class for the progress bar
   */
  className?: string;
}

/**
 * Optimized scroll progress bar that shows scroll position as percentage of document height
 * Uses direct DOM manipulation for minimal latency
 */
export function ScrollProgressBar({ className }: ScrollProgressBarProps) {
  // Reference to the progress bar element
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if ref isn't attached yet
    if (!progressBarRef.current) return;

    // Get the progress bar element
    const progressBar = progressBarRef.current;

    // Function to update the progress bar width directly in the DOM
    const updateProgress = () => {
      // Get scrollable height (scroll height minus viewport height)
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Calculate current progress as percentage
      const scrollTop = window.scrollY;
      const progress = Math.min(
        100,
        Math.max(0, (scrollTop / scrollableHeight) * 100),
      );

      // Update width directly without going through React state
      progressBar.style.width = `${progress}%`;

      // Update ARIA attributes for accessibility
      const roundedProgress = Math.round(progress);
      progressBar.setAttribute("aria-valuenow", roundedProgress.toString());
      progressBar.setAttribute(
        "aria-valuetext",
        `${roundedProgress}% scrolled`,
      );
    };

    // Use requestAnimationFrame for smoother updates
    let rafId: number;
    const onScroll = () => {
      // Cancel any pending animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Schedule update to next frame
      rafId = requestAnimationFrame(updateProgress);
    };

    // Initial update
    updateProgress();

    // Add event listeners
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    // Clean up
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <div
        ref={progressBarRef}
        className={cn("h-full bg-primary", className)}
        style={{ width: "0%" }}
        role="progressbar"
        aria-label="Scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        aria-valuetext="0% scrolled"
      />
    </div>
  );
}
