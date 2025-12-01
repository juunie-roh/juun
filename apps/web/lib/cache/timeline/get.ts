import timelineQuery from "@juun/db/timeline";
import { cacheLife, cacheTag } from "next/cache";

export async function all(order?: "asc" | "desc") {
  "use cache";
  cacheLife("hours");
  cacheTag("timelines");
  return await timelineQuery.get.all(order);
}

export async function byId(id: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("timelines", `timeline-${id}`);
  return await timelineQuery.get.byId(id);
}
