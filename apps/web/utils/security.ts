/**
 * Prevent XSS (Cross-Site Scripting)
 * @param uriComponent
 */
export function safeUrl(
  uriComponent: string | number | boolean,
): string | null {
  return typeof uriComponent === "string"
    ? encodeURIComponent(uriComponent)
    : null;
}
