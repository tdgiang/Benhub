# Hướng dẫn Deploy BenHub lên VPS — CentOS

> Tài liệu này dành cho người **chưa từng deploy** dự án lên VPS.  
> Đọc hết một lượt trước khi bắt tay thực hiện.

> **Đang deploy lên VPS Windows Server?** Toàn bộ tài liệu này là cho VPS CentOS/Linux.  
> Hướng dẫn build Docker trên **Windows Server 2019/2022** (qua WSL2) nằm ở file riêng: **[`docs/deploy_windown.md`](./deploy_windown.md)**.

---

# Phần I — Deploy trên VPS CentOS

## Mục lục

1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Chuẩn bị trên máy tính cá nhân](#2-chuẩn-bị-trên-máy-tính-cá-nhân)
3. [Cập nhật hệ thống & cài công cụ cơ bản](#3-cập-nhật-hệ-thống--cài-công-cụ-cơ-bản)
4. [Tắt hoặc cấu hình SELinux](#4-tắt-hoặc-cấu-hình-selinux)
5. [Cài đặt Docker](#5-cài-đặt-docker)
6. [Clone dự án lên VPS](#6-clone-dự-án-lên-vps)
7. [Tạo file cấu hình `.env`](#7-tạo-file-cấu-hình-env)
8. [Cấu hình SSL (HTTPS)](#8-cấu-hình-ssl-https)
9. [Chạy deploy](#9-chạy-deploy)
10. [Kiểm tra sau deploy](#10-kiểm-tra-sau-deploy)
11. [Cấu hình tường lửa (firewalld)](#11-cấu-hình-tường-lửa-firewalld)
12. [Thiết lập tự động gia hạn SSL](#12-thiết-lập-tự-động-gia-hạn-ssl)
13. [Backup định kỳ](#13-backup-định-kỳ)
14. [Quy trình cập nhật code sau này](#14-quy-trình-cập-nhật-code-sau-này)
15. [Xử lý sự cố thường gặp](#15-xử-lý-sự-cố-thường-gặp)

---

## 1. Yêu cầu hệ thống

### VPS tối thiểu

| Thành phần | Tối thiểu | Khuyến nghị |
|------------|-----------|-------------|
| RAM | 2 GB | 4 GB |
| CPU | 2 vCPU | 2–4 vCPU |
| Disk | 20 GB SSD | 40 GB SSD |
| OS | CentOS 7 / CentOS 8 / CentOS Stream 8/9 | CentOS Stream 9 |
| Port | 22, 80, 443 mở | — |

> **Lưu ý phiên bản:**
> - **CentOS 7**: dùng lệnh `yum`, hỗ trợ đến tháng 6/2024 (đã EOL — nên nâng cấp)
> - **CentOS 8 / Stream 8/9**: dùng lệnh `dnf`
> - Tài liệu này dùng `dnf` làm mặc định. Nếu đang dùng CentOS 7, thay `dnf` bằng `yum` ở mọi lệnh cài đặt.

### Tên miền

- Domain `benhub.vn` đã có DNS **A record** trỏ về IP của VPS
- Kiểm tra: `nslookup benhub.vn` → phải trả về đúng IP VPS

> DNS cần 5–30 phút để propagate sau khi cấu hình. Đợi DNS hoạt động trước khi cài SSL.

---

## 2. Chuẩn bị trên máy tính cá nhân

### 2.1 Checklist trước khi bắt đầu

- [ ] Có địa chỉ IP của VPS
- [ ] Có user `root` và password (hoặc SSH key) để vào VPS
- [ ] Domain `benhub.vn` đã trỏ về IP VPS
- [ ] Code đã được push lên GitHub

### 2.2 Kết nối SSH lần đầu

```bash
# Thay <IP_VPS> bằng địa chỉ IP thật của VPS
ssh root@<IP_VPS>

# Ví dụ:
ssh root@103.97.125.10
```

Nếu dùng SSH key:

```bash
ssh -i ~/.ssh/id_rsa root@<IP_VPS>
```

---

## 3. Cập nhật hệ thống & cài công cụ cơ bản

> Chạy các lệnh này **trên VPS** sau khi SSH vào.

### 3.1 Cập nhật toàn bộ gói hệ thống

```bash
# CentOS 8 / Stream
dnf update -y

# CentOS 7
# yum update -y
```

### 3.2 Cài các công cụ cần thiết

```bash
# CentOS 8 / Stream
dnf install -y git curl wget nano tar openssl

# CentOS 7
# yum install -y git curl wget nano tar openssl
```

### 3.3 Tạo user không phải root (tuỳ chọn nhưng khuyến nghị)

> Trên CentOS, nhóm admin là `wheel` (không phải `sudo` như Ubuntu).

```bash
# Tạo user mới
useradd -m -s /bin/bash benhub

# Đặt mật khẩu cho user
passwd benhub

# Thêm vào nhóm wheel (có quyền sudo)
usermod -aG wheel benhub

# Cấp quyền SSH cho user mới (copy SSH key từ root)
mkdir -p /home/benhub/.ssh
cp ~/.ssh/authorized_keys /home/benhub/.ssh/
chown -R benhub:benhub /home/benhub/.ssh
chmod 700 /home/benhub/.ssh
chmod 600 /home/benhub/.ssh/authorized_keys
```

Từ bước này có thể dùng user `benhub` thay vì `root`.

---

## 4. Tắt hoặc cấu hình SELinux

> SELinux là tính năng bảo mật đặc trưng của CentOS. Nó có thể chặn Docker hoạt động đúng nếu không được cấu hình.

### Kiểm tra trạng thái SELinux hiện tại

```bash
getenforce
# Kết quả: Enforcing | Permissive | Disabled
```

### Lựa chọn A — Chuyển sang Permissive (khuyến nghị, an toàn hơn)

```bash
# Tắt tạm thời (ngay lập tức, không cần reboot)
setenforce 0

# Tắt vĩnh viễn sau khi reboot
sed -i 's/^SELINUX=enforcing/SELINUX=permissive/' /etc/selinux/config

# Kiểm tra lại
getenforce
# Kết quả mong đợi: Permissive
```

### Lựa chọn B — Tắt hoàn toàn SELinux (đơn giản nhất)

```bash
sed -i 's/^SELINUX=.*/SELINUX=disabled/' /etc/selinux/config
reboot
# Sau khi reboot, SSH lại và tiếp tục
```

> **Tại sao cần làm bước này?**  
> SELinux ở chế độ `Enforcing` thường chặn Docker bind-mount volumes và kết nối mạng nội bộ giữa các container, gây lỗi khó debug khi mới bắt đầu.

---

## 5. Cài đặt Docker

Trên CentOS, Docker **không có trong repo mặc định** — phải thêm repo chính thức của Docker trước.

### 5.1 Gỡ phiên bản Docker cũ (nếu có)

```bash
dnf remove -y docker docker-client docker-client-latest docker-common \
  docker-latest docker-latest-logrotate docker-logrotate docker-engine \
  podman runc 2>/dev/null || true
```

### 5.2 Thêm repo Docker chính thức

```bash
# Cài dnf-plugins-core để dùng dnf config-manager
dnf install -y dnf-plugins-core

# Thêm repo Docker CE cho CentOS
dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```

> **CentOS 7:** thay `dnf` bằng `yum` và dùng `yum-config-manager`:
> ```bash
> yum install -y yum-utils
> yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
> ```

### 5.3 Cài Docker Engine

```bash
dnf install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin

# CentOS 7:
# yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### 5.4 Khởi động Docker và bật tự khởi động

```bash
# Khởi động Docker
systemctl start docker

# Bật tự khởi động khi VPS reboot
systemctl enable docker

# Kiểm tra Docker đang chạy
systemctl status docker
```

Kết quả mong đợi: `Active: active (running)`

### 5.5 Thêm user vào nhóm docker

```bash
# Cho phép dùng Docker không cần sudo
usermod -aG docker $USER

# Áp dụng ngay (hoặc logout rồi login lại)
newgrp docker

# Kiểm tra phiên bản
docker --version
docker compose version
```

Kết quả mong đợi:
```
Docker version 26.x.x, build ...
Docker Compose version v2.x.x
```

---

## 6. Clone dự án lên VPS

```bash
# Tạo thư mục chứa dự án
mkdir -p /opt/benhub
cd /opt/benhub

# Clone từ GitHub
git clone https://github.com/tdgiang/Benhub.git .

# Kiểm tra file đã có
ls
```

Kết quả mong đợi: thấy `docker-compose.production.yml`, `src/`, `deploy/`, v.v.

---

## 7. Tạo file cấu hình `.env`

File `.env` chứa **tất cả mật khẩu và secret** — không bao giờ commit file này lên Git.

### 7.1 Tạo file `.env`

```bash
cd /opt/benhub
nano .env
```

> Nếu không có `nano`: dùng `vi .env` hoặc cài trước với `dnf install -y nano`

### 7.2 Nội dung file `.env`

Dán nội dung sau vào, **thay tất cả giá trị `<...>`**:

```env
# ── App ──────────────────────────────────────────────
APP_URL=https://benhub.vn

# ── PostgreSQL ───────────────────────────────────────
POSTGRES_DB=benhub
POSTGRES_USER=benhub
POSTGRES_PASSWORD=<mật_khẩu_ngẫu_nhiên_mạnh>

# ── Redis ────────────────────────────────────────────
REDIS_PASSWORD=<mật_khẩu_ngẫu_nhiên_mạnh>

# ── JWT (Backend) ────────────────────────────────────
JWT_SECRET=<chuỗi_64_ký_tự_ngẫu_nhiên>
JWT_REFRESH_SECRET=<chuỗi_64_ký_tự_ngẫu_nhiên_khác>

# ── NextAuth (Frontend) ──────────────────────────────
AUTH_SECRET=<chuỗi_32_ký_tự_ngẫu_nhiên>
```

### 7.3 Tạo các secret ngẫu nhiên

Chạy từng lệnh dưới đây, sao chép kết quả vào file `.env`:

```bash
echo "POSTGRES_PASSWORD:" && openssl rand -hex 16
echo "REDIS_PASSWORD:"    && openssl rand -hex 16
echo "JWT_SECRET:"        && openssl rand -hex 64
echo "JWT_REFRESH_SECRET:"&& openssl rand -hex 64
echo "AUTH_SECRET:"       && openssl rand -base64 32
```

### 7.4 Ví dụ file `.env` đã điền

```env
APP_URL=https://benhub.vn
POSTGRES_DB=benhub
POSTGRES_USER=benhub
POSTGRES_PASSWORD=a3f8c2d1e9b04f7a
REDIS_PASSWORD=7b2e5d9c1f3a8e4b
JWT_SECRET=9c3e1a7f2b5d8e4c6f0a3b9d2e7c5f1a4b8d3e6f9c2a5b8e1d4f7c0a3b6e9d2f
JWT_REFRESH_SECRET=1f4b7e0c3d6a9f2b5e8c1d4a7f0b3e6c9d2a5f8b1e4c7a0d3f6b9e2c5a8f1d4b7
AUTH_SECRET=Xk7vP2mNqR9jL4wY8hB3dF6tA1eZ5uI=
```

### 7.5 Phân quyền file `.env`

```bash
chmod 600 /opt/benhub/.env
```

---

## 8. Cấu hình SSL (HTTPS)

> Yêu cầu: domain đã trỏ đúng về IP VPS và **port 80 đang mở** trên firewall.

### 8.1 Mở port 80 tạm thời để lấy chứng chỉ

```bash
firewall-cmd --temporary --add-service=http
```

### 8.2 Cài certbot

**CentOS 8 / Stream — Cài qua EPEL:**

```bash
dnf install -y epel-release
dnf install -y certbot
```

**CentOS 7 — Cài qua EPEL:**

```bash
yum install -y epel-release
yum install -y certbot
```

**Nếu cài EPEL không được — Cài qua Snap (mọi phiên bản CentOS):**

```bash
# Cài snapd
dnf install -y epel-release
dnf install -y snapd
systemctl enable --now snapd.socket

# Tạo symlink để lệnh snap hoạt động
ln -sf /var/lib/snapd/snap /snap

# Đợi 30 giây để snap khởi động
sleep 30

# Cài certbot qua snap
snap install core && snap refresh core
snap install --classic certbot
ln -sf /snap/bin/certbot /usr/bin/certbot
```

### 8.3 Cấp chứng chỉ SSL từ Let's Encrypt

```bash
certbot certonly --standalone \
  -d benhub.vn \
  -d www.benhub.vn \
  --email admin@benhub.vn \
  --agree-tos \
  --non-interactive
```

Nếu thành công sẽ thấy:
```
Congratulations! Your certificate and chain have been saved at:
/etc/letsencrypt/live/benhub.vn/fullchain.pem
```

### 8.4 Copy chứng chỉ vào thư mục dự án

```bash
mkdir -p /opt/benhub/deploy/certs

cp /etc/letsencrypt/live/benhub.vn/fullchain.pem /opt/benhub/deploy/certs/
cp /etc/letsencrypt/live/benhub.vn/privkey.pem   /opt/benhub/deploy/certs/

chmod 600 /opt/benhub/deploy/certs/*.pem

# Kiểm tra
ls -la /opt/benhub/deploy/certs/
```

---

## 9. Chạy deploy

```bash
cd /opt/benhub
bash deploy/deploy.sh
```

Script tự động thực hiện:
1. Kiểm tra các biến môi trường bắt buộc
2. Build Docker images (backend + frontend)
3. Khởi động PostgreSQL và Redis
4. Chạy database migration (Prisma)
5. Khởi động tất cả services
6. Health check cơ bản

Quá trình build lần đầu mất **5–15 phút** tuỳ tốc độ VPS và mạng.

### Theo dõi tiến trình real-time

Mở thêm một terminal khác và SSH vào VPS:

```bash
docker compose -f docker-compose.production.yml logs -f
```

### Kết quả thành công

```
[deploy] Health check...
  Backend  (4000): HTTP 200
  Frontend (3000): HTTP 200
═══════════════════════════════════════
  Deploy hoàn tất! 🚀
  URL: https://benhub.vn
═══════════════════════════════════════
```

---

## 10. Kiểm tra sau deploy

### 10.1 Kiểm tra containers đang chạy

```bash
docker compose -f docker-compose.production.yml ps
```

Tất cả status phải là `running`:

```
NAME               STATUS          PORTS
benhub_postgres    Up (healthy)    5432/tcp
benhub_redis       Up (healthy)    6379/tcp
benhub_backend     Up              4000/tcp
benhub_frontend    Up              3000/tcp
benhub_nginx       Up              0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
```

### 10.2 Kiểm tra website bằng curl

```bash
# Frontend — phải trả về 200 OK
curl -I https://benhub.vn

# Backend API — phải trả về JSON
curl https://benhub.vn/api-backend/api/v1/posts

# Redirect HTTP → HTTPS — phải thấy 301
curl -I http://benhub.vn
```

### 10.3 Kiểm tra trên trình duyệt

- [ ] `https://benhub.vn` — trang chủ hiển thị bình thường
- [ ] Biểu tượng khoá HTTPS trên thanh địa chỉ
- [ ] `https://benhub.vn/login` — trang đăng nhập hoạt động
- [ ] `https://benhub.vn/cms/dashboard` — redirect về `/login` nếu chưa đăng nhập

### 10.4 Kiểm tra log không có lỗi

```bash
docker compose -f docker-compose.production.yml logs backend  --tail=50
docker compose -f docker-compose.production.yml logs frontend --tail=50
docker compose -f docker-compose.production.yml logs nginx    --tail=20
```

---

## 11. Cấu hình tường lửa (firewalld)

> CentOS dùng **firewalld** thay vì UFW của Ubuntu.

### 11.1 Kiểm tra firewalld đang chạy chưa

```bash
systemctl status firewalld
```

Nếu chưa chạy:

```bash
systemctl start firewalld
systemctl enable firewalld
```

### 11.2 Mở đúng các port cần thiết

```bash
# SSH — bắt buộc, không được bỏ
firewall-cmd --permanent --add-service=ssh

# HTTP (port 80)
firewall-cmd --permanent --add-service=http

# HTTPS (port 443)
firewall-cmd --permanent --add-service=https

# Áp dụng tất cả thay đổi
firewall-cmd --reload
```

### 11.3 Kiểm tra cấu hình

```bash
firewall-cmd --list-all
```

Kết quả mong đợi:

```
public (active)
  services: cockpit dhcpv6-client http https ssh
  ports:
```

> **Cảnh báo:** Không bao giờ block service `ssh` — sẽ mất quyền SSH vào VPS và không thể khôi phục nếu không có console VPS.

### 11.4 Đóng port 80 tạm thời đã mở ở bước 8 (nếu cần)

```bash
# Lệnh tạm thời (--temporary) sẽ tự mất sau khi reload
# firewalld đã reload ở bước 11.2 nên không cần làm gì thêm
```

---

## 12. Thiết lập tự động gia hạn SSL

Chứng chỉ Let's Encrypt hết hạn sau **90 ngày**. Cần cài cron để tự động gia hạn.

### 12.1 Thêm cron job gia hạn SSL

```bash
crontab -e
```

Thêm vào cuối file (nhấn `i` nếu dùng vi, `:wq` để lưu):

```cron
# Gia hạn SSL mỗi Chủ nhật lúc 3:00 sáng
0 3 * * 0 certbot renew --quiet \
  && cp /etc/letsencrypt/live/benhub.vn/fullchain.pem /opt/benhub/deploy/certs/ \
  && cp /etc/letsencrypt/live/benhub.vn/privkey.pem   /opt/benhub/deploy/certs/ \
  && docker restart benhub_nginx \
  >> /var/log/certbot-renew.log 2>&1
```

### 12.2 Kiểm tra certbot gia hạn hoạt động

```bash
# Thử gia hạn (dry-run — không thực sự gia hạn)
certbot renew --dry-run
```

Kết quả mong đợi: `Congratulations, all simulated renewals succeeded`

### 12.3 Kiểm tra ngày hết hạn cert hiện tại

```bash
openssl x509 -enddate -noout -in /opt/benhub/deploy/certs/fullchain.pem
```

---

## 13. Backup định kỳ

### 13.1 Tạo thư mục backup

```bash
mkdir -p /opt/benhub/backups
```

### 13.2 Backup database thủ công

```bash
cd /opt/benhub

docker compose -f docker-compose.production.yml exec -T postgres \
  pg_dump -U benhub benhub \
  > backups/db-$(date +%Y%m%d-%H%M%S).sql

echo "Backup xong: backups/db-$(date +%Y%m%d).sql"
```

### 13.3 Backup ảnh upload thủ công

```bash
docker run --rm \
  -v benhub_uploads_data:/data \
  -v /opt/benhub/backups:/backup \
  alpine \
  tar czf /backup/uploads-$(date +%Y%m%d).tar.gz -C /data .

echo "Backup uploads xong"
```

### 13.4 Tự động backup hàng ngày (cron)

```bash
crontab -e
```

Thêm vào:

```cron
# Backup DB lúc 2:00 sáng, giữ 7 ngày gần nhất
0 2 * * * cd /opt/benhub && docker compose -f docker-compose.production.yml exec -T postgres pg_dump -U benhub benhub > /opt/benhub/backups/db-$(date +\%Y\%m\%d).sql 2>/dev/null && find /opt/benhub/backups -name "db-*.sql" -mtime +7 -delete
```

---

## 14. Quy trình cập nhật code sau này

Sau khi deploy lần đầu thành công, mỗi khi có code mới:

```bash
cd /opt/benhub

# 1. Pull code mới (compose file, nginx config...)
git pull origin master

# 2. Pull images do GitHub Actions build sẵn (xem ghi chú bên dưới)
docker compose -f docker-compose.production.yml pull backend migrate frontend

# 3. Restart không downtime
docker compose -f docker-compose.production.yml up -d --no-deps backend frontend

# 4. Xem log xác nhận không có lỗi
docker compose -f docker-compose.production.yml logs -f backend frontend
```

> **Vì sao không build trên VPS:** CentOS 7 dùng kernel 3.10. Seccomp mặc định của Docker trên kernel này chặn một syscall mà Node 22/pnpm cần, nên `pnpm install` báo `EPERM: operation not permitted, write`. Images được build bởi `.github/workflows/docker-publish.yml` mỗi khi push lên `master` và đẩy lên `ghcr.io/tdgiang/benhub-{backend,frontend}`.
>
> - Đợi workflow chạy xong (tab **Actions** trên GitHub) rồi mới `pull`.
> - Repo variable `APP_URL` (Settings → Secrets and variables → Actions → Variables) phải được đặt, vì `NEXT_PUBLIC_*` được nhúng vào bundle lúc build.
> - Nếu package GHCR là private: `docker login ghcr.io -u <github_user>` với Personal Access Token có quyền `read:packages`.
> - Rollback về bản cũ: `IMAGE_TAG=<commit_sha> docker compose -f docker-compose.production.yml up -d --no-deps backend frontend`.

**Nếu có migration database mới:**

```bash
docker compose -f docker-compose.production.yml run --rm migrate
docker compose -f docker-compose.production.yml up -d --no-deps backend
```

---

## 15. Xử lý sự cố thường gặp

### Website không truy cập được

```bash
# Kiểm tra containers
docker compose -f docker-compose.production.yml ps

# Kiểm tra firewall có mở port 80/443 chưa
firewall-cmd --list-services

# Xem log nginx
docker compose -f docker-compose.production.yml logs nginx --tail=30

# Kiểm tra cert còn hạn không
openssl x509 -enddate -noout -in /opt/benhub/deploy/certs/fullchain.pem
```

### Docker lỗi permission / không chạy được container

Nguyên nhân thường gặp nhất trên CentOS: **SELinux đang Enforcing**.

```bash
# Kiểm tra SELinux
getenforce

# Chuyển sang Permissive nếu đang Enforcing
setenforce 0
sed -i 's/^SELINUX=enforcing/SELINUX=permissive/' /etc/selinux/config

# Thử lại
docker compose -f docker-compose.production.yml up -d
```

### Backend lỗi 500 / không kết nối được DB

```bash
# Xem log backend
docker compose -f docker-compose.production.yml logs backend --tail=100

# Kiểm tra PostgreSQL healthy
docker compose -f docker-compose.production.yml exec postgres pg_isready -U benhub

# Kiểm tra biến DATABASE_URL trong .env
grep DATABASE_URL /opt/benhub/.env
```

### Frontend không hiển thị đúng

```bash
docker compose -f docker-compose.production.yml logs frontend --tail=100
```

### Upload ảnh thành công nhưng URL `/uploads/...` báo 404 (aaPanel)

**Triệu chứng:** CMS upload OK (`POST /api/v1/uploads` → 201), file có trong container:

```bash
docker exec benhub_backend ls /app/uploads/
```

nhưng `https://benhub.vn/uploads/xxx.png` trả 404 (thường là trang 404 của Next.js).

**Nguyên nhân:** VPS dùng **aaPanel nginx** (không có container `benhub_nginx`). Request `/uploads/` đang vào frontend `:3000` thay vì backend `:4000`.

**Cách sửa:**

1. Chạy stack với override aaPanel (expose backend ra host):

```bash
cd /opt/benhub   # hoặc thư mục dự án trên VPS
docker compose -f docker-compose.production.yml -f docker-compose.aapanel.yml up -d
```

2. Kiểm tra backend serve ảnh trực tiếp trên VPS:

```bash
curl -I http://127.0.0.1:4000/uploads/bbf1d174-dfb1-4628-a067-a8b648e1fe6a.png
# Kỳ vọng: HTTP/1.1 200 OK
```

3. Thêm block nginx vào site `benhub.vn` (aaPanel → Websites → Config), copy từ `deploy/nginx-aapanel.conf`:

```nginx
location /uploads/ {
    proxy_pass         http://127.0.0.1:4000/uploads/;
    proxy_http_version 1.1;
    proxy_set_header   Host              $host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    access_log off;
    expires 7d;
    add_header         Cache-Control "public, max-age=604800, immutable";
}
```

> Block này phải nằm **trước** `location / { proxy_pass http://127.0.0.1:3000; ... }`.

4. Reload nginx:

```bash
nginx -t && nginx -s reload
# hoặc trên aaPanel: Save → Reload
```

5. Kiểm tra lại:

```bash
curl -I https://benhub.vn/uploads/bbf1d174-dfb1-4628-a067-a8b648e1fe6a.png
```

**Lưu ý:** Lệnh `http://backend:4000/...` chỉ chạy được **bên trong Docker network**, không chạy từ shell VPS.

### Docker daemon không khởi động sau khi reboot VPS

```bash
# Kiểm tra trạng thái
systemctl status docker

# Khởi động lại
systemctl start docker

# Đảm bảo bật tự khởi động
systemctl enable docker

# Khởi động lại toàn bộ stack
cd /opt/benhub
docker compose -f docker-compose.production.yml up -d
```

### Hết dung lượng disk

```bash
# Kiểm tra dung lượng
df -h

# Xem Docker đang dùng bao nhiêu
docker system df

# Xoá cache Docker không dùng
docker system prune -af

# Xoá backup cũ hơn 30 ngày
find /opt/benhub/backups -mtime +30 -delete
```

### Restart một service cụ thể

```bash
# Restart chỉ backend
docker compose -f docker-compose.production.yml restart backend

# Restart toàn bộ stack
docker compose -f docker-compose.production.yml restart
```

### Xoá và deploy lại hoàn toàn (khi mọi cách khác thất bại)

> **Cảnh báo:** Lệnh dưới đây xoá database. Backup trước!

```bash
# Backup trước
docker compose -f docker-compose.production.yml exec -T postgres \
  pg_dump -U benhub benhub > /opt/benhub/backups/emergency-$(date +%Y%m%d).sql

# Dừng và xoá toàn bộ
docker compose -f docker-compose.production.yml down -v

# Deploy lại từ đầu
bash deploy/deploy.sh
```

---

## Tóm tắt checklist lần đầu deploy

```
CHUẨN BỊ
[ ] VPS CentOS đã có (≥ 2GB RAM)
[ ] Domain benhub.vn đã trỏ về IP VPS (DNS đã propagate)
[ ] Có thể SSH vào VPS bằng root

TRÊN VPS — HỆ THỐNG
[ ] dnf update -y
[ ] dnf install -y git curl wget nano openssl
[ ] SELinux chuyển sang Permissive (setenforce 0)

TRÊN VPS — DOCKER
[ ] Thêm repo Docker: dnf config-manager --add-repo ...
[ ] dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
[ ] systemctl enable --now docker
[ ] usermod -aG docker $USER

TRÊN VPS — DỰ ÁN
[ ] git clone repo vào /opt/benhub
[ ] Tạo file .env với đầy đủ secrets (openssl rand)
[ ] chmod 600 .env

SSL
[ ] firewall-cmd --temporary --add-service=http
[ ] dnf install -y epel-release certbot
[ ] certbot certonly --standalone -d benhub.vn -d www.benhub.vn
[ ] cp certs vào deploy/certs/
[ ] chmod 600 deploy/certs/*.pem

DEPLOY
[ ] bash deploy/deploy.sh
[ ] docker compose ps: 5 containers đều Up

KIỂM TRA
[ ] https://benhub.vn mở được trên trình duyệt
[ ] HTTPS có khoá xanh
[ ] /login và /cms/dashboard hoạt động
[ ] curl /api-backend/api/v1/posts trả về JSON

BẢO MẬT & VẬN HÀNH
[ ] firewall-cmd --permanent --add-service={ssh,http,https} && firewall-cmd --reload
[ ] Cron gia hạn SSL (crontab -e)
[ ] Cron backup DB hàng ngày (crontab -e)
[ ] mkdir -p /opt/benhub/backups
```

---

# Phần II — Deploy trên Windows Server

> Hướng dẫn deploy lên VPS **Windows Server 2019/2022** (qua WSL2 + Docker Engine) đã được tách ra file riêng để dễ bảo trì: **[`docs/deploy_windown.md`](./deploy_windown.md)**.
