"use server";

import { revalidatePath, updateTag } from "next/cache";

import { requireAdminSession } from "@/lib/server/auth";

/**
 * TEMPORARY: purge every cached query and prerendered page.
 *
 * Exists so content inserted directly into the database (raw SQL) shows up
 * without a redeploy. Remove once posts are created through the admin CMS,
 * which revalidates on write.
 */
export async function revalidateAll() {
  await requireAdminSession();

  updateTag("posts");
  updateTag("timelines");
  revalidatePath("/", "layout");
}
