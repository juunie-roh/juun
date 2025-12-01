import postQuery from "@juun/db/post";
import { cacheLife, cacheTag } from "next/cache";

export async function all() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  return await postQuery.get.all();
}

export async function byId(id: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", `post-${id}`);
  return await postQuery.get.byId(id);
}
