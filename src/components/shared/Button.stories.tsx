import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    onClick: fn(),
  },
  argTypes: {
    children: {
      table: {
        category: 'default props',
        defaultValue: { summary: 'Button' },
        type: {
          summary: 'ReactNode | string | undefined',
        },
      },
    },
    onClick: {
      table: {
        category: 'default props',
      },
    },
    variant: {
      control: 'select',
      options: [
        undefined,
        'neutral',
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'error',
        'ghost',
        'link',
        'outline',
      ],
      description: 'type of button',
      table: {
        category: 'variant',
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string',
          detail: `undefined | "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost" | "link" | "outline"`,
        },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'size of button',
      table: {
        category: 'size',
        defaultValue: { summary: 'md' },
        type: { summary: 'string', detail: `"xs" | "sm" | "md" | "lg"` },
      },
    },
    shape: {
      control: 'select',
      options: [undefined, 'wide', 'block', 'circle', 'square'],
      description: 'shape of button',
      table: {
        category: 'shape',
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string',
          detail: `undefined | "wide" | "block" | "circle" | "square"`,
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'disable button',
      table: {
        category: 'others',
        defaultValue: { summary: 'false' },
      },
    },
    glass: {
      control: 'boolean',
      description: 'enable glass effect on button',
      table: {
        category: 'others',
        defaultValue: { summary: 'false' },
      },
    },
    'no-animation': {
      control: 'boolean',
      description: 'disable animation on button',
      table: {
        category: 'others',
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Base story
export const Default: Story = {
  args: {
    variant: undefined,
    size: 'md',
    children: 'Button',
  },
};

// Variant stories
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Button {...args} variant={undefined}>
          Default
        </Button>
        <Button {...args} variant="neutral">
          Neutral
        </Button>
        <Button {...args} variant="primary">
          Primary
        </Button>
        <Button {...args} variant="secondary">
          Secondary
        </Button>
        <Button {...args} variant="accent">
          Accent
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button {...args} variant="info">
          Info
        </Button>
        <Button {...args} variant="success">
          Success
        </Button>
        <Button {...args} variant="warning">
          Warning
        </Button>
        <Button {...args} variant="error">
          Error
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button {...args} variant="ghost">
          Ghost
        </Button>
        <Button {...args} variant="link">
          Link
        </Button>
        <Button {...args} variant="outline">
          Outline
        </Button>
      </div>
    </div>
  ),
};

// Size stories
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Button {...args} size="xs">
        Extra Small
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

// Shape stories
export const Shapes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Button {...args} shape="wide">
        Wide
      </Button>
      <Button {...args} shape="square">
        Square
      </Button>
      <Button {...args} shape="circle">
        Circle
      </Button>
    </div>
  ),
};

export const Animation: Story = {
  args: {
    variant: 'primary',
    'no-animation': true,
    children: 'Animation Disabled',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
};

export const Glass: Story = {
  args: {
    variant: undefined,
    glass: true,
    children: 'Glass',
  },
};
