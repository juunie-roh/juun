import { head, HeadBlobResult } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function fetchBlob(
  request: Request,
  { params }: { params: Promise<{ pathSegments: string[] }> },
) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { pathSegments } = await params;
  const path = pathSegments.join("/");

  let blob: HeadBlobResult;
  try {
    blob = await head(path);
  } catch {
    return new NextResponse("Not Found", { status: 404 });
  }

  const upstream = await fetch(blob.url, {
    headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
  });

  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Bad Gateway", { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": blob.contentType ?? "application/octet-stream",
      "Cache-Control":
        blob.cacheControl ?? "public, max-age=31536000, immutable",
    },
  });
}
