# syntax=docker.io/docker/dockerfile:1

FROM node:alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Create system user early to ensure correct permissions
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy yarn berry settings
COPY .yarn ./.yarn
COPY .pnp.cjs .pnp.loader.mjs .yarnrc.yml package.json yarn.lock ./

# Set ownership for Yarn Berry cache directory
RUN mkdir -p /app/.yarn/cache && chown -R nextjs:nodejs /app/.yarn
RUN chown -R nextjs:nodejs /app

# Run yarn berry as nextjs user
USER nextjs
RUN yarn install --immutable

### Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Create system user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy dependencies and configuration
COPY --from=deps --chown=nextjs:nodejs /app/.yarn ./.yarn
COPY --from=deps --chown=nextjs:nodejs /app/.pnp.cjs ./.pnp.cjs
COPY --from=deps --chown=nextjs:nodejs /app/.pnp.loader.mjs ./.pnp.loader.mjs
COPY --from=deps --chown=nextjs:nodejs /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=deps --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=deps --chown=nextjs:nodejs /app/yarn.lock ./yarn.lock

# Copy source code
COPY --chown=nextjs:nodejs . .

# Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build as nextjs user
USER nextjs
RUN yarn install --immutable
RUN yarn build

### Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create system user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the entire app directory structure
COPY --from=builder --chown=nextjs:nodejs /app .

# Remove development dependencies and cache
RUN rm -rf .next/cache

# Ensure proper permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["yarn", "start"]