import Link from "next/link";
import { Fragment } from "react";

export const metadata = {
  title:
    "Cloud Native's Inevitable Evolution: From Fragmentation to Consolidation",
  description:
    "Cloud Native ecosystem is following the same consolidation pattern as Unix and mobile OS - heading toward standardized Cloud OS with unified APIs",
  category: "analysis",
  date: "2025-10-15",
  tags: [
    "analysis",
    "pattern",
    "cloud native",
    "infrastructure",
    "operating system",
  ],
  // image: "/images/blog/",
};

export default function Data() {
  return (
    <Fragment>
      <blockquote>
        이 글은{" "}
        <Link href="/blog/cloud-native">Cloud Native Application and MSA</Link>{" "}
        에서 분석했던 Cloud Native 와 Android OS 사이의 유사성을 기반으로 한다.
      </blockquote>

      <h2>The Current State</h2>
      <p></p>
    </Fragment>
  );
}
