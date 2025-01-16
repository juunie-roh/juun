# syntax=docker.io/docker/dockerfile:1

FROM node:23-alpine AS base
WORKDIR /app

# Set common environment variables
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Install dependencies only when needed
FROM base AS deps

# Install only necessary dependencies for building
RUN apk add --no-cache libc6-compat && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Cache yarn berry dependencies
COPY --chown=nextjs:nodejs .yarn ./.yarn
COPY --chown=nextjs:nodejs .pnp.cjs .pnp.loader.mjs .yarnrc.yml package.json yarn.lock ./

# Optimize cache layers and permissions
RUN mkdir -p /app/.yarn/cache && \
    chown -R nextjs:nodejs /app

USER nextjs
RUN yarn install --immutable --inline-builds

# Builder stage
FROM base AS builder

# Copy only necessary files for building
COPY --from=deps --chown=nextjs:nodejs /app/.yarn ./.yarn
COPY --from=deps --chown=nextjs:nodejs /app/.pnp* ./
COPY --from=deps --chown=nextjs:nodejs /app/.yarnrc.yml ./
COPY --from=deps --chown=nextjs:nodejs /app/package.json /app/yarn.lock ./

# Create user early
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy source with appropriate permissions
COPY --chown=nextjs:nodejs . .

USER nextjs

# Build application with optimizations
RUN yarn install --immutable && \
    yarn build && \
    find . -name "*.map" -delete

# Production image
FROM base AS runner

# Install only production dependencies and create user
RUN apk add --no-cache libc6-compat && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

# Copy PnP configuration and dependencies
COPY --from=builder --chown=nextjs:nodejs /app/.yarn ./.yarn
COPY --from=builder --chown=nextjs:nodejs /app/.pnp.cjs \
                                        /app/.pnp.loader.mjs \
                                        /app/.yarnrc.yml \
                                        /app/package.json \
                                        /app/yarn.lock ./

# Copy only the necessary Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./standalone/.next/static

USER nextjs

# Enable PnP with optimized settings
ENV NODE_OPTIONS="--require ./.pnp.cjs --no-warnings"

EXPOSE 3000

CMD ["node", "standalone/server.js"]