import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HeroHome from "./hero-home";

// Meta information for Storybook
const meta: Meta<typeof HeroHome> = {
  title: "Home/Hero",
  component: HeroHome,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      subtitle:
        "Hero component for the home page featuring dual-tone design with large typography and descriptive text.",
    },
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="min-h-screen">
        <Story />
        <div className="p-8">
          <h2 className="mb-4 text-lg font-semibold">Additional Content</h2>
          <p className="text-muted-foreground">
            This shows how the hero component looks with content below it. The
            hero uses a dual-tone design with primary background on top and
            background color on bottom, creating a visually striking contrast
            with the large "Juun" text overlapping both sections.
          </p>
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof HeroHome>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Default hero component showcasing the dual-tone design with overlapping typography. Features custom font stacks and responsive text sizing.",
      },
    },
  },
};
