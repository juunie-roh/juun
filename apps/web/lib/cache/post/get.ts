import post, { type Post } from "@juun/db/post";
import { cacheLife, cacheTag } from "next/cache";

export async function all() {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts");
  return await post.get.all();
}

export async function byTags(tags: string[]) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", ...tags);
  return await post.get.byTags(tags);
}

export async function byCategory(category: Post["category"]) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", category);
  return await post.get.byCategory(category);
}

export async function byId(id: number) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", `post-${id}`);
  return await post.get.byId(id);
}
