import fs from "fs";
import path from "path";
import probe from "probe-image-size";

/**
 * Get image dimensions from a file path
 *
 * Supports both local files (public directory) and remote URLs
 *
 * @param src - Image source (local path or URL)
 * @returns Object with width and height, or null if unable to get dimensions
 */
export async function getImageDimensions(
  src: string,
): Promise<{ width: number; height: number } | null> {
  try {
    // Handle remote URLs
    if (src.startsWith("http://") || src.startsWith("https://")) {
      const result = await probe(src);
      return { width: result.width, height: result.height };
    }

    // Handle local files from public directory
    // Remove leading slash and prepend 'public'
    const filePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`[Image] File not found: ${filePath}`);
      return null;
    }

    // Read file and probe dimensions
    const stream = fs.createReadStream(filePath);
    const result = await probe(stream);
    stream.destroy();

    return { width: result.width, height: result.height };
  } catch (error) {
    console.warn(`[Image] Failed to get dimensions for: ${src}`, error);
    return null;
  }
}
