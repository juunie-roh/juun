# syntax=docker.io/docker/dockerfile:1

FROM node:24-alpine3.21 AS base
WORKDIR /app

# Set common environment variables
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
    
# deps stage - install only
FROM base AS deps

# Update required dependencies
RUN apk update && \
    apk add --no-cache libc6-compat && \
    # Set pnpm
    corepack enable && \
    corepack prepare pnpm@latest --activate && \
    # Clean up apk cache
    rm -rf /var/cache/apk/*

# Copy dependency declarations
COPY --chown=nextjs:nodejs package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=nextjs:nodejs apps/web/package.json ./apps/web/package.json
COPY --chown=nextjs:nodejs packages/config/eslint/package.json ./packages/config/eslint/package.json
COPY --chown=nextjs:nodejs packages/config/tailwind/package.json ./packages/config/tailwind/package.json
COPY --chown=nextjs:nodejs packages/config/typescript/package.json ./packages/config/typescript/package.json
COPY --chown=nextjs:nodejs packages/api/package.json ./packages/api/package.json
COPY --chown=nextjs:nodejs packages/db/package.json ./packages/db/package.json
COPY --chown=nextjs:nodejs packages/ui/package.json ./packages/ui/package.json

# Copy Prisma schema
COPY --chown=nextjs:nodejs packages/db/prisma ./packages/db/prisma

# Copy build configuration (needed for install)
COPY turbo.json ./

# Install dependencies (cached unless package.json files change)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1001,gid=1001 \
    pnpm install -r --frozen-lockfile --prefer-offline

# Builder stage - build only
FROM deps AS builder

# Copy workspace source files (only what's needed for build)
COPY --chown=nextjs:nodejs packages/ ./packages/
COPY --chown=nextjs:nodejs apps/web/ ./apps/web/

USER nextjs

# Build with secrets and remove .env from standalone output
RUN --mount=type=cache,id=turbo,target=/app/.turbo,uid=1001,gid=1001 \
    # --mount=type=secret,id=env,target=/app/apps/web/.env,uid=1001,gid=1001 \
    # --mount=type=secret,id=env,target=/app/packages/db/.env,uid=1001,gid=1001 \
    pnpm build --filter=@juun/web && \
    find /app/apps/web/.next/standalone -name ".env*" -type f -delete

# Production image
FROM node:24-alpine3.21 AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only the necessary Next.js output (standalone already includes dependencies)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

# Health check for better container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

CMD ["node", "apps/web/server.js"]