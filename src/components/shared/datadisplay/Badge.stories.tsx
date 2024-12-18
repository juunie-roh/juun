import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'Badges are used to inform the user of the status of specific data.',
    // docs: {
    //   description: {
    //     component: 'Detail',
    //   },
    // },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      table: {
        category: 'default',
        defaultValue: { summary: 'Badge' },
        type: {
          summary: 'ReactNode | string | undefined',
        },
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
    outline: {
      control: 'boolean',
      description: 'Enable outline effect on the badge',
      table: {
        category: 'style',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean | undefined' },
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
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Base story
export const Default: Story = {
  args: {
    variant: undefined,
    size: 'md',
    children: 'Badge',
  },
};

// Variant stories
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Badge {...args} variant={undefined}>
          Default
        </Badge>
        <Badge {...args} variant="neutral">
          Neutral
        </Badge>
        <Badge {...args} variant="primary">
          Primary
        </Badge>
        <Badge {...args} variant="secondary">
          Secondary
        </Badge>
        <Badge {...args} variant="accent">
          Accent
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Badge {...args} variant="info">
          Info
        </Badge>
        <Badge {...args} variant="success">
          Success
        </Badge>
        <Badge {...args} variant="warning">
          Warning
        </Badge>
        <Badge {...args} variant="error">
          Error
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Badge {...args} variant="ghost">
          Ghost
        </Badge>
      </div>
    </div>
  ),
};

export const Outline: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Badge {...args} variant={undefined} outline>
          Default
        </Badge>
        <Badge {...args} variant="neutral" outline>
          Neutral
        </Badge>
        <Badge {...args} variant="primary" outline>
          Primary
        </Badge>
        <Badge {...args} variant="secondary" outline>
          Secondary
        </Badge>
        <Badge {...args} variant="accent" outline>
          Accent
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Badge {...args} variant="info" outline>
          Info
        </Badge>
        <Badge {...args} variant="success" outline>
          Success
        </Badge>
        <Badge {...args} variant="warning" outline>
          Warning
        </Badge>
        <Badge {...args} variant="error" outline>
          Error
        </Badge>
      </div>
    </div>
  ),
};

// Size stories
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Badge {...args} size="xs">
        Extra Small
      </Badge>
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
      <Badge {...args} size="lg">
        Large
      </Badge>
    </div>
  ),
};
