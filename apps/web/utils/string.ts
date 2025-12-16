/**
 * Capitalize given string.
 * @param s string to capitalize
 * @returns capitalized string
 */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
