import type { Locale } from "@juun/db";
import timelineQuery from "@juun/db/timeline";
import { cacheLife, cacheTag } from "next/cache";

import { routing } from "@/i18n/routing";

const DEFAULT_LOCALE: Locale = routing.defaultLocale;

export async function all(
  order: "asc" | "desc" = "desc",
  locale: Locale = DEFAULT_LOCALE,
) {
  "use cache";
  cacheLife("weeks");
  cacheTag("timelines", `timelines-${locale}`, order);
  return await timelineQuery.select.all(order, locale);
}

export async function byId(id: number, locale: Locale = DEFAULT_LOCALE) {
  "use cache";
  cacheLife("weeks");
  cacheTag("timelines", `timeline-${id}`, `timeline-${id}-${locale}`);
  return await timelineQuery.select.byId(id, locale);
}
