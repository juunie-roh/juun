import type { PostWithoutContent } from "@juun/db/post";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { BlogCard, BlogCardSkeleton } from "./card";

const metadata: PostWithoutContent = {
  id: 1,
  title: "Internationalization",
  category: "CASE_STUDY",
  image: "/juun.png",
  created_at: new Date("2026-02-04"),
  updated_at: new Date("2026-02-04"),
  tags: ["next.js", "i18n"],
  translation: {
    locale: "en",
    description:
      "Applying Next.js i18n: from the database to metadata and SEO optimization",
    word_count: 3800,
  },
};

const meta: Meta<typeof BlogCard> = {
  title: "Components/Blog/Card",
  component: BlogCard,
  parameters: {
    layout: "centered",
    docs: {
      subtitle: "Blog post card used in the blog list and home carousel.",
    },
  },
  tags: ["autodocs"],
  args: { metadata },
  argTypes: {
    metadata: { control: "object" },
    index: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BlogCard>;

export const WithImage: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img")).toBeInTheDocument();
  },
};

export const WithoutImage: Story = {
  args: { metadata: { ...metadata, image: null } },
  play: async ({ canvasElement }) => {
    // The placeholder is decorative, so query the DOM rather than by role.
    await expect(canvasElement.querySelector("img")).toBeNull();
    await expect(
      canvasElement.querySelector('[aria-hidden="true"]'),
    ).toBeInTheDocument();
  },
};

export const Grid: Story = {
  decorators: [
    (Story) => (
      <div className="grid w-200 grid-cols-2 gap-8">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <>
      <BlogCard {...args} />
      <BlogCard
        metadata={{
          ...metadata,
          id: 2,
          title: "Value of Effort",
          category: "ANALYSIS",
          image: null,
        }}
        index={1}
      />
    </>
  ),
};

export const Skeleton: Story = {
  render: () => <BlogCardSkeleton />,
};
