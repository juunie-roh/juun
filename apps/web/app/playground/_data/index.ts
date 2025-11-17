type PlaygroundCategory = "3D" | "UI" | "CMS";

type PlaygroundItem = {
  title: string;
  description: string;
  date: string;
  category: PlaygroundCategory;
  image: string;
};

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    title: "Three.js with Physics",
    description: "3D environment with Cannon physics.",
    date: "2024-04-20",
    category: "3D",
    image: "/images/playground/cannon-raycast-vehicle.png",
  },
];
