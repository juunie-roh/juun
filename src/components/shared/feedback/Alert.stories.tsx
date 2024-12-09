import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/shared/action/Button';

import Alert from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [undefined, 'info', 'success', 'warning', 'error'],
      description: 'Determines the style and icon of the alert',
      table: {
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'string | undefined',
          detail: 'undefined | "info" | "success" | "warning" | "error"',
        },
      },
    },
    'alert-title': {
      control: 'object',
      description: 'Title text for the alert',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'React.ReactNode | string | undefined' },
      },
    },
    'alert-description': {
      control: 'object',
      description: 'Description text for the alert',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'React.ReactNode | string | undefined' },
      },
    },
    icon: {
      control: 'object',
      description: 'Custom icon of the alert',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'React.ReactNode | undefined', detail: 'svg element' },
      },
    },
    children: {
      control: 'object',
      description: 'Main content of the alert',
      table: {
        defaultValue: { summary: '12 unread messages. Tap to see.' },
        type: { summary: 'React.ReactNode | string | undefined' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional TailwindCSS classes to apply',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string | undefined' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Base story
export const Default: Story = {
  args: {
    children: '12 unread messages. Tap to see.',
  },
};

export const Status: Story = {
  render: (args: any) => (
    <div className="flex flex-col gap-2">
      <Alert {...args} variant="info">
        New software update available.
      </Alert>
      <Alert {...args} variant="success">
        Your purchase has been confirmed!
      </Alert>
      <Alert {...args} variant="warning">
        Warning: Invalid email address!
      </Alert>
      <Alert {...args} variant="error">
        Error! Task failed.
      </Alert>
    </div>
  ),
};

export const Styled: Story = {
  args: {
    children: 'Styled Alert',
    className: 'shadow-lg',
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    children: undefined,
    'alert-title': 'Title for the Alert',
    'alert-description': 'Description for the Alert',
  },
};

export const WithButtons: Story = {
  args: {
    children: (
      <>
        <span>we use cookies for no reason.</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Deny
          </Button>
          <Button variant="primary" size="sm">
            Accept
          </Button>
        </div>
      </>
    ),
  },
};
