import { TimelineItem } from "../_components/timeline";

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: "001",
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
    id: "002",
    title: "UI System Setup",
    description:
      "Established component library with Tailwind CSS, DaisyUI, and Storybook for documentation",
    date: "2024-11-22",
    category: "Architecture",
    tags: ["Tailwind", "Storybook", "DaisyUI"],
  },
];
