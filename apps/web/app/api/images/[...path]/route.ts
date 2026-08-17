import { get } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Serves images from the private Vercel Blob store through our own origin.
 *
 * The store is configured with private access, so its blob URLs return 403 to
 * anyone without the read-write token. Only this route — running on the server,
 * holding the token — can read them, which is what keeps the images viewable
 * "only through the site". The bytes are streamed through; the browser never
 * sees the underlying blob URL or the token.
 *
 * A redirect would not work in place of this proxy: it would hand the browser
 * a blob URL it has no token for, and the request would 403.
 *
 * Serves the `images/` blob namespace, which mirrors the `public/images` tree
 * it replaced. `/images/blog/a.png` rewrites here as `/api/images/blog/a.png`
 * and reads the key `images/blog/a.png`, so new directories need no code change.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  // Best-effort hotlink protection: reject cross-site embeds. Same-origin
  // requests and the Next.js image optimizer (a server-side fetch sending no
  // Sec-Fetch-Site header) pass through. Not access control - a non-browser
  // client simply omits the header.
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { path } = await params;
  if (!path?.length) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  // The rewrite strips `/images/`, so restore it to form the blob key.
  const pathname = `images/${path.join("/")}`;

  const result = await get(pathname, { access: "private" });

  if (result?.statusCode !== 200) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
