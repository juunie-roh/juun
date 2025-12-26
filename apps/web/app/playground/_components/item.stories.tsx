import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Prose } from "@/components/ui/prose";

import PlaygroundItem from "./item";

const meta: Meta<typeof PlaygroundItem> = {
  title: "Components/Playground/Item",
  component: PlaygroundItem,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Components for displaying playground items with consistent styling.",
    },
  },
  tags: ["autodocs"],
  args: {
    title: "Playground Item Title",
    href: "#",
    description: (
      <Prose>
        <p>Playground item description</p>
        <ul>
          <li>bullet point 1</li>
          <li>bullet point 2</li>
          <li>bullet point 3</li>
          <li>bullet point 4</li>
        </ul>
      </Prose>
    ),
    date: "2024-04-20",
    category: "3D",
  },
  argTypes: {
    href: { control: false },
    description: {
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    date: { control: "date" },
    category: {
      control: "select",
      options: ["3D", "UI", "Content Management"],
    },
    image: {
      control: false,
      table: { type: { summary: "string", detail: "image source url" } },
    },
    imageStyle: {
      control: false,
      table: { type: { summary: "CSSProperties" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PlaygroundItem>;

export const Default: Story = {
  render: (args) => (
    <div className="w-175 border bg-(image:--bg-dashed) py-8">
      <PlaygroundItem {...args} />
    </div>
  ),
};

export const MultipleItems: Story = {
  render: (args) => (
    <div className="flex w-175 flex-col gap-8 border bg-(image:--bg-dashed) py-8">
      <PlaygroundItem {...args} />
      <PlaygroundItem {...args} />
      <PlaygroundItem {...args} />
      <PlaygroundItem {...args} />
    </div>
  ),
};

export const ItemsNotFound: Story = {
  render: () => (
    <div className="w-175 border bg-(image:--bg-dashed) py-8">
      <PlaygroundItem
        title="No Items Found"
        category="Not Found"
        description={<>No items available!</>}
        date="1900-01-01"
        href="/playground"
      />
    </div>
  ),
};
