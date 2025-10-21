# @juun/db

Database package for the Juun monorepo. This package contains the Prisma client and database utilities.

## Installation

This package is already installed as a workspace dependency. To use it in any app or package:

```json
{
  "dependencies": {
    "@juun/db": "workspace:^"
  }
}
```

## Usage

### Import the Prisma client

```typescript
import { prisma } from "@juun/db";

// Query examples
const posts = await prisma.blog_post.findMany();
const post = await prisma.blog_post.findUnique({ where: { slug: "my-post" } });
```

### Import Prisma types

```typescript
import { Prisma, BlogPost } from "@juun/db";
```

## Available Scripts

Run these commands from the root or using `pnpm db <script>`:

```bash
# Generate Prisma Client
pnpm db generate

# Push schema changes to database (without migrations)
pnpm db push

# Pull schema from database
pnpm db pull

# Open Prisma Studio (database GUI)
pnpm db studio

# Create and apply migrations
pnpm db migrate
```

## Schema Location

The Prisma schema is located at `packages/db/prisma/schema.prisma`.

## Environment Variables

The database package uses the `DATABASE_URL` environment variable. Make sure it's set in your app's `.env`:

```text
DATABASE_URL=postgres://user:password@host:port/database?sslmode=require
```

## Singleton Pattern

The Prisma client uses a singleton pattern to prevent multiple instances in development (HMR). The client is automatically instantiated when you import it:

```typescript
import { prisma } from "@juun/db";
// prisma is ready to use
```
