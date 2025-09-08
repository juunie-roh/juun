import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColumnDef } from "@tanstack/react-table";

import ViewTable from "../components/view-table";

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
const peopleColumns: ColumnDef<Person>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return formatted;
    },
  },
  {
    accessorKey: "stock",
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
  },
];

const meta: Meta<typeof ViewTable> = {
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
    columns: {
      description: "Column definitions for the table",
    },
    data: {
      description: "Array of data to display in the table",
    },
    pinHeader: {
      control: "boolean",
      description: "Whether to pin the header to the top when scrolling",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the table",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ViewTable>;

// Basic examples
export const Default: Story = {
  args: {
    columns: peopleColumns,
    data: samplePeople,
  },
};

export const WithPinnedHeader: Story = {
  args: {
    columns: peopleColumns,
    data: samplePeople,
    pinHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Table with pinned header that stays visible when scrolling.",
      },
    },
  },
};

export const ProductTable: Story = {
  args: {
    columns: productColumns,
    data: sampleProducts,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Example showing a product inventory table with custom cell formatting.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    columns: peopleColumns,
    data: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Table showing the empty state when no data is provided.",
      },
    },
  },
};

export const LargeDataset: Story = {
  args: {
    columns: peopleColumns,
    data: Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 1}`,
      firstName: `User${i + 1}`,
      lastName: `Lastname${i + 1}`,
      age: Math.floor(Math.random() * 50) + 20,
      email: `user${i + 1}@example.com`,
      status: Math.random() > 0.5 ? "active" : ("inactive" as const),
    })),
    pinHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Table with a larger dataset to demonstrate scrolling behavior with pinned header.",
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    columns: productColumns,
    data: sampleProducts,
    className: "border-2 border-dashed border-gray-300 rounded-lg",
    pinHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Table with custom styling applied through className prop.",
      },
    },
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
  args: {
    columns: simpleColumns,
    data: simpleData,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A minimal table with just two columns showing basic key-value pairs.",
      },
    },
  },
};

// Showcase different table sizes
export const TableShowcase: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">People Table</h3>
          <ViewTable columns={peopleColumns} data={samplePeople.slice(0, 3)} />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Product Inventory</h3>
          <ViewTable
            columns={productColumns}
            data={sampleProducts.slice(0, 3)}
            pinHeader
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Empty State</h3>
          <ViewTable columns={simpleColumns} data={[]} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Showcase of different table configurations and use cases.",
      },
    },
  },
};
