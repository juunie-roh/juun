import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from 'sonner';

import { CodeBlock } from '../components/code-block';

// Sample code for different languages
const typescriptExample = `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function getUserName(user: User): string {
  return user.name;
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", isActive: true },
  { id: 2, name: "Bob", email: "bob@example.com", isActive: false }
];

console.log(users.filter(user => user.isActive).map(getUserName));`;

const javascriptExample = `// Simple JavaScript function
function calculateTotal(items) {
  return items
    .filter(item => item.price > 0)
    .reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
}

const cart = [
  { id: 1, name: "Product 1", price: 10, quantity: 2 },
  { id: 2, name: "Product 2", price: 15, quantity: 1 },
  { id: 3, name: "Product 3", price: 0, quantity: 1 } // Free item
];

console.log(\`Total: $\${calculateTotal(cart).toFixed(2)}\`);`;

const jsonExample = `{
  "name": "shadcn-code-block",
  "version": "1.0.0",
  "description": "Syntax highlighting code block component",
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-syntax-highlighter": "^15.5.0"
  },
  "author": "Your Name",
  "license": "MIT"
}`;

const bashExample = `#!/bin/bash

# Install dependencies
npm install react-syntax-highlighter

# Create build
echo "Building project..."
npm run build

# Deploy to production
if [ "$NODE_ENV" = "production" ]; then
  echo "Deploying to production environment"
  npm run deploy
else
  echo "Skipping deployment (not production)"
fi`;

const dockerExample = `# Use Node.js LTS version as the base image
FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production \\\\
    NEXT_TELEMETRY_DISABLED=1

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application code
COPY . .

# Build the application
RUN yarn build

# Expose port
EXPOSE 3000

# Define the command to run the application
CMD ["yarn", "start"]`;

const longCodeExample = `// This is a long code example to demonstrate scrolling
${Array(25).fill(typescriptExample).join('\n\n')}`;

const meta: Meta<typeof CodeBlock> = {
  title: 'Shadcn/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A syntax highlighting code block component with copy-to-clipboard functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    code: {
      control: 'text',
      description: 'The source code to display',
    },
    language: {
      control: 'select',
      options: ['typescript', 'javascript', 'json', 'bash', 'dockerfile'],
      description: 'The programming language for syntax highlighting',
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Whether to display line numbers',
    },
    wrapLongLines: {
      control: 'boolean',
      description: 'Whether to wrap long lines',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the code block before scrolling',
    },
  },
  args: {
    code: typescriptExample,
    language: 'typescript',
    showLineNumbers: true,
    wrapLongLines: false,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
        <Toaster position="top-center" />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

// Base stories
export const TypeScript: Story = {
  args: {
    code: typescriptExample,
    language: 'typescript',
  },
};

export const JavaScript: Story = {
  args: {
    code: javascriptExample,
    language: 'javascript',
  },
};

export const JSON: Story = {
  args: {
    code: jsonExample,
    language: 'json',
  },
};

export const Bash: Story = {
  args: {
    code: bashExample,
    language: 'bash',
  },
};

export const Dockerfile: Story = {
  args: {
    code: dockerExample,
    language: 'dockerfile',
  },
};

// Configuration variants
export const WithoutLineNumbers: Story = {
  args: {
    code: typescriptExample,
    language: 'typescript',
    showLineNumbers: false,
  },
};

export const WithLineWrapping: Story = {
  args: {
    code: typescriptExample,
    language: 'typescript',
    wrapLongLines: true,
  },
};

export const CustomHeight: Story = {
  args: {
    code: longCodeExample,
    language: 'typescript',
    maxHeight: '300px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'CodeBlock with a fixed maximum height that activates scrolling for long content.',
      },
    },
  },
};

// Combined examples
export const AllLanguages: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">TypeScript</h3>
        <CodeBlock code={typescriptExample} language="typescript" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">JavaScript</h3>
        <CodeBlock code={javascriptExample} language="javascript" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">JSON</h3>
        <CodeBlock code={jsonExample} language="json" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Bash</h3>
        <CodeBlock code={bashExample} language="bash" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Dockerfile</h3>
        <CodeBlock code={dockerExample} language="dockerfile" />
      </div>
    </div>
  ),
};
