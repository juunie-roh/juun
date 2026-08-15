import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

/**
 * Serves images from the private Vercel Blob store through our own origin.
 *
 * The store is configured with private access, so its blob URLs return 403 to
 * anyone without the read-write token. Only this route — running on the server,
 * holding the token — can read them, which is what keeps the images viewable
 * "only through the site". The bytes are streamed through; the browser never
 * sees the underlying blob URL or the token.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  // Best-effort hotlink protection: reject cross-site embeds. Same-origin
  // requests and the Next.js image optimizer (a server-side fetch that sends no
  // Sec-Fetch-Site header) pass through.
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { path } = await params;
  const pathname = path.join("/");

  // Resolve and stream the private blob in a single call. The token is read
  // from BLOB_READ_WRITE_TOKEN; get() returns null when the blob is missing.
  const result = await get(pathname, { access: "private" });

  if (!result || result.statusCode !== 200) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
