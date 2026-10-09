# ─── Stage 1: Dependencies ────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

# copy import method: avoids EPERM on hosts where the Docker storage driver
# doesn't support hardlinks cleanly (e.g. vfs driver)
ENV npm_config_package_import_method=copy

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# --ignore-scripts: skip native build scripts; SWC/sharp use pre-built binaries
RUN pnpm install --frozen-lockfile --ignore-scripts

# ─── Stage 2: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (public only — baked into bundle)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_NAME=BenHub
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_CRM_API_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_CRM_API_URL=$NEXT_PUBLIC_CRM_API_URL

RUN pnpm build

# Flatten nested standalone output when Next.js picks the wrong tracing root
RUN if [ ! -f .next/standalone/server.js ]; then \
      SERVER_DIR="$(find .next/standalone -name server.js -not -path '*/node_modules/*' | head -1 | xargs dirname)"; \
      if [ -n "$SERVER_DIR" ] && [ "$SERVER_DIR" != ".next/standalone" ]; then \
        cp -a "$SERVER_DIR"/. .next/standalone/; \
      fi; \
    fi

# ─── Stage 3: Runtime ─────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
