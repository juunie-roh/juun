import type { Meta, StoryObj } from '@storybook/react';

import type { MenuItem } from '@/types/ui.types';

import Menu from './Menu';

const items: MenuItem[] = [
  {
    value: 'Menu 1',
    key: 'Menu 1',
    href: '#',
  },
  {
    value: 'Default Parent',
    key: 'Default Parent',
    href: '#',
    children: [
      { value: 'SubMenu 1', key: 'Default Parent Submenu 1', href: '#' },
      { value: 'SubMenu 2', key: 'Default Parent Subment 2', href: '#' },
    ],
  },
  {
    value: 'Title Parent',
    key: 'Title Parent',
    href: '#',
    title: true,
    children: [
      { value: 'SubMenu 1', key: 'Title Parent Submenu 1', href: '#' },
      { value: 'SubMenu 2', key: 'Title Parent Subment 2', href: '#' },
    ],
  },
  {
    value: 'Dropdown Parent',
    key: 'Dropdown Parent',
    href: '#',
    dropdown: true,
    children: [
      { value: 'SubMenu 1', key: 'Dropdown Parent Submenu 1', href: '#' },
      { value: 'SubMenu 2', key: 'Dropdown Parent Subment 2', href: '#' },
      {
        value: 'Parent',
        key: 'Parent',
        href: '#',
        dropdown: true,
        children: [
          { value: 'Item 1', key: 'Item 1', href: '#' },
          { value: 'Item 2', key: 'Item 2', href: '#' },
        ],
      },
    ],
  },
];

const meta: Meta<typeof Menu> = {
  title: 'Components/Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    componentSubtitle:
      'Menu is used to display a list of links vertically or horizontally.',
  },
  tags: ['autodocs'],
  args: {
    'menu-items': items,
    className: 'bg-base-200 rounded-box',
  },
  argTypes: {
    'menu-items': {
      control: 'object',
      description: 'Items of Menu',
      table: {
        defaultValue: { summary: 'items' },
        type: { summary: 'MenuItem[]' },
      },
      type: {
        required: true,
        name: 'array',
        value: { name: 'object', value: {} },
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
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of Menu',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'string', detail: `"xs" | "sm" | "md" | "lg"` },
      },
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Direction of Menu',
      table: {
        defaultValue: { summary: 'vertical' },
        type: { summary: 'string', detail: `"vertical" | "horizontal"` },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { direction: 'horizontal' },
};

export const Sizes: Story = {
  render: (args) => (
    <div
      className={
        args.direction === 'horizontal'
          ? 'flex flex-col items-center gap-2'
          : 'flex items-center gap-2'
      }
    >
      <Menu {...args} size="xs" />
      <Menu {...args} size="sm" />
      <Menu {...args} size="md" />
      <Menu {...args} size="lg" />
    </div>
  ),
};

export const ForceActive: Story = {
  parameters: {
    docs: {
      description: { story: 'Force a Menu item to have `active` style' },
    },
  },
  args: {
    'menu-items': [
      ...items,
      { value: 'Active', key: 'Active', href: '#', active: true },
    ],
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: { story: 'Disabled Menu item' },
    },
  },
  args: {
    'menu-items': [
      ...items,
      { value: 'Disabled', key: 'Disabled', href: '#', disabled: true },
    ],
  },
};
