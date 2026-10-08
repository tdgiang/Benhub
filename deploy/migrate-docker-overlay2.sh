#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# Chuyển Docker từ storage driver `vfs` sang `overlay2` trên CentOS 7
# (root XFS ftype=0) bằng một file XFS ftype=1 mount loopback vào /var/lib/docker.
#
# Cách dùng (chạy bằng root, tại thư mục gốc project):
#   bash deploy/migrate-docker-overlay2.sh              # migrate + build + up
#   bash deploy/migrate-docker-overlay2.sh --no-build   # chỉ migrate, không build
#   bash deploy/migrate-docker-overlay2.sh --cleanup    # xoá bản vfs cũ (sau khi đã ổn)
#
# Biến môi trường tuỳ chọn:
#   PROJECT_DIR   thư mục project       (mặc định: thư mục hiện tại)
#   IMG_FILE      file image XFS        (mặc định: /docker-xfs.img)
#   IMG_SIZE      dung lượng file       (mặc định: 120G)
# ──────────────────────────────────────────────────────────────────────────────
set -Eeuo pipefail

PROJECT_DIR="${PROJECT_DIR:-$(pwd)}"
COMPOSE_FILE="docker-compose.production.yml"
IMG_FILE="${IMG_FILE:-/docker-xfs.img}"
IMG_SIZE="${IMG_SIZE:-120G}"
DOCKER_DIR="/var/lib/docker"
BAK_DIR="/var/lib/docker.vfs.bak"
PG_CONTAINER="benhub_postgres"
BACKUP_DIR="/root"
DROPIN="/etc/systemd/system/docker.service.d/mount.conf"

RUN_BUILD=1
CLEANUP=0
for arg in "$@"; do
  case "$arg" in
    --no-build) RUN_BUILD=0 ;;
    --cleanup)  CLEANUP=1 ;;
    -h|--help)  sed -n '2,16p' "$0"; exit 0 ;;
    *) echo "Tham số không hợp lệ: $arg"; exit 1 ;;
  esac
done

log()  { echo -e "\033[1;34m[$(date +%T)]\033[0m $*"; }
ok()   { echo -e "\033[1;32m  ✔\033[0m $*"; }
warn() { echo -e "\033[1;33m  ⚠\033[0m $*"; }
die()  { echo -e "\033[1;31m  ✘ $*\033[0m"; exit 1; }

confirm() {
  local ans
  read -r -p "$1 Gõ 'yes' để tiếp tục: " ans
  [[ "$ans" == "yes" ]] || die "Đã huỷ."
}

STAGE="preflight"
on_error() {
  echo
  echo -e "\033[1;31m✘ Lỗi ở bước: $STAGE (dòng $1)\033[0m"
  case "$STAGE" in
    preflight|backup)
      echo "Chưa thay đổi gì trên hệ thống. Sửa lỗi rồi chạy lại." ;;
    build)
      echo "Migrate overlay2 đã xong — chỉ lỗi ở bước build/up. Sửa lỗi rồi chạy:"
      echo "  cd $PROJECT_DIR && docker compose -f $COMPOSE_FILE build backend frontend && docker compose -f $COMPOSE_FILE up -d" ;;
    *)
      cat <<EOF
Rollback thủ công (trả Docker về trạng thái cũ):
  systemctl stop docker docker.socket
  umount $DOCKER_DIR 2>/dev/null
  sed -i '\\#^$IMG_FILE #d' /etc/fstab
  rm -f $DROPIN /etc/docker/daemon.json && systemctl daemon-reload
  rmdir $DOCKER_DIR && mv $BAK_DIR $DOCKER_DIR
  systemctl start docker
  rm -f $IMG_FILE
EOF
      ;;
  esac
}
trap 'on_error $LINENO' ERR

[[ $EUID -eq 0 ]] || die "Cần chạy bằng root."

