import * as create from "./create";
import * as select from "./select";

export { create, select };

export async function revalidate() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("posts", "max");
}
