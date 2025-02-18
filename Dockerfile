# syntax=docker.io/docker/dockerfile:1

FROM node:22.13.1-alpine AS base
WORKDIR /app

# Set common environment variables
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    # Enable PnP with optimized settings
    NODE_OPTIONS="--require ./.pnp.cjs --no-warnings"

# Install only necessary dependencies for building
RUN apk add --no-cache libc6-compat && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Install dependencies only when needed
FROM base AS deps

# Copy the basic yarn dependencies
COPY --chown=nextjs:nodejs .yarn ./.yarn
COPY --chown=nextjs:nodejs .pnp.* .yarnrc.yml package.json yarn.lock ./

# Optimize cache layers and permissions
RUN mkdir -p /app/.yarn/cache && \
    chown -R nextjs:nodejs /app

USER nextjs
# Install the required packages needed only to run
RUN yarn workspaces focus --all --production

# Builder stage
FROM base AS builder

# Copy only necessary files for building
COPY --from=deps --chown=nextjs:nodejs /app/.pnp* \
                                       /app/.yarnrc.yml \
                                       /app/package.json \
                                       /app/yarn.lock ./

# Copy source with appropriate permissions
COPY --chown=nextjs:nodejs . .

USER nextjs

# Build with full dependencies
RUN yarn install --immutable && \
    yarn build

# Production image
FROM base AS runner

# Copy PnP configuration and dependencies
COPY --from=deps --chown=nextjs:nodejs /app/.yarn ./.yarn
COPY --from=deps --chown=nextjs:nodejs /app/.pnp.* \
                                       /app/.yarnrc.yml \
                                       /app/package.json \
                                       /app/yarn.lock ./

# Copy only the necessary Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./standalone/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "standalone/server.js"]