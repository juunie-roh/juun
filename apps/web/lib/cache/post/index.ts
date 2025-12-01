import * as get from "./get";

export { get };

export async function revalidate() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("posts", "max");
}

export const CACHE_CONFIG = {
  revalidate: 3600,
  staleTime: 3_600_000,
  tags: ["posts"],
};
