# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json .npmrc* ./
# Install all deps (including devDeps needed for nest CLI + prisma generate)
RUN npm ci --ignore-scripts

COPY . .
# Generate Prisma client, compile TypeScript, then strip dev deps
RUN npx prisma generate \
 && npm run build \
 && npm prune --omit=dev \
 && npx prisma generate

# ─── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy pruned node_modules (all transitive prod deps intact) + built output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.mjs ./prisma.config.mjs
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

EXPOSE 4000

# dist/src/main because prisma.config.ts at root shifts TypeScript rootDir to "."
ENTRYPOINT ["./docker-entrypoint.sh"]
