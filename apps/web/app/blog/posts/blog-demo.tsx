import { AspectRatio, CodeBlock, Skeleton } from '@pkg/ui';
import Image from 'next/image';
import { Fragment, Suspense } from 'react';

import { BlogHeader, BlogHeaderSkeleton } from '@/components/blog/header';

export const metadata = {
  title: 'Blog Demo, 블로그 데모',
  description:
    'A demo page for blog post demonstration. 블로그 포스트 시연을 위한 데모 페이지입니다.',
  date: '2024-01-27',
  tags: ['Next.js', 'Tailwind CSS', 'Code Block'],
  image: '/images/demo.png',
};

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
  { id: 2, name: "Bob", email: "bob@example.com", isActive: false },
];

console.log(users.filter(user => user.isActive).map(getUserName), 'Looooooooong Script');`;

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

const dockerExample = `# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app

# Set common environment variables
ENV NODE_ENV=production \\
    NEXT_TELEMETRY_DISABLED=1 \\
    PORT=3000 \\
    HOSTNAME=0.0.0.0 \\
    # Enable PnP with optimized settings
    NODE_OPTIONS="--require ./.pnp.cjs --no-warnings"

# Install only necessary dependencies for building
RUN apk add --no-cache libc6-compat && \\
    addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs

# Install dependencies only when needed
FROM base AS deps

# Copy the basic yarn dependencies
COPY --chown=nextjs:nodejs .yarn ./.yarn
COPY --chown=nextjs:nodejs .pnp.* .yarnrc.yml package.json yarn.lock ./

# Copy all package.json files from workspaces to ensure proper workspace resolution
COPY --chown=nextjs:nodejs packages/config/package.json ./packages/config/package.json
COPY --chown=nextjs:nodejs packages/ui/package.json ./packages/ui/package.json
COPY --chown=nextjs:nodejs apps/web/package.json ./apps/web/package.json

# Optimize cache layers and permissions
RUN mkdir -p /app/.yarn/cache && \\
    chown -R nextjs:nodejs /app

USER nextjs
# Install the required packages needed only to run
RUN yarn workspaces focus @app/nextjs --production

# Builder stage
FROM base AS builder

# Copy only necessary files for building
COPY --chown=nextjs:nodejs turbo.json ./
COPY --from=deps --chown=nextjs:nodejs /app/.pnp* \\
                                       /app/.yarnrc.yml \\
                                       /app/package.json \\
                                       /app/yarn.lock ./

# Copy source with appropriate permissions
COPY --chown=nextjs:nodejs . .

USER nextjs

# Build with full dependencies
RUN yarn install --immutable && \\
    yarn build

# Production image
FROM base AS runner

# Copy PnP configuration and dependencies
COPY --from=deps --chown=nextjs:nodejs /app/.yarn ./.yarn
COPY --from=deps --chown=nextjs:nodejs /app/.pnp.* \\
                                       /app/.yarnrc.yml \\
                                       /app/package.json \\
                                       /app/yarn.lock ./

# Copy only the necessary Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/.next/standalone/apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./apps/web/.next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/standalone/apps/web/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/.next/standalone/apps/web/server.js"]`;

export default function BlogDemo() {
  return (
    <Fragment>
      <Suspense fallback={<BlogHeaderSkeleton />}>
        <BlogHeader metadata={metadata} />
      </Suspense>
      {metadata.image && (
        <AspectRatio
          ratio={16 / 9}
          className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
        >
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src={metadata.image}
              alt={metadata.title}
              className="size-full object-cover"
              fill
            />
          </Suspense>
        </AspectRatio>
      )}

      <div className="prose mt-8 max-w-none text-primary">
        <h2>Project Overview</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure illo
          dolor molestiae atque repellendus doloremque. Aspernatur facilis rem
          mollitia sunt necessitatibus perspiciatis cupiditate autem id,
          repudiandae et aut ab saepe.
        </p>

        <h2>Challenge</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ab
          natus sequi, illo iure harum reprehenderit unde, voluptatibus, quod
          iusto sed aperiam! Error soluta veritatis porro vel maiores, corrupti
          aperiam?
        </p>

        <h2>Solution</h2>
        <p>
          I implemented a complete redesign using Next.js and Tailwind CSS,
          focusing on:
        </p>
        <ul>
          <li>Simplified navigation structure</li>
          <li>Optimized product pages with clear call-to-actions</li>
          <li>Streamlined checkout process reduced to 3 steps</li>
          <li>
            Improved performance with static generation and image optimization
          </li>
          <li>Responsive design that works on all device sizes</li>
        </ul>

        <h2>Results</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aliquid
          excepturi velit placeat et quia nam modi voluptatibus, sed nobis
          beatae rem debitis ullam odio veniam adipisci iste laborum. Dicta.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">TypeScript</h2>
        <CodeBlock code={typescriptExample} language="typescript" />
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">JavaScript</h2>
        <CodeBlock code={javascriptExample} language="javascript" />
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">JSON</h2>
        <CodeBlock code={jsonExample} language="json" />
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">Bash</h2>
        <CodeBlock code={bashExample} language="bash" />
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">Dockerfile</h2>
        <CodeBlock code={dockerExample} language="docker" />
      </div>
    </Fragment>
  );
}
