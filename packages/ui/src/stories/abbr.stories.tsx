import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, within } from "storybook/test";

import { Abbr, AbbrProps } from "../components/abbr";
import { TooltipProvider } from "../components/tooltip";

const meta: Meta<AbbrProps> = {
  title: "shadcn/Abbr",
  component: Abbr,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "",
    },
  },
  tags: ["autodocs", "test"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "default",
    title: "default",
    delayDuration: 0, // Remove delay for testing
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the abbr element exists with correct text
    const abbrElement = canvas.getByText("default");
    await expect(abbrElement).toBeInTheDocument();
    await expect(abbrElement.tagName).toBe("ABBR");

    // Hover over the abbreviation to trigger tooltip
    await userEvent.hover(abbrElement);

    // Wait for tooltip to appear (portal renders outside canvas)
    const tooltip = await screen.findByRole("tooltip");
    await expect(tooltip).toBeInTheDocument();
    await expect(tooltip).toHaveTextContent("default");

    // Verify Radix UI connects tooltip to trigger for accessibility
    await expect(abbrElement).toHaveAttribute("aria-describedby");

    // Unhover to close tooltip
    await userEvent.unhover(abbrElement);
  },
};
