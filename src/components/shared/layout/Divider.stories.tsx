import type { Meta, StoryObj } from '@storybook/react';

import Divider from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    componentSubtitle:
      'Divider will be used to seperate content vertically or horizontally',
  },
  tags: ['autodocs'],
  args: {
    children: 'OR',
  },
  argTypes: {
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
      description: 'Divider with `variant` style',
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string',
          detail: `undefined | "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost" | "link" | "outline"`,
        },
      },
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Which direction to divide elements',
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string | undefined',
          detail: `undefined | "vertical" | "horiaontal"`,
        },
      },
    },
    position: {
      control: 'select',
      options: [undefined, 'start', 'end'],
      description: 'Set the children of Divider to the `position`',
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string | undefined',
          detail: `undefined | "start" | "end"`,
        },
      },
    },
  },
  render: (args) => (
    <div className="flex w-full flex-col">
      <div className="card grid h-20 place-items-center rounded-box bg-base-300">
        content
      </div>
      <Divider {...args} />
      <div className="card grid h-20 place-items-center rounded-box bg-base-300">
        content
      </div>
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const WithoutText: Story = {
  args: { children: undefined },
};

export const Horizontal: Story = {
  render: (args) => (
    <div className="flex w-full">
      <div className="card grid h-20 grow place-items-center rounded-box bg-base-300">
        content
      </div>
      <Divider {...args} direction="horizontal">
        OR
      </Divider>
      <div className="card grid h-20 grow place-items-center rounded-box bg-base-300">
        content
      </div>
    </div>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: { description: { story: 'Divider with `variant` style' } },
  },
  render: (args) => (
    <div className="flex w-full flex-col">
      <Divider {...args}>default</Divider>
      <Divider {...args} variant="neutral">
        neutral
      </Divider>
      <Divider {...args} variant="primary">
        primary
      </Divider>
      <Divider {...args} variant="secondary">
        secondary
      </Divider>
      <Divider {...args} variant="accent">
        accent
      </Divider>
      <Divider {...args} variant="info">
        info
      </Divider>
      <Divider {...args} variant="success">
        success
      </Divider>
      <Divider {...args} variant="warning">
        warning
      </Divider>
      <Divider {...args} variant="error">
        error
      </Divider>
    </div>
  ),
};

export const Positions: Story = {
  parameters: { layout: 'centered' },
  render: (args) => (
    <div
      className={
        args.direction === 'horizontal' ? 'flex h-40' : 'flex w-96 flex-col'
      }
    >
      <Divider {...args} position="start">
        start
      </Divider>
      <Divider {...args}>default</Divider>
      <Divider {...args} position="end">
        end
      </Divider>
    </div>
  ),
};
