import post, { type Input } from "@juun/db/post";
import { revalidateTag } from "next/cache";

export async function one(input: Input) {
  const result = await post.create.one(input);
  revalidateTag("posts", "max");
  return result;
}
