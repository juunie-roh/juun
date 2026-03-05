/**
 * Capitalize given string.
 * @param s String to capitalize.
 * @returns Capitalized string.
 * @example
 * capitalize("helloworld") // "Helloworld"
 */
export function capitalize(s: string): string;
/**
 * Capitalize given string.
 * @param s String to capitalize.
 * @param separator A separator to split string.
 * @returns Capitalized string.
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
