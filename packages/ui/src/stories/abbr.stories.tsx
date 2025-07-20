import type { Meta, StoryObj } from "@storybook/react-vite";

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
  },
};
