import type { Meta, StoryObj } from "@storybook/nextjs";
import { useEffect, useState } from "react";

import { PortfolioCard, PortfolioCardSkeleton } from "../portfolio/card";

// Sample data for stories
const samplePortfolioPost = {
  slug: "portfolio-demo",
  metadata: {
    title: "E-commerce Redesign Project",
    description:
      "Complete redesign of an e-commerce platform with Next.js and Tailwind CSS, focusing on performance and conversion optimization.",
    image: "https://placehold.co/600x400/e6f7ff/0099cc?text=Portfolio+Image",
    tags: ["Next.js", "Tailwind CSS", "E-commerce"],
    date: "January 2024",
  },
};

// Cards container component for combined stories
const CardGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {children}
  </div>
);

// Loading card with transition
const LoadingCardWithTransition = ({ Component, post, delay = 1500 }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (loading) {
    return <PortfolioCardSkeleton />;
  }

  return <Component post={post} />;
};

const meta: Meta<typeof PortfolioCard> = {
  title: "Components/Portfolio/Card",
  component: PortfolioCard,
  parameters: {
    layout: "centered",
    docs: {
      subtitle:
        "Card components for displaying blog posts and portfolio items with consistent styling.",
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PortfolioCard>;

export const Default: Story = {
  render: () => (
    <CardGrid>
      <PortfolioCard post={samplePortfolioPost} />
    </CardGrid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Card component for displaying portfolio projects. Shows title, description, tags, and thumbnail image.",
      },
    },
  },
};

export const Skeleton: Story = {
  render: () => (
    <CardGrid>
      <PortfolioCardSkeleton />
    </CardGrid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Loading skeleton for card components, used while content is being fetched.",
      },
    },
  },
};

export const LoadingTransitionExample: Story = {
  render: () => (
    <CardGrid>
      <LoadingCardWithTransition
        Component={PortfolioCard}
        post={samplePortfolioPost}
        delay={2500}
      />
    </CardGrid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Cards demonstrating the transition from loading state to loaded content.",
      },
    },
  },
};
