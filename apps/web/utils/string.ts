/**
 * Capitalize given string.
 * @param s string to capitalize
 * @returns capitalized string
 * @example
 * capitalize("helloworld") // "Helloworld"
 */
export function capitalize(s: string): string;
/**
 * Capitalize given string.
 * @param s string to capitalize
 * @param separator a separator to split string
 * @returns capitalized string
 * @example
 * capitalize("CASE_STUDY", /[_]+/g) // "Case Study"
 */
export function capitalize(s: string, separator: RegExp | string): string;
export function capitalize(s: string, separator?: RegExp | string): string {
  if (separator) {
    const arr = s.split(separator);
    if (arr.length > 1) return arr.map((s) => capitalize(s)).join(" ");
  }

  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
