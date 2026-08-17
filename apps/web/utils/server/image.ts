import "server-only";

import { get } from "@vercel/blob";
import probe from "probe-image-size";
import { Readable } from "stream";
import type { ReadableStream as NodeReadableStream } from "stream/web";

type Dimensions = { width: number; height: number };

/**
 * Map a content image URL to its Vercel Blob key.
 *
 * Blob keys mirror the `public/images` tree they replaced, so the key is just
 * the URL without its leading slash - `/images/blog/foo.png` is the blob
 * `images/blog/foo.png`. Nothing else to translate, and a new directory under
 * `images/` works without touching this.
 *
 * @returns The blob key, or `null` when the URL is not blob-backed.
 */
function toBlobPathname(src: string): string | null {
  return src.startsWith("/images/") ? src.slice(1) : null;
}

/**
 * Probe an image stored in the private blob store.
 *
 * A plain `probe(url)` cannot be used: the store is private, so its URLs
 * return 403 without the read-write token. Reading through `get()` is what
 * supplies the token.
 */
async function probeBlob(pathname: string): Promise<Dimensions | null> {
  const result = await get(pathname, { access: "private" });
  if (!result || result.statusCode !== 200) return null;

  // `get()` yields a web ReadableStream; probe wants a Node one.
  const stream = Readable.fromWeb(result.stream as NodeReadableStream);
  try {
    const { width, height } = await probe(stream);
    return { width, height };
  } finally {
    // probe only needs the header bytes - drop the rest of the download.
    stream.destroy();
  }
}

/**
 * Get image dimensions for a markdown image source.
 *
 * Two sources only: absolute URLs are probed over the network, and `/images/*`
 * resolves from blob. There is no `public/` fallback - that tree has moved to
 * blob, and keeping a fallback would let a failed upload look fine locally
 * while breaking in production.
 *
 * Returning `null` is not harmless: the caller falls back to a bare `<img>`,
 * losing `next/image` optimization and the AspectRatio wrapper that prevents
 * layout shift. Each failure path warns for that reason.
 *
 * @param src - Image source (blob-backed `/images/*` path, or absolute URL).
 * @returns Object with width and height, or null if unable to get dimensions.
 */
export async function getImageDimensions(
  src: string,
): Promise<Dimensions | null> {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    try {
      const result = await probe(src);
      return { width: result.width, height: result.height };
    } catch (error) {
      console.warn(`[Image] Failed to probe remote image: ${src}`, error);
      return null;
    }
  }

  const blobPathname = toBlobPathname(src);
  if (!blobPathname) {
    console.warn(`[Image] Not a blob-backed source: ${src}`);
    return null;
  }

  try {
    return await probeBlob(blobPathname);
  } catch (error) {
    console.warn(`[Image] Blob probe failed for: ${blobPathname}`, error);
    return null;
  }
}
