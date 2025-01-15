import type { Meta, StoryObj } from '@storybook/react';

import { Copy } from '@/assets/icons';

import Button from './button';
import Dialog from './dialog';
import Input from './input';
import Label from './label';

const meta: Meta<typeof Dialog> = {
  title: 'Shadcn/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.',
  },
  tags: ['autodocs'],
  args: {
    trigger: <Button variant="outline">Share</Button>,
    'dialog-title': 'Share Link',
    'dialog-description': 'Anyone who has this link will be able to view this.',
    'dialog-styles': {
      content: 'sm:max-w-md',
      header: undefined,
      title: undefined,
      description: undefined,
      footer: 'sm:justify-start',
    },
    children: (
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            defaultValue="https://ui.shadcn.com/docs/installation"
            readOnly
          />
        </div>
        <Button type="submit" size="sm" className="px-3">
          <span className="sr-only">Copy</span>
          <Copy />
        </Button>
      </div>
    ),
    close: (
      <Button type="button" variant="secondary">
        Close
      </Button>
    ),
  },
  argTypes: {
    trigger: {
      control: false,
      description: 'Trigger of Dialog to be opened',
      table: {
        type: {
          summary: 'React.ReactNode | undefined',
          detail: `string | JSX.Element | undefined`,
        },
      },
    },
    'dialog-title': {
      control: 'text',
      description: 'Title of Dialog',
      table: {
        type: {
          summary: 'React.ReactNode | undefined',
          detail: `string | JSX.Element | undefined`,
        },
      },
    },
    'dialog-description': {
      control: 'text',
      description: 'Description of Dialog',
      table: {
        type: {
          summary: 'React.ReactNode | undefined',
          detail: `string | JSX.Element | undefined`,
        },
      },
    },
    'dialog-styles': {
      control: 'object',
      description: 'ClassNames for style of Dialog',
      table: {
        type: { summary: 'DialogStyles' },
      },
    },
    footer: {
      control: 'text',
      description: 'Footer content of Dialog',
      table: {
        type: {
          summary: 'React.ReactNode | undefined',
          detail: `string | JSX.Element | undefined`,
        },
      },
    },
    close: {
      control: false,
      description: 'Trigger of Dialog to be closed',
      table: {
        type: {
          summary: 'React.ReactNode | undefined',
          detail: `string | JSX.Element | undefined`,
        },
      },
    },
    children: {
      control: false,
      description: 'Content of Dialog',
      able: {
        type: {
          summary: 'React.ReactNode | undefined',
          detail: `string | JSX.Element | undefined`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {};
