import type { Meta, StoryObj } from '@storybook/react';

import type { Step } from '@/types/ui.types';

import Steps from './Steps';

const steps: Step[] = [
  { variant: 'primary', children: 'Register' },
  { variant: 'primary', children: 'Choose Plan' },
  { children: 'Purchase' },
  { children: 'Receive Product' },
];

const meta: Meta<typeof Steps> = {
  title: 'Components/Navigation/Steps',
  component: Steps,
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'Steps can be used to show a list of steps in a process.',
  },
  tags: ['autodocs'],
  args: { steps, direction: 'horizontal' },
  argTypes: {
    steps: {
      control: false,
      description: 'An array of step item',
      type: {
        required: true,
        name: 'array',
        value: { name: 'object', value: {} },
      },
    },
    direction: {
      control: 'select',
      option: ['vertical', 'horizontal'],
      description: 'make Steps `direction`',
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'string', detail: `"vertical" | "horizontal"` },
      },
    },
  },
  render: undefined,
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { direction: 'vertical' },
};

export const WithDataContent: Story = {
  args: {
    steps: [
      { 'data-content': '!', children: 'Step 1', variant: 'neutral' },
      { 'data-content': '@', children: 'Step 2', variant: 'neutral' },
      { 'data-content': '#', children: 'Step 3', variant: 'neutral' },
      { 'data-content': '$', children: 'Step 4', variant: 'neutral' },
      { 'data-content': '%', children: 'Step 5', variant: 'neutral' },
    ],
  },
};

export const WithScrollableWrapper: Story = {
  args: {
    steps: [
      { children: 'start' },
      { children: '2', variant: 'secondary' },
      { children: '3', variant: 'secondary' },
      { children: '4', variant: 'secondary' },
      { children: '5' },
      { children: '6', variant: 'accent' },
      { children: '7', variant: 'accent' },
      { children: '8', variant: 'accent' },
      { children: '9' },
      { children: '10', variant: 'error' },
      { children: '11', variant: 'error' },
      { children: '12' },
      { children: '13' },
      { children: '14', variant: 'warning' },
      { children: '15', variant: 'warning' },
      { children: '16' },
      { children: '17', variant: 'neutral' },
      { children: '18', variant: 'neutral' },
      { children: '19', variant: 'neutral' },
      { children: 'end', variant: 'neutral' },
    ],
  },
  render: (args) => (
    <div tabIndex={0} className="w-96 overflow-auto">
      <Steps {...args} />
    </div>
  ),
};
