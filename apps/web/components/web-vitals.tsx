"use client";

import { Fetcher } from "@juun/api/fetcher";
import { useReportWebVitals } from "next/web-vitals";

type ReportWebVitalsCallback = Parameters<typeof useReportWebVitals>[number];

const sendWebVitals: ReportWebVitalsCallback = (metric) => {
  const body = {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    navigationType: metric.navigationType,
    timestamp: Date.now(),
    pathname: window.location.pathname,
  };

  // Example: POST to your analytics endpoint
  const fetcher = Fetcher.json(window.location.origin, {
    pathname: "/api/endpoint/here",
    method: "POST",
    body,
  });

  fetcher.fetch().catch((error) => {
    console.error("[Web Vitals] Failed to send:", error);
  });
};

const handleWebVitals: ReportWebVitalsCallback = (metric) => {
  console.log(`[Web Vitals] ${metric.name}:`, {
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
  });
};

export function WebVitals() {
  useReportWebVitals(handleWebVitals);
  return null;
}
