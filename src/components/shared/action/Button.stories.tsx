import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'Buttons allow the user to take actions or make choices.',
    docs: {
      description: {
        component: 'Detail',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    onClick: fn(),
  },
  argTypes: {
    children: {
      control: 'text',
      table: {
        category: 'default',
        defaultValue: { summary: 'Button' },
        type: {
          summary: 'ReactNode | string | undefined',
        },
      },
    },
    onClick: {
      control: false,
      table: {
        disable: true,
        category: 'default',
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
      ],
      description: 'Button with `variant` style',
      table: {
        category: 'style',
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string',
          detail: `undefined | "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost" | "link" | "outline"`,
        },
      },
    },
    outline: {
      control: 'boolean',
      description: 'Transparent Button with colored border',
      table: {
        category: 'style',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean | undefined' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of Button',
      table: {
        category: 'size',
        defaultValue: { summary: 'md' },
        type: { summary: 'string', detail: `"xs" | "sm" | "md" | "lg"` },
      },
    },
    shape: {
      control: 'select',
      options: [undefined, 'wide', 'circle', 'square'],
      description: 'Shape of button',
      table: {
        category: 'shape',
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string',
          detail: `undefined | "wide" | "block" | "circle" | "square"`,
        },
      },
    },
    block: {
      control: 'boolean',
      description: 'Full width button',
      table: {
        category: 'shape',
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'boolean | undefined',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Force button to show disabled state',
      table: {
        category: 'others',
        defaultValue: { summary: 'false' },
      },
    },
    glass: {
      control: 'boolean',
      description: 'Button with a glass effect',
      table: {
        category: 'others',
        defaultValue: { summary: 'false' },
      },
    },
    'no-animation': {
      control: 'boolean',
      description: 'Disable click animation',
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
      </div>
    </div>
  ),
};

export const Outline: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Button {...args} variant={undefined} outline>
          Default
        </Button>
        <Button {...args} variant="neutral" outline>
          Neutral
        </Button>
        <Button {...args} variant="primary" outline>
          Primary
        </Button>
        <Button {...args} variant="secondary" outline>
          Secondary
        </Button>
        <Button {...args} variant="accent" outline>
          Accent
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button {...args} variant="info" outline>
          Info
        </Button>
        <Button {...args} variant="success" outline>
          Success
        </Button>
        <Button {...args} variant="warning" outline>
          Warning
        </Button>
        <Button {...args} variant="error" outline>
          Error
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

export const Block: Story = {
  render: (args) => (
    <div className="w-96">
      <Button {...args} block>
        Block
      </Button>
    </div>
  ),
};

export const NoAnimation: Story = {
  args: { children: 'No Animation' },
  render: (args) => <Button {...args} no-animation></Button>,
};

export const Disabled: Story = {
  args: { children: 'Disabled' },
  render: (args) => <Button {...args} disabled></Button>,
};

export const Glass: Story = {
  args: { children: 'Glass' },
  render: (args) => <Button {...args} glass></Button>,
};
