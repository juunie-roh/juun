import type { Meta, StoryObj } from '@storybook/react';

import Button from '../action/Button';
import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'Tooltip can be used to show a message when hovering over an element',
  },
  tags: ['autodocs'],
  args: {
    'data-tip': 'hello',
    variant: undefined,
    position: 'top',
    open: undefined,
  },
  argTypes: {
    'data-tip': {
      control: 'text',
      description: 'Content of Tooltip',
      table: {
        defaultValue: { summary: 'hello' },
        type: { summary: 'string' },
      },
      type: { required: true, name: 'string' },
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
      description: 'Tooltip with `variant` style',
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string',
          detail: `undefined | "neutral" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"`,
        },
      },
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Where to put Tooltip',
      table: {
        defaultValue: { summary: 'top' },
        type: {
          summary: 'string',
          detail: `"top" | "bottom" | "left" | "right"`,
        },
      },
    },
    open: {
      control: 'boolean',
      description: 'Force open Tooltip',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean | undefined' },
      },
    },
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};

export const ForceOpen: Story = {
  parameters: { docs: { description: { story: 'Force open Tooltip' } } },
  args: { open: true },
};

export const Variants: Story = {
  parameters: {
    docs: { description: { story: 'Tooltip with `variant` styles' } },
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Tooltip {...args} data-tip="default" open>
          <Button>default</Button>
        </Tooltip>
        <Tooltip {...args} variant="neutral" data-tip="neutral" open>
          <Button variant="neutral">neutral</Button>
        </Tooltip>
        <Tooltip {...args} variant="primary" data-tip="primary" open>
          <Button variant="primary">primary</Button>
        </Tooltip>
        <Tooltip {...args} variant="secondary" data-tip="secondary" open>
          <Button variant="secondary">secondary</Button>
        </Tooltip>
        <Tooltip {...args} variant="accent" data-tip="accent" open>
          <Button variant="accent">accent</Button>
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip
          {...args}
          variant="info"
          data-tip="info"
          position="bottom"
          open
        >
          <Button variant="info">info</Button>
        </Tooltip>
        <Tooltip
          {...args}
          variant="success"
          data-tip="success"
          position="bottom"
          open
        >
          <Button variant="success">success</Button>
        </Tooltip>
        <Tooltip
          {...args}
          variant="warning"
          data-tip="warning"
          position="bottom"
          open
        >
          <Button variant="warning">warning</Button>
        </Tooltip>
        <Tooltip
          {...args}
          variant="error"
          data-tip="error"
          position="bottom"
          open
        >
          <Button variant="error">error</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const Positions: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Tooltip {...args} position="top" data-tip="top" open>
          <Button>Top</Button>
        </Tooltip>
        <Tooltip {...args} position="right" data-tip="right" open>
          <Button>Right</Button>
        </Tooltip>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip {...args} position="left" data-tip="left" open>
          <Button>Left</Button>
        </Tooltip>
        <Tooltip {...args} position="bottom" data-tip="bottom" open>
          <Button>Bottom</Button>
        </Tooltip>
      </div>
    </div>
  ),
};
