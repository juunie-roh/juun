import type { Meta, StoryObj } from '@storybook/react';

import Collapse from './Collapse';

const meta: Meta<typeof Collapse> = {
  title: 'Components/Data Display/Collapse',
  component: Collapse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    'collapse-title': 'Title',
    'collapse-title-className': 'text-xl font-extrabold',
    'collapse-content': 'Content',
    icon: undefined,
    open: undefined,
    className: 'w-96 border-base-300 bg-base-200 border',
  },
  argTypes: {
    'collapse-title': {
      control: 'object',
      description: 'Title of the element',
      type: { required: true, name: 'other', value: 'string | ReactNode' },
      table: {
        category: 'title',
        defaultValue: { summary: undefined },
        type: { summary: 'string | ReactNode' },
      },
    },
    'collapse-title-className': {
      control: 'text',
      description: 'TailwindCSS classNames for styling the title element',
      table: {
        category: 'title',
        defaultValue: { summary: 'string', detail: 'text-xl font-normal' },
        type: { summary: 'string', detail: 'TailwindCSS classNames' },
      },
    },
    'collapse-content': {
      control: 'object',
      description: 'Content of the element',
      type: { required: true, name: 'other', value: 'string | ReactNode' },
      table: {
        category: 'content',
        defaultValue: { summary: undefined },
        type: { summary: 'string | ReactNode' },
      },
    },
    icon: {
      control: 'select',
      options: [undefined, 'arrow', 'plus'],
      description: 'Icon type',
      type: 'string',
      table: {
        category: 'others',
        defaultValue: { summary: 'undefined' },
        type: {
          summary: 'undefined | string',
          detail: 'undefined | "arrow" | "plus"',
        },
      },
    },
    open: {
      control: 'boolean',
      description: 'Force to open or close the element',
      type: 'boolean',
      table: {
        category: 'others',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean' },
      },
    },
    className: {
      control: 'text',
      description: 'TailwindCSS classNames for styling the root element',
      table: {
        category: 'others',
        defaultValue: { summary: 'undefined' },
      },
      type: { name: 'string' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

// Base story
export const Default: Story = {
  args: {
    'collapse-title': 'Title',
    'collapse-title-className': 'text-xl font-extrabold',
    'collapse-content': 'Content',
    icon: undefined,
    open: undefined,
  },
};
