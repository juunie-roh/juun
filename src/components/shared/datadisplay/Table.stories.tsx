import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import type { TableColumn, TableData, TableProps } from '@/types/ui.types';

import Table from './Table';

const getRandomPastDate = () => {
  const today = new Date();
  const pastDays = Math.floor(Math.random() * 365); // Random day within the last year
  return new Date(today.setDate(today.getDate() - pastDays));
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: Date;
};

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: getRandomPastDate(),
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: getRandomPastDate(),
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Viewer',
    status: 'inactive',
    createdAt: getRandomPastDate(),
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: getRandomPastDate(),
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'Viewer',
    status: 'inactive',
    createdAt: getRandomPastDate(),
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: getRandomPastDate(),
  },
  {
    id: 7,
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: getRandomPastDate(),
  },
  {
    id: 8,
    name: 'Fiona Apple',
    email: 'fiona.apple@example.com',
    role: 'Viewer',
    status: 'inactive',
    createdAt: getRandomPastDate(),
  },
  {
    id: 9,
    name: 'George Lucas',
    email: 'george.lucas@example.com',
    role: 'Editor',
    status: 'active',
    createdAt: getRandomPastDate(),
  },
  {
    id: 10,
    name: 'Helen Miller',
    email: 'helen.miller@example.com',
    role: 'Viewer',
    status: 'active',
    createdAt: getRandomPastDate(),
  },
  {
    id: 11,
    name: 'Ian Fleming',
    email: 'ian.fleming@example.com',
    role: 'Editor',
    status: 'inactive',
    createdAt: getRandomPastDate(),
  },
  {
    id: 12,
    name: 'Julia Roberts',
    email: 'julia.roberts@example.com',
    role: 'Admin',
    status: 'active',
    createdAt: getRandomPastDate(),
  },
  // ... more users
];
const data: TableData<User>[] = users.map((user) =>
  Object.assign(user, { rowKey: user.id }),
);

const columns: TableColumn<TableData<User>>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    className: 'font-medium',
    pin: true,
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Role',
    accessorKey: 'role',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    render: (value) => (
      <span
        className={`badge ${value === 'active' ? 'badge-success' : 'badge-error'}`}
      >
        {value as string}
      </span>
    ),
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    render: (value) => new Date(value as Date).toLocaleDateString(),
    pin: true,
  },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Data Display/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    data,
    columns: columns as unknown as TableColumn<{ rowKey: React.Key }>[],
    onRowSelect: fn(),
    onSelectAll: fn(),
  },
  argTypes: {
    data: {
      control: false,
      description: 'Data array to display in the table as rows.',
      type: {
        required: true,
        name: 'array',
        value: { name: 'object', value: {} },
      },
    },
    columns: {
      control: false,
      description: 'How to seperate the data in the table as columns.',
      type: {
        required: true,
        name: 'array',
        value: { name: 'object', value: {} },
      },
    },
    onSort: {
      control: false,
      description: 'A function to return sorted array of the data to display.',
      table: {
        category: 'sorting',
        defaultValue: { summary: 'undefined' },
      },
      type: { name: 'function' },
    },
    pagination: {
      control: 'select',
      options: ['client', 'server', false],
      description: 'How to handle the pagination',
      table: {
        categorty: 'pagination',
        defaultValue: { summary: 'client' },
        type: { summary: 'string | false' },
      },
    },
    pageSize: {
      control: 'number',
      description: 'The amount of rows to display on a page of the table',
      table: {
        category: 'pagination',
        type: { summary: 'number' },
      },
    },
    totalPages: {
      control: 'number',
      description:
        'The total size of the page. This prop is required only when the `pagination` is `server`.',
      table: {
        category: 'pagination',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number' },
      },
    },
    onPageChange: {
      control: undefined,
      description:
        'Function to be called on page change. This prop is required only when the `pagination` is `server`.',
      table: {
        category: 'pagination',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'Function' },
      },
    },
    selectable: {
      control: 'boolean',
      table: {
        category: 'selection',
        defaultValue: { summary: 'undefined' },
      },
    },
    selectedRows: {
      table: {
        category: 'selection',
      },
    },
    onRowSelect: {
      table: {
        category: 'selection',
      },
    },
    onSelectAll: {
      table: {
        category: 'selection',
      },
    },
    zebra: {
      control: 'boolean',
      description: 'Whether to apply the zebra style to the table',
      table: {
        category: 'style',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean | undefined' },
      },
    },
    'pin-rows': {
      control: 'boolean',
      description:
        'For `<table>` to make all the rows inside `<thead>` and `<tfoot>` sticky',
      table: {
        category: 'style',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean | undefined' },
      },
    },
    'pin-cols': {
      control: 'boolean',
      description: 'For `<table>` to make all the `<th>` columns sticky',
      table: {
        category: 'style',
        defaultValue: { summary: 'undefined' },
        type: { summary: 'boolean | undefined' },
      },
    },
    size: {
      control: 'select',
      description: 'Size of the table',
      options: ['xs', 'sm', 'md', 'lg'],
      table: {
        category: 'style',
        defaultValue: { summary: 'md' },
        type: { summary: 'string', detail: '"xs" | "sm" | "md" | "lg"' },
      },
    },
  },
  render: (args: TableProps<any>) => {
    return (
      <div className="w-96">
        <Table {...args} />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Base story
export const Default: Story = {
  args: {},
};
