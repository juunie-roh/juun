/**
 * Safely formats a date that might be a Date object or a string
 * @param date The date to format (Date object or string)
 * @param locale The locale to use for formatting
 * @returns Formatted date string or the original string if parsing fails
 */
export function formatDateSafe(
  date: Date | string | undefined | null,
  locale: string = "en-US",
): string {
  if (!date) return "";

  // If it's already a string, try to parse it first
  if (typeof date === "string") {
    const parsedDate = parseDate(date);
    // If parsing fails, return the original string
    if (!parsedDate) return date;
    return formatDate(parsedDate, locale);
  }

  return formatDate(date, locale);
}

/**
 * Formats a Date object to a string in the format "Month YYYY"
 * @param date The date to format
 * @param locale The locale to use for formatting (default: 'en-US')
 * @returns A string in the format "Month YYYY"
 */
export function formatDate(date: Date, locale: string = "en-US"): string {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return "";
  }

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString(locale, options);
}

/**
 * Parses a date string to a Date object
 * Supported formats:
 * - "Month YYYY" (e.g. "January 2024")
 * - "YYYY-MM-DD" (ISO format)
 * - Any format that the Date constructor can handle
 *
 * @param dateString The date string to parse
 * @returns A Date object, or null if parsing fails
 */
export function parseDate(dateString: string): Date | null {
  if (!dateString) {
    return null;
  }

  // Try to parse the string using Date constructor first
  const dateFromConstructor = new Date(dateString);
  if (!isNaN(dateFromConstructor.getTime())) {
    return dateFromConstructor;
  }

  // Try to parse "Month YYYY" format
  const monthYearRegex =
    /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})$/;
  const monthYearMatch = dateString.match(monthYearRegex);

  if (monthYearMatch) {
    const month = monthYearMatch[1];
    const year = parseInt(monthYearMatch[2]!, 10);

    // Map month names to month numbers
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthIndex = months.findIndex((m) => m === month);

    if (monthIndex !== -1 && !isNaN(year)) {
      return new Date(year, monthIndex);
    }
  }

  // If all parsing attempts fail, return null
  return null;
}
