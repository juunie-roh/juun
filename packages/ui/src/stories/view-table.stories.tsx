import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Pin, PinOff } from "lucide-react";

import { Button } from "../components/button";
import ViewTable from "../components/view-table";
import { useTable } from "../hooks/use-table";

// Sample data types
interface Person {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  status: "active" | "inactive";
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

// Sample data
const samplePeople: Person[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    age: 32,
    email: "john.doe@example.com",
    status: "active",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    age: 28,
    email: "jane.smith@example.com",
    status: "active",
  },
  {
    id: "3",
    firstName: "Bob",
    lastName: "Johnson",
    age: 45,
    email: "bob.johnson@example.com",
    status: "inactive",
  },
  {
    id: "4",
    firstName: "Alice",
    lastName: "Williams",
    age: 35,
    email: "alice.williams@example.com",
    status: "active",
  },
  {
    id: "5",
    firstName: "Charlie",
    lastName: "Brown",
    age: 29,
    email: "charlie.brown@example.com",
    status: "inactive",
  },
];

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    stock: 15,
  },
  { id: "2", name: "Mouse", category: "Electronics", price: 29.99, stock: 50 },
  {
    id: "3",
    name: "Keyboard",
    category: "Electronics",
    price: 79.99,
    stock: 25,
  },
  {
    id: "4",
    name: "Monitor",
    category: "Electronics",
    price: 299.99,
    stock: 8,
  },
  { id: "5", name: "Webcam", category: "Electronics", price: 89.99, stock: 12 },
];

// Column definitions
const person = createColumnHelper<Person>();
const peopleColumns = [
  person.accessor("firstName", {
    header: "First Name",
  }),
  person.accessor("lastName", {
    header: "Last Name",
  }),
  person.accessor("age", {
    header: "Age",
  }),
  person.accessor("email", {
    header: "Email",
  }),
  person.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  }),
];

const product = createColumnHelper<Product>();
const productColumns = [
  product.accessor("name", {
    header: "Product Name",
  }),
  product.accessor("category", {
    header: "Category",
  }),
  product.accessor("price", {
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return formatted;
    },
  }),
  product.accessor("stock", {
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number;
      return (
        <span
          className={`font-medium ${
            stock > 20
              ? "text-green-600"
              : stock > 10
                ? "text-yellow-600"
                : "text-red-600"
          }`}
        >
          {stock}
        </span>
      );
    },
  }),
];

const meta: Meta<typeof ViewTable<any>> = {
  title: "shadcn/ViewTable",
  component: ViewTable,
  parameters: {
    layout: "padded",
    docs: {
      subtitle: "A simple table for viewing data using TanStack React Table.",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    table: {
      description: "Table object created with `@tanstack/react-table`.",
    },
    empty: {
      description: "Custom empty state content when no data is available",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the table",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  render: (args) => {
    const { table } = useTable(peopleColumns, samplePeople);
    return <ViewTable {...args} table={table} />;
  },
};

export const CustomEmptyState: Story = {
  args: {
    empty: (
      <div className="text-muted-foreground">
        No people found. Try adding some data.
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Table with a custom empty state message.",
      },
    },
  },
  render: (args) => {
    const { table } = useTable(peopleColumns, []);
    return <ViewTable {...args} table={table} />;
  },
};

export const ProductTable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Example showing a product inventory table with custom cell formatting.",
      },
    },
  },
  render: (args) => {
    const { table } = useTable(productColumns, sampleProducts);
    return <ViewTable {...args} table={table} />;
  },
};

export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story: "Table showing the empty state when no data is provided.",
      },
    },
  },
  render: (args) => {
    const { table } = useTable(peopleColumns, []);
    return <ViewTable {...args} table={table} />;
  },
};

export const LargeDataset: Story = {
  parameters: {
    docs: {
      description: {
        story: "Table with a larger dataset to demonstrate scrolling behavior.",
      },
    },
  },
  render: (args) => {
    const { table } = useTable(
      peopleColumns,
      Array.from({ length: 50 }, (_, i) => ({
        id: `${i + 1}`,
        firstName: `User${i + 1}`,
        lastName: `Lastname${i + 1}`,
        age: Math.floor(Math.random() * 50) + 20,
        email: `user${i + 1}@example.com`,
        status: Math.random() > 0.5 ? "active" : ("inactive" as const),
      })),
    );
    return <ViewTable {...args} table={table} />;
  },
};

export const CustomStyling: Story = {
  args: {
    className: "border-2 border-dashed border-gray-300 rounded-lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Table with custom styling applied through className prop.",
      },
    },
  },
  render: (args) => {
    const { table } = useTable(productColumns, sampleProducts);
    return <ViewTable {...args} table={table} />;
  },
};

// Simple columns example
const simpleColumns: ColumnDef<{ name: string; value: string }>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
];

const simpleData = [
  { name: "Setting 1", value: "Enabled" },
  { name: "Setting 2", value: "Disabled" },
  { name: "Setting 3", value: "Auto" },
];

export const SimpleTable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A minimal table with just two columns showing basic key-value pairs.",
      },
    },
  },
  render: (args) => {
    const { table } = useTable(simpleColumns, simpleData);
    return <ViewTable {...args} table={table} />;
  },
};

// Column pinning example
const pinnedColumns = [
  person.accessor("id", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          column.getIsPinned() ? column.pin(false) : column.pin("left")
        }
      >
        ID {column.getIsPinned() ? <Pin /> : <PinOff />}
      </Button>
    ),
    size: 100,
  }),
  person.accessor("firstName", {
    header: "First Name",
  }),
  person.accessor("lastName", {
    header: "Last Name",
  }),
  person.accessor("age", {
    header: "Age",
  }),
  person.accessor("email", {
    header: "Email",
  }),
  person.accessor("status", {
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          column.getIsPinned() ? column.pin(false) : column.pin("right")
        }
      >
        Status {column.getIsPinned() ? <Pin /> : <PinOff />}
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <span
          className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  }),
];

export const ColumnPinning: Story = {
  render: () => {
    const { table } = useTable(pinnedColumns, samplePeople);
    return (
      <div className="w-[500px] overflow-x-auto">
        <ViewTable table={table} />
      </div>
    );
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        story:
          "Table with column pinning support. Columns can be pinned to the left or right using the table's column pinning API. The ID column is configured with a fixed size.",
      },
    },
  },
};
