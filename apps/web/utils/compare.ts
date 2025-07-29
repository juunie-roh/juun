/**
 * Compares two values for use in Array.sort()
 * Returns:
 * - negative number if a < b
 * - 0 if a equals b
 * - positive number if a > b
 *
 * @param a First value to compare
 * @param b Second value to compare
 * @returns number indicating sort order
 */
export const compare = <T>(a: T, b: T): number => {
  // Handle null/undefined
  if (a === null || a === undefined) {
    return b === null || b === undefined ? 0 : -1;
  }
  if (b === null || b === undefined) {
    return 1;
  }

  // Handle numbers
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  // Handle dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }

  // Handle strings
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    const minLength = Math.min(a.length, b.length);
    for (let i = 0; i < minLength; i++) {
      const comparison = compare(a[i], b[i]);
      if (comparison !== 0) {
        return comparison;
      }
    }
    return a.length - b.length;
  }

  // Handle objects
  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();

    // First compare by number of keys
    if (aKeys.length !== bKeys.length) {
      return aKeys.length - bKeys.length;
    }

    // Then compare each key and value
    for (let i = 0; i < aKeys.length; i++) {
      const keyCompare = (aKeys[i] as string).localeCompare(bKeys[i] as string);
      if (keyCompare !== 0) {
        return keyCompare;
      }
      const valueCompare = compare(
        (a as any)[aKeys[i] as string],
        (b as any)[bKeys[i] as string],
      );
      if (valueCompare !== 0) {
        return valueCompare;
      }
    }
    return 0;
  }

  // Handle booleans
  if (typeof a === "boolean" && typeof b === "boolean") {
    return a === b ? 0 : a ? 1 : -1;
  }

  // Convert to string for comparing other types
  return String(a).localeCompare(String(b));
};

// Example with custom object sorting by specific property
export const compareBy = <T>(key: keyof T, descending = false) => {
  return (a: T, b: T) => {
    const result = compare(a[key], b[key]);
    return descending ? -result : result;
  };
};

/**
 * Helper to get timestamp from various date formats
 * @param date Date object, string date, or null/undefined
 * @returns timestamp number or null
 */
function getTimestamp(date: Date | string | null | undefined): number | null {
  if (!date) return null;

  if (date instanceof Date) {
    return date.getTime();
  }

  if (typeof date === "string") {
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? null : parsed.getTime();
  }

  return null;
}

/**
 * Sorts a collection of posts by date
 *
 * @param posts Array of posts to sort
 * @param descending If true, returns newest posts first (default)
 * @returns Sorted array of posts
 */
export function sortPostsByDate<
  T extends { metadata: { date?: Date | string | null | undefined } },
>(posts: T[], descending = true): T[] {
  return [...posts].sort((a, b) => {
    const timestampA = getTimestamp(a.metadata.date);
    const timestampB = getTimestamp(b.metadata.date);

    // If both posts have valid timestamps, compare them
    if (timestampA !== null && timestampB !== null) {
      return descending
        ? timestampB - timestampA // Newest first
        : timestampA - timestampB; // Oldest first
    }

    // Posts without dates should be sorted last, regardless of sort direction
    if (timestampA === null && timestampB !== null) return 1;
    if (timestampA !== null && timestampB === null) return -1;

    // If neither has a date, maintain original order
    return 0;
  });
}
