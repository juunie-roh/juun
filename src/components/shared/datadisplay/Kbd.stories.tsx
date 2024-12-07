import type { Meta, StoryObj } from '@storybook/react';

import Kbd from './Kbd';

const meta: Meta<typeof Kbd> = {
  title: 'Components/Data Display/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'A',
  },
  argTypes: {
    children: {
      table: {
        category: 'default props',
        defaultValue: { summary: 'A' },
        type: {
          summary: 'ReactNode | string | undefined',
        },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'size of kbd',
      table: {
        category: 'size',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string', detail: `"xs" | "sm" | "md" | "lg"` },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

// Base story
export const Default: Story = {
  args: {
    children: 'A',
  },
};

// Size stories
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Kbd {...args} size="xs">
        Extra Small
      </Kbd>
      <Kbd {...args} size="sm">
        Small
      </Kbd>
      <Kbd {...args} size="md">
        Medium
      </Kbd>
      <Kbd {...args} size="lg">
        Large
      </Kbd>
    </div>
  ),
};
