import postQuery from "@juun/db/post";
import { cacheLife, cacheTag } from "next/cache";

export async function all() {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts");
  return await postQuery.get.all();
}

export async function byId(id: number) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", `post-${id}`);
  return await postQuery.get.byId(id);
}
