import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Link from 'next/link';

import { Circle, Loader2, Square } from '@/assets/icons';

import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Shadcn/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'Displays a button or a component that looks like a button.',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    onClick: { table: { disable: true } },
    children: {},
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
      description: 'Button with `variant` style',
      table: {
        defaultValue: { summary: 'primary' },
        type: {
          summary: 'string | undefined',
          detail: `undefined | "primary" | "secondary" | "destructive" | "outline" | "ghost" | "link"`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of Button',
      table: {
        defaultValue: { summary: 'md' },
        type: {
          summary: 'string | undefined',
          detail: `undefined | "sm" | "md" | "lg"`,
        },
      },
    },
    shape: {
      control: 'select',
      options: [undefined, 'square', 'circle'],
      description: 'Shape of Button',
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string | undefined',
          detail: `undefined | "square" | "circle"`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Button' },
};

export const Variants: Story = {
  parameters: {
    docs: { description: { story: 'Button with `variant` style' } },
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { docs: { description: { story: 'Size of Button' } } },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Button {...args} size="sm">
        Small (sm)
      </Button>
      <Button {...args} size="md">
        Default (md)
      </Button>
      <Button {...args} size="lg">
        Large (lg)
      </Button>
    </div>
  ),
};

export const Shapes: Story = {
  parameters: { docs: { description: { story: 'Shape of Button' } } },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Button {...args} shape={undefined}>
        Default
      </Button>
      <Button {...args} shape="square" aria-label="Square">
        <Square />
      </Button>
      <Button {...args} shape="circle" aria-label="Circle">
        <Circle />
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: (args) => (
    <Button {...args} disabled>
      <Loader2 className="animate-spin" />
      Loading
    </Button>
  ),
};

export const AsChild: Story = {
  argTypes: {
    children: { table: { disable: true } },
  },
  render: (args) => (
    <Button {...args} asChild>
      <Link href="/login">Login</Link>
    </Button>
  ),
};