# ─── Chế độ dọn dẹp ───────────────────────────────────────────────────────────
if [[ $CLEANUP -eq 1 ]]; then
  [[ -d "$BAK_DIR" ]] || die "Không thấy $BAK_DIR — không có gì để xoá."
  [[ "$(docker info -f '{{.Driver}}')" == "overlay2" ]] || die "Docker chưa chạy overlay2, không xoá bản backup."
  du -sh "$BAK_DIR"
  warn "Lệnh này XOÁ VĨNH VIỄN $BAK_DIR, không khôi phục được."
  confirm "Xoá bản Docker vfs cũ?"
  rm -rf "$BAK_DIR"
  ok "Đã xoá $BAK_DIR"
  df -h /
  exit 0
fi

# ─── 0. Kiểm tra điều kiện ────────────────────────────────────────────────────
log "0. Kiểm tra điều kiện"
[[ -f "$PROJECT_DIR/$COMPOSE_FILE" ]] || die "Không thấy $PROJECT_DIR/$COMPOSE_FILE (đặt PROJECT_DIR hoặc cd vào project)."

CUR_DRIVER="$(docker info -f '{{.Driver}}' 2>/dev/null || echo unknown)"
[[ "$CUR_DRIVER" != "overlay2" ]] || { ok "Docker đã chạy overlay2 — không cần migrate."; exit 0; }
ok "Storage driver hiện tại: $CUR_DRIVER"

mountpoint -q "$DOCKER_DIR" && die "$DOCKER_DIR đã là mountpoint — có vẻ đã migrate trước đó."
[[ -e "$BAK_DIR" ]]  && die "$BAK_DIR đã tồn tại — kiểm tra lần chạy trước."
[[ -e "$IMG_FILE" ]] && die "$IMG_FILE đã tồn tại."
modprobe overlay || die "Không load được module overlay."
command -v mkfs.xfs >/dev/null || die "Thiếu mkfs.xfs (yum install -y xfsprogs)."

need_gb=$(( ${IMG_SIZE%G} + 10 ))
free_gb=$(df -BG --output=avail / | tail -1 | tr -dc '0-9')
(( free_gb >= need_gb )) || die "/ chỉ còn ${free_gb}G, cần ≥ ${need_gb}G."
ok "/ còn trống ${free_gb}G"

echo
echo "Container đang chạy (TẤT CẢ sẽ bị dừng):"
docker ps --format '  {{.Names}}\t{{.Image}}' || true
echo
warn "Docker sẽ bị dừng. Image cũ (vfs) sẽ không còn dùng — phải build/pull lại."
confirm "Bắt đầu migrate sang overlay2?"

# ─── 1. Backup DB ─────────────────────────────────────────────────────────────
STAGE="backup"
log "1. Backup PostgreSQL"
DUMP_FILE=""
if docker ps --format '{{.Names}}' | grep -qx "$PG_CONTAINER"; then
  PG_USER="$(docker exec "$PG_CONTAINER" printenv POSTGRES_USER 2>/dev/null || echo benhub)"
  DUMP_FILE="$BACKUP_DIR/db_backup_$(date +%F_%H%M%S).sql"
  docker exec "$PG_CONTAINER" pg_dumpall -U "$PG_USER" > "$DUMP_FILE"
  [[ -s "$DUMP_FILE" ]] || die "File dump rỗng: $DUMP_FILE"
  ok "Đã dump: $DUMP_FILE ($(du -h "$DUMP_FILE" | cut -f1))"
else
  warn "$PG_CONTAINER không chạy — bỏ qua pg_dump (volume vẫn được chép ở bước 6)."
  confirm "Tiếp tục mà không có file dump?"
fi

# ─── 2. Dừng Docker, giữ dữ liệu cũ ───────────────────────────────────────────
STAGE="stop"
log "2. Dừng stack và Docker"
(cd "$PROJECT_DIR" && docker compose -f "$COMPOSE_FILE" down) || warn "compose down lỗi — tiếp tục."
systemctl stop docker docker.socket
systemctl stop containerd 2>/dev/null || true

