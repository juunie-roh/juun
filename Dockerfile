# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app

# Set common environment variables
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Install only necessary dependencies for building
RUN apk add --no-cache libc6-compat && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Install dependencies only when needed
FROM base AS deps

# Optimize cache layers and permissions
RUN mkdir -p /app/.yarn/cache && \
    mkdir -p /app/node_modules && \
    chown -R nextjs:nodejs /app

USER nextjs

# Builder stage
FROM base AS builder

# Copy source with appropriate permissions
COPY --chown=nextjs:nodejs . .

USER root

# Build with full dependencies
RUN yarn install --immutable && \
    yarn build

# Production image
FROM base AS runner

# Copy only the necessary Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]