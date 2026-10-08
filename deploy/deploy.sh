#!/bin/bash
# ═══════════════════════════════════════════════════════
#  BenHub — VPS Deploy Script
#  Usage: bash deploy/deploy.sh
# ═══════════════════════════════════════════════════════
set -euo pipefail

BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[deploy]${NC} $*"; }
warn() { echo -e "${YELLOW}[warn]${NC}   $*"; }
die()  { echo -e "${RED}[error]${NC}  $*" >&2; exit 1; }

# ── Preflight checks ─────────────────────────────────────────────
log "Preflight checks..."

[ -f deploy/.env.production.example ] || die ".env not found. Copy deploy/.env.production.example → .env"
[ -f .env ] || die "Missing .env file in project root. See deploy/.env.production.example"

command -v docker   &>/dev/null || die "Docker not installed"
command -v docker compose &>/dev/null || \
  command -v docker-compose &>/dev/null || die "docker compose not found"

COMPOSE="docker compose"
command -v docker compose &>/dev/null || COMPOSE="docker-compose"

# ── Load env ────────────────────────────────────────────────────
set -a; source .env; set +a
[ -n "${APP_URL:-}" ]          || die "APP_URL not set in .env"
[ -n "${JWT_SECRET:-}" ]       || die "JWT_SECRET not set in .env"
[ -n "${AUTH_SECRET:-}" ]      || die "AUTH_SECRET not set in .env"
[ -n "${POSTGRES_PASSWORD:-}" ] || die "POSTGRES_PASSWORD not set in .env"
[ -n "${REDIS_PASSWORD:-}" ]   || die "REDIS_PASSWORD not set in .env"

# Warn about default/weak secrets
echo "$JWT_SECRET" | grep -qi "CHANGE_ME" && warn "JWT_SECRET still has placeholder value!"
echo "$AUTH_SECRET" | grep -qi "CHANGE_ME" && warn "AUTH_SECRET still has placeholder value!"

# ── SSL certs check ─────────────────────────────────────────────
if [ ! -f deploy/certs/fullchain.pem ]; then
  warn "SSL certs not found at deploy/certs/. Nginx will fail."
  warn "Run: certbot certonly --standalone -d benhub.vn"
  warn "Then copy: cp /etc/letsencrypt/live/benhub.vn/fullchain.pem deploy/certs/"
  warn "          cp /etc/letsencrypt/live/benhub.vn/privkey.pem   deploy/certs/"
fi

# ── Build & deploy ──────────────────────────────────────────────
log "Pulling latest code..."
git pull origin master 2>/dev/null || warn "Not a git repo or no remote"

# Images are built by GitHub Actions (.github/workflows/docker-publish.yml) and
# pushed to GHCR — building on CentOS 7 (kernel 3.10) fails with EPERM.
# Set BUILD_LOCAL=1 to build on this host instead.
if [ "${BUILD_LOCAL:-0}" = "1" ]; then
  log "Building Docker images locally..."
  $COMPOSE -f docker-compose.production.yml build --no-cache backend migrate frontend
else
  log "Pulling Docker images (tag: ${IMAGE_TAG:-latest})..."
  $COMPOSE -f docker-compose.production.yml pull backend migrate frontend
fi

log "Starting infrastructure (postgres + redis)..."
$COMPOSE -f docker-compose.production.yml up -d postgres redis

log "Waiting for postgres to be healthy..."
for i in $(seq 1 30); do
  $COMPOSE -f docker-compose.production.yml exec -T postgres \
    pg_isready -U "${POSTGRES_USER:-benhub}" &>/dev/null && break
  sleep 2
done

log "Running DB migrations..."
$COMPOSE -f docker-compose.production.yml run --rm migrate

log "Starting all services..."
$COMPOSE -f docker-compose.production.yml up -d

log "Waiting for services to stabilize (20s)..."
sleep 20

# ── Health check ─────────────────────────────────────────────────
log "Health check..."
BACKEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/api/v1/health 2>/dev/null || echo "000")
FRONTEND_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")

echo -e "  Backend  (4000): HTTP $BACKEND_HEALTH"
echo -e "  Frontend (3000): HTTP $FRONTEND_HEALTH"

log ""
echo -e "${BOLD}${GREEN}═══════════════════════════════════════${NC}"
echo -e "${BOLD}  Deploy hoàn tất! 🚀${NC}"
echo -e "  URL: ${APP_URL}"
echo -e "${BOLD}${GREEN}═══════════════════════════════════════${NC}"

$COMPOSE -f docker-compose.production.yml ps
