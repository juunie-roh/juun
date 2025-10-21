/**
 * Sanitize URLs to prevent XSS (Cross-Site Scripting) attacks
 *
 * Blocks dangerous protocols like javascript:, data:, vbscript:, etc.
 * Only allows safe protocols: http, https, mailto, and relative URLs
 *
 * @param uriComponent - URL string to sanitize
 * @returns Sanitized URL or null if invalid/dangerous
 *
 * @example
 * safeUrl("https://example.com") // ✅ "https://example.com"
 * safeUrl("/internal/path") // ✅ "/internal/path"
 * safeUrl("javascript:alert('XSS')") // ❌ null
 * safeUrl("data:text/html,<script>") // ❌ null
 */
export function safeUrl(
  uriComponent?: string | number | boolean,
): string | null {
  if (typeof uriComponent !== "string") return null;

  // Trim whitespace and normalize
  const url = uriComponent.trim();
  if (!url) return null;

  try {
    // Decode to handle encoded malicious URLs like javascript%3Aalert(1)
    const decoded = decodeURIComponent(url);

    // Check for dangerous protocols (case-insensitive)
    const dangerousProtocols = [
      "javascript:",
      "data:",
      "vbscript:",
      "file:",
      "about:",
    ];

    const lowerUrl = decoded.toLowerCase().replace(/\s/g, "");

    for (const protocol of dangerousProtocols) {
      if (lowerUrl.startsWith(protocol)) {
        console.warn(`[Security] Blocked dangerous URL protocol: ${protocol}`);
        return null;
      }
    }

    // Allow safe protocols and relative URLs
    // http(s), mailto, relative paths, fragment identifiers
    const safeProtocolPattern = /^(https?:\/\/|mailto:|\/|#|\.\/|\.\.\/)/i;
    const hasNoProtocol = !lowerUrl.includes(":");

    if (safeProtocolPattern.test(decoded) || hasNoProtocol) {
      return url; // Return original (not decoded) to preserve intentional encoding
    }

    console.warn(`[Security] Blocked URL with unrecognized protocol: ${url}`);
    return null;
  } catch {
    // Invalid URL encoding
    console.warn(`[Security] Invalid URL encoding: ${url}`);
    return null;
  }
}