mv "$DOCKER_DIR" "$BAK_DIR"
mkdir "$DOCKER_DIR"
STAGE="moved"
ok "Dữ liệu cũ ở $BAK_DIR"

# ─── 3. Tạo file XFS ftype=1 và mount ─────────────────────────────────────────
log "3. Tạo $IMG_FILE ($IMG_SIZE, XFS ftype=1)"
fallocate -l "$IMG_SIZE" "$IMG_FILE"
mkfs.xfs -q -n ftype=1 "$IMG_FILE"
grep -q "^$IMG_FILE " /etc/fstab || echo "$IMG_FILE $DOCKER_DIR xfs loop,defaults 0 0" >> /etc/fstab
mount "$DOCKER_DIR"

mountpoint -q "$DOCKER_DIR" || die "Mount thất bại."
xfs_info "$DOCKER_DIR" | grep -q 'ftype=1' || die "ftype không phải 1."
ok "$(df -hT "$DOCKER_DIR" | tail -1)"

# ─── 4. Docker chờ mount xong mới khởi động ───────────────────────────────────
log "4. systemd drop-in RequiresMountsFor"
mkdir -p "$(dirname "$DROPIN")"
cat > "$DROPIN" <<EOF
[Unit]
RequiresMountsFor=$DOCKER_DIR
EOF
systemctl daemon-reload
ok "$DROPIN"

# ─── 5. overlay2 ──────────────────────────────────────────────────────────────
log "5. Cấu hình overlay2"
mkdir -p /etc/docker
if [[ -s /etc/docker/daemon.json ]]; then
  cp /etc/docker/daemon.json "/etc/docker/daemon.json.bak.$(date +%s)"
  warn "daemon.json cũ đã được backup và bị ghi đè — kiểm tra lại nếu có cấu hình khác."
fi
echo '{ "storage-driver": "overlay2" }' > /etc/docker/daemon.json
ok "/etc/docker/daemon.json"

# ─── 6. Chép volume ───────────────────────────────────────────────────────────
log "6. Chép volume cũ"
if [[ -d "$BAK_DIR/volumes" ]]; then
  mkdir -p "$DOCKER_DIR/volumes"
  cp -a "$BAK_DIR/volumes/." "$DOCKER_DIR/volumes/"
  ok "Cũ: $(du -sh "$BAK_DIR/volumes" | cut -f1)  →  Mới: $(du -sh "$DOCKER_DIR/volumes" | cut -f1)"
else
  warn "Không có $BAK_DIR/volumes."
fi

# ─── 7. Khởi động Docker ──────────────────────────────────────────────────────
log "7. Khởi động Docker"
systemctl start docker
NEW_DRIVER="$(docker info -f '{{.Driver}}')"
[[ "$NEW_DRIVER" == "overlay2" ]] || die "Driver sau khi khởi động là '$NEW_DRIVER', không phải overlay2."
ok "Storage driver: overlay2"
docker volume ls

# ─── 8. Build và chạy ─────────────────────────────────────────────────────────
STAGE="build"
if [[ $RUN_BUILD -eq 1 ]]; then
  log "8. Build và chạy stack"
  cd "$PROJECT_DIR"
  docker compose -f "$COMPOSE_FILE" build backend frontend
  docker compose -f "$COMPOSE_FILE" up -d
  docker compose -f "$COMPOSE_FILE" ps
else
  log "8. Bỏ qua build (--no-build)"
fi

trap - ERR
echo
log "Xong."
cat <<EOF
Việc tiếp theo:
  1. Kiểm tra app + dữ liệu DB.
  2. Thử reboot, sau đó kiểm tra:
       df -hT $DOCKER_DIR && docker info -f '{{.Driver}}'
  3. Nếu DB thiếu dữ liệu, khôi phục:
       docker exec -i $PG_CONTAINER psql -U <user> < ${DUMP_FILE:-<file_dump>}
  4. Sau vài ngày ổn định, dọn bản cũ:
       bash deploy/migrate-docker-overlay2.sh --cleanup
EOF
