import { TimelineItem } from "../_components/timeline";

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    title: "Project Inception",
    description:
      "Initial commit with standard single Next.js application, with various development tools and Yarn Berry PnP.",
    detail: (
      <>
        <h3>The Initial Commit</h3>
        <p>
          The foundation of the project. A single Next.js application with Yarn
          Berry PnP. Trial of modern tool chains, which I found useful at that
          time.
        </p>
      </>
    ),
    date: "2024-09-27",
    category: "Foundation",
    tags: ["Next.js", "TypeScript", "Yarn Berry", "PnP"],
  },
  {
    title: "UI System Setup",
    description:
      "Established component library with Tailwind CSS, DaisyUI, and Storybook for documentation",
    date: "2024-11-22",
    category: "Architecture",
    tags: ["Tailwind", "Storybook", "DaisyUI"],
  },
  {
    title: "Timeline Implementation",
    description:
      "Designed and implemented timeline for the project. Inspired by monolith from 2001: A Space Odyssey.",
    date: "2025-10-14",
    category: "Architecture",
    tags: ["ADR", "Component", "Timeline", "Design"],
    detail: (
      <>
        <h3>The Timeline Component</h3>
        <p>Inspired by monolith from 2001: A Space Odyssey</p>
      </>
    ),
  },
];
