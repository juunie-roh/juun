import post, { type Post } from "@juun/db/post";
import { cacheLife, cacheTag } from "next/cache";

export async function all() {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts");
  return await post.select.all();
}

export async function byTags(tags: string[]) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", ...tags);
  return await post.select.byTags(tags);
}

export async function byCategory(category: Post["category"]) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", category);
  return await post.select.byCategory(category);
}

export async function byId(id: number) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", `post-${id}`);
  return await post.select.byId(id);
}
