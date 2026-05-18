# ─── Stage 1: Build (includes devDeps for nest CLI + Prisma generate) ─────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json .npmrc* ./
RUN npm ci --ignore-scripts

COPY . .
# Generate Prisma client then compile TypeScript
RUN npx prisma generate && npm run build

# ─── Stage 2: Production-only dependencies ────────────────────────────────────
FROM node:22-alpine AS prod-deps
WORKDIR /app

COPY package*.json .npmrc* ./
RUN npm ci --omit=dev --ignore-scripts

# ─── Stage 3: Runtime ─────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=prod-deps /app/node_modules ./node_modules
# Overlay Prisma generated client from builder (has .prisma & @prisma)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000

CMD ["node", "dist/main"]
