export type Heading = {
  id: string;
  text: string;
  level: number;
  element: Element;
};

/**
 * Extract ID from heading element
 * If no ID exists, generate one from the text content
 * @param heading Target heading element to get ID from.
 */
export function getIdFromHeading(heading: Element): string {
  // If the heading already has an id, use it
  if (heading.id) {
    return heading.id;
  }

  // Otherwise, generate an id from the heading text
  const id = heading.textContent
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Set the id on the heading element
  if (id) {
    heading.id = id;
  }

  return id || "";
}

export function getHeadings(
  contentSelector: string,
  headingSelector: string,
): Heading[] | undefined {
  // Find the content container
  const container = document.querySelector(contentSelector);
  if (!container) return;

  // Find all headings in the container
  const elements = Array.from(container.querySelectorAll(headingSelector));

  // Process headings
  const headingElements = elements.map((element) => {
    // Get or create an ID for the heading
    const id = getIdFromHeading(element);
    // Get heading level (h2 = 2, h3 = 3, etc.)
    const level = parseInt(element.tagName[1] as string, 10);

    return {
      id,
      text: element.textContent || "",
      level,
      element,
    };
  });

  return headingElements;
}
