import { TimelineItem } from "../_components/timeline";

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    title: "Project Inception",
    description:
      "Initial commit with Next.js, TypeScript, Yarn Berry PnP, Jest, ESLint, Husky, and Commitlint",
    detail: (
      <>
        <p>hi</p>
      </>
    ),
    date: "2024-09-27",
    category: "Foundation",
    tags: ["Next.js", "TypeScript", "Yarn Berry"],
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
