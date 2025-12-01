import * as get from "./get";

export { get };

export async function revalidate() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("timelines", "max");
}
