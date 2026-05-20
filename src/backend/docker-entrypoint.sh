#!/bin/sh
set -e

PRISMA="./node_modules/.bin/prisma"

echo "[entrypoint] Running database migrations..."
$PRISMA migrate deploy --config prisma.config.mjs

echo "[entrypoint] Applying supplemental SQL..."
$PRISMA db execute --file prisma/add-cover-image.sql --config prisma.config.mjs || true

echo "[entrypoint] Seeding database..."
node prisma/seed.mjs || true

echo "[entrypoint] Starting application..."
exec node dist/src/main
