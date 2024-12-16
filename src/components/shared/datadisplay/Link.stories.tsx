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
  args: {
    children: 'Default Link',
    href: '#',
  },
};

export const HoverOnly: Story = {
  args: {
    children: 'Hover Only',
    'hover-only': true,
  },
};
