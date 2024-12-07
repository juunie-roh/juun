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

export const Full: Story = {
  render: (args) => (
    <>
      <div className="my-1 flex w-full justify-center gap-1">
        <Kbd {...args}>q</Kbd>
        <Kbd {...args}>w</Kbd>
        <Kbd {...args}>e</Kbd>
        <Kbd {...args}>r</Kbd>
        <Kbd {...args}>t</Kbd>
        <Kbd {...args}>y</Kbd>
        <Kbd {...args}>u</Kbd>
        <Kbd {...args}>i</Kbd>
        <Kbd {...args}>o</Kbd>
        <Kbd {...args}>p</Kbd>
      </div>
      <div className="my-1 flex w-full justify-center gap-1">
        <Kbd {...args}>a</Kbd>
        <Kbd {...args}>s</Kbd>
        <Kbd {...args}>d</Kbd>
        <Kbd {...args}>f</Kbd>
        <Kbd {...args}>g</Kbd>
        <Kbd {...args}>h</Kbd>
        <Kbd {...args}>j</Kbd>
        <Kbd {...args}>k</Kbd>
        <Kbd {...args}>l</Kbd>
      </div>
      <div className="my-1 flex w-full justify-center gap-1">
        <Kbd {...args}>z</Kbd>
        <Kbd {...args}>x</Kbd>
        <Kbd {...args}>c</Kbd>
        <Kbd {...args}>v</Kbd>
        <Kbd {...args}>b</Kbd>
        <Kbd {...args}>n</Kbd>
        <Kbd {...args}>m</Kbd>
        <Kbd {...args}>/</Kbd>
      </div>
    </>
  ),
};
