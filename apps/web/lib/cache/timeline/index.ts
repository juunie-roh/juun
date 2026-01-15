import * as select from "./select";

export { select };

export async function revalidate() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("timelines", "max");
}
