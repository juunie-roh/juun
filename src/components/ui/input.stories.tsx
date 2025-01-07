import type { Meta, StoryObj } from '@storybook/react';

import Button from './button';
import Input from './input';
import Label from './label';

const meta: Meta<typeof Input> = {
  title: 'Shadcn/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'Displays a form input field or a component that looks like an input field.',
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    type: {
      control: 'select',
      options: [
        undefined,
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week',
      ],
      description: 'HTML input type',
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'HTMLInputTypeAttribute | undefined',
          detail: `undefined | "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"`,
        },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for input',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string | undefined' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { type: 'email', placeholder: 'Email' },
};

export const File: Story = {
  args: { type: 'file' },
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => <Input disabled {...args} />,
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" {...args} />
    </div>
  ),
};

export const WithButton: Story = {
  args: { type: 'email', placeholder: 'Email' },
  render: (args) => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input {...args} />
      <Button type="submit">Subscribe</Button>
    </div>
  ),
};
