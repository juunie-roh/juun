import type { Meta, StoryObj } from '@storybook/react';

import Link from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Data Display/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    componentSubtitle: 'Link adds the missing underline style to links.',
    docs: {
      description: {
        component: '',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    href: '#',
  },
  argTypes: {
    href: {
      control: false,
      description: 'The path or URL to navigate to. It can also be an object.',
      type: { required: true, name: 'string' },
    },
    children: {
      control: 'text',
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
      ],
      description: 'Link with `variant` color',
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string',
          detail: `undefined | "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"`,
        },
      },
    },
    'hover-only': {
      control: 'boolean',
      description: 'Only show underline on hover',
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: { children: 'Default Link' },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Link {...args} variant={undefined}>
          Default
        </Link>
        <Link {...args} variant="neutral">
          Neutral
        </Link>
        <Link {...args} variant="primary">
          Primary
        </Link>
        <Link {...args} variant="secondary">
          Secondary
        </Link>
        <Link {...args} variant="accent">
          Accent
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link {...args} variant="info">
          Info
        </Link>
        <Link {...args} variant="success">
          Success
        </Link>
        <Link {...args} variant="warning">
          Warning
        </Link>
        <Link {...args} variant="error">
          Error
        </Link>
      </div>
    </div>
  ),
};

export const HoverOnly: Story = {
  args: { children: 'Hover Only' },
  render: (args) => <Link {...args} hover-only></Link>,
};
