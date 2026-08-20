# Hướng dẫn Deploy BenHub lên VPS — CentOS & Windows Server

> Tài liệu này dành cho người **chưa từng deploy** dự án lên VPS.  
> Đọc hết một lượt trước khi bắt tay thực hiện.

> **Đang chuyển server sang Windows?** Toàn bộ **Phần I** dưới đây là cho VPS CentOS (giữ lại để tham khảo / rollback).  
> Hướng dẫn build Docker trên **Windows Server 2019/2022** nằm ở **[Phần II](#phần-ii--deploy-trên-windows-server-20192022)**, cuối tài liệu.

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

# 1. Pull code mới
git pull origin master

# 2. Build lại images
docker compose -f docker-compose.production.yml build backend frontend

# 3. Restart không downtime
docker compose -f docker-compose.production.yml up -d --no-deps backend frontend

# 4. Xem log xác nhận không có lỗi
docker compose -f docker-compose.production.yml logs -f backend frontend
```

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

# Phần II — Deploy trên Windows Server (2019/2022)

> Áp dụng cho VPS thuê chạy **Windows Server 2019** hoặc **2022** (Standard/Datacenter).  
> **Docker Desktop không được hỗ trợ chính thức trên Windows Server** (chỉ hỗ trợ Windows 10/11) — nên lộ trình dưới đây cài **Docker Engine bên trong WSL2 (Ubuntu 22.04)**, y hệt cách Docker chạy trên một VPS Linux thật. Images của dự án (`node:22-alpine`) là Linux container nên **bắt buộc** phải chạy qua WSL2, không dùng được Windows Containers.

## Mục lục — Phần II

1. [Yêu cầu hệ thống](#w1-yêu-cầu-hệ-thống)
2. [Kết nối vào Windows Server](#w2-kết-nối-vào-windows-server)
3. [Bật WSL2](#w3-bật-wsl2)
4. [Cài Ubuntu 22.04 vào WSL2 (không cần Microsoft Store)](#w4-cài-ubuntu-2204-vào-wsl2-không-cần-microsoft-store)
5. [Bật systemd trong WSL2](#w5-bật-systemd-trong-wsl2)
6. [Cài Docker Engine trong WSL2](#w6-cài-docker-engine-trong-wsl2)
7. [Clone dự án, tạo `.env`, cài SSL](#w7-clone-dự-án-tạo-env-cài-ssl)
8. [Chạy deploy](#w8-chạy-deploy)
9. [Port-forward Windows ↔ WSL2 (bắt buộc)](#w9-port-forward-windows--wsl2-bắt-buộc)
10. [Windows Firewall](#w10-windows-firewall)
11. [Tự khởi động khi Windows Server reboot](#w11-tự-khởi-động-khi-windows-server-reboot)
12. [Backup, cập nhật code, xử lý sự cố](#w12-backup-cập-nhật-code-xử-lý-sự-cố)
13. [Checklist Windows Server](#w13-checklist-windows-server)

---

## W1. Yêu cầu hệ thống

| Thành phần | Tối thiểu | Khuyến nghị |
|------------|-----------|-------------|
| RAM | 4 GB | 8 GB (WSL2 + Docker ăn RAM hơn Linux thuần) |
| CPU | 2 vCPU | 4 vCPU |
| Disk | 40 GB SSD | 60 GB SSD |
| OS | Windows Server 2019 (build ≥ 1809) / 2022 | Windows Server 2022 |
| Ảo hoá | Nested virtualization **phải bật** ở phía nhà cung cấp VPS cho WSL2 chạy | — |
| Port | RDP 3389, HTTP 80, HTTPS 443 mở | — |

> **Quan trọng:** WSL2 dùng Hyper-V bên dưới. Nếu VPS là máy ảo (hầu hết VPS Windows đều vậy), nhà cung cấp phải bật **nested virtualization** cho gói VPS của bạn, nếu không `wsl --set-default-version 2` sẽ báo lỗi. Hỏi trước nhà cung cấp nếu không chắc.

Domain trỏ về IP VPS: làm giống hệt [mục 1 Phần I](#1-yêu-cầu-hệ-thống) (`nslookup benhub.vn`).

---

## W2. Kết nối vào Windows Server

Dùng **Remote Desktop (RDP)** — không dùng SSH như CentOS:

1. Trên máy cá nhân, mở **Remote Desktop Connection** (Windows) hoặc **Microsoft Remote Desktop** (macOS).
2. Nhập IP VPS, đăng nhập bằng user `Administrator` và password được cấp.
3. Mở **PowerShell as Administrator** trên VPS — mọi lệnh ở Phần II chạy trong PowerShell trừ khi ghi rõ là chạy trong WSL/bash.

> Muốn thao tác qua terminal SSH quen thuộc thay vì RDP: cài **OpenSSH Server** (tính năng có sẵn trong Windows Server):
> ```powershell
> Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
> Start-Service sshd
> Set-Service -Name sshd -StartupType Automatic
> New-NetFirewallRule -Name sshd -DisplayName "OpenSSH Server" -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
> ```
> Sau đó `ssh Administrator@<IP_VPS>` từ máy cá nhân, vào PowerShell y như RDP.

---

## W3. Bật WSL2

Chạy trong **PowerShell (Administrator)**:

```powershell
# 1. Bật 2 tính năng bắt buộc cho WSL2
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# 2. Khởi động lại server để tính năng có hiệu lực
Restart-Computer
```

Sau khi RDP lại vào, mở PowerShell (Administrator) và tiếp tục:

```powershell
# 3. Cài gói cập nhật kernel Linux cho WSL2 (Windows Server không có sẵn, khác Windows 10/11)
Invoke-WebRequest -Uri "https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi" -OutFile "$env:TEMP\wsl_update_x64.msi"
Start-Process msiexec.exe -ArgumentList "/i `"$env:TEMP\wsl_update_x64.msi`" /quiet" -Wait

# 4. Đặt WSL2 làm phiên bản mặc định cho mọi distro cài sau này
wsl --set-default-version 2

# 5. Kiểm tra
wsl --status
```

Kết quả mong đợi ở `wsl --status`: `Default Version: 2`.

> Nếu lệnh `wsl --set-default-version 2` báo lỗi liên quan đến ảo hoá (`WSL_E_HYPERV_NOT_SUPPORTED` hoặc tương tự) — nhà cung cấp VPS chưa bật nested virtualization. Liên hệ họ, xem lại lưu ý ở [W1](#w1-yêu-cầu-hệ-thống).

---

## W4. Cài Ubuntu 22.04 vào WSL2 (không cần Microsoft Store)

Windows Server không có Microsoft Store, nên **import thủ công** file rootfs của Ubuntu thay vì `wsl --install -d Ubuntu`:

```powershell
# 1. Tạo thư mục lưu WSL distro
New-Item -ItemType Directory -Force -Path C:\WSL\Ubuntu-22.04

# 2. Tải rootfs Ubuntu 22.04 chính thức (dựng riêng cho WSL)
Invoke-WebRequest -Uri "https://cloud-images.ubuntu.com/wsl/jammy/current/ubuntu-jammy-wsl-amd64-wsl.rootfs.tar.gz" -OutFile "$env:TEMP\ubuntu-22.04.tar.gz"

# 3. Import vào WSL2
wsl --import Ubuntu-22.04 C:\WSL\Ubuntu-22.04 "$env:TEMP\ubuntu-22.04.tar.gz" --version 2

# 4. Kiểm tra
wsl -l -v
```

Kết quả mong đợi:
```
  NAME            STATE           VERSION
* Ubuntu-22.04    Running         2
```

### 4.1 Tạo user thường (rootfs import mặc định chạy bằng `root`)

```powershell
wsl -d Ubuntu-22.04 -u root
```

Trong shell Ubuntu vừa mở (đây là **bash**, không phải PowerShell nữa):

```bash
adduser benhub
usermod -aG sudo benhub
exit
```

---

## W5. Bật systemd trong WSL2

Ubuntu 22.04 trên WSL2 hỗ trợ `systemd` — cần bật để `systemctl enable docker`, cron, v.v. hoạt động như Linux thật.

Trong PowerShell:

```powershell
wsl -d Ubuntu-22.04 -u root
```

Trong bash:

```bash
cat <<'EOF' > /etc/wsl.conf
[boot]
systemd=true

[user]
default=benhub
EOF
exit
```

Khởi động lại WSL để áp dụng:

```powershell
wsl --shutdown
wsl -d Ubuntu-22.04
```

Kiểm tra systemd đã chạy (trong bash, giờ đăng nhập sẵn là user `benhub`):

```bash
systemctl status
# Kỳ vọng: thấy "State: running", KHÔNG phải "System has not been booted with systemd"
```

> Từ đây, mọi lệnh bash ở các mục W6–W12 chạy **bên trong WSL2** (`wsl -d Ubuntu-22.04`), và về cơ bản **giống hệt Ubuntu/Debian thật** — chỉ khác CentOS ở chỗ dùng `apt` thay vì `dnf`, không cần SELinux.

---

## W6. Cài Docker Engine trong WSL2

Trong bash (WSL2, user `benhub`, có quyền `sudo`):

```bash
# 1. Cập nhật hệ thống + công cụ cơ bản
sudo apt update && sudo apt upgrade -y
sudo apt install -y ca-certificates curl gnupg lsb-release git nano openssl

# 2. Thêm GPG key + repo chính thức của Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 3. Cài Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 4. Bật Docker qua systemd (chạy được vì đã bật systemd ở W5)
sudo systemctl enable --now docker

# 5. Dùng Docker không cần sudo
sudo usermod -aG docker $USER
newgrp docker

# 6. Kiểm tra
docker --version
docker compose version
```

Kết quả mong đợi giống hệt [mục 5.5 Phần I](#55-thêm-user-vào-nhóm-docker):
```
Docker version 26.x.x, build ...
Docker Compose version v2.x.x
```

---

## W7. Clone dự án, tạo `.env`, cài SSL

Vẫn trong bash (WSL2). **Clone vào filesystem của Linux (`~/benhub`), không clone vào `/mnt/c/...`** — I/O qua ranh giới Windows↔WSL rất chậm, sẽ làm `docker build` chậm gấp nhiều lần:

```bash
mkdir -p ~/benhub
cd ~/benhub
git clone https://github.com/tdgiang/Benhub.git .
ls
```

Từ đây, các bước sau **giống hệt Phần I**, chỉ đổi `dnf`/`yum` → `apt` khi cần cài gói, và đường dẫn `/opt/benhub` → `~/benhub`:

- **Tạo `.env`**: làm y hệt [mục 7 Phần I](#7-tạo-file-cấu-hình-env) (`nano .env`, sinh secret bằng `openssl rand`, `chmod 600 .env`).
- **Cài SSL certbot**:
  ```bash
  sudo apt install -y certbot
  sudo certbot certonly --standalone \
    -d benhub.vn -d www.benhub.vn \
    --email admin@benhub.vn --agree-tos --non-interactive
  mkdir -p ~/benhub/deploy/certs
  sudo cp /etc/letsencrypt/live/benhub.vn/fullchain.pem ~/benhub/deploy/certs/
  sudo cp /etc/letsencrypt/live/benhub.vn/privkey.pem   ~/benhub/deploy/certs/
  sudo chown $USER:$USER ~/benhub/deploy/certs/*.pem
  chmod 600 ~/benhub/deploy/certs/*.pem
  ```
  (Chi tiết đầy đủ, gồm cả phương án Snap nếu `apt` không lấy được cert: xem [mục 8 Phần I](#8-cấu-hình-ssl-https).)

> Port 80 cần mở **trên Windows Firewall** (không phải `firewall-cmd`) để certbot xin chứng chỉ thành công — xem [W10](#w10-windows-firewall) trước khi chạy `certbot`.

---

## W8. Chạy deploy

Vẫn trong bash (WSL2):

```bash
cd ~/benhub
bash deploy/deploy.sh
```

Script chạy y hệt mô tả ở [mục 9 Phần I](#9-chạy-deploy) — build image, migrate DB, start toàn bộ stack. Theo dõi log:

```bash
docker compose -f docker-compose.production.yml logs -f
```

Kiểm tra containers **bên trong WSL** trước:

```bash
curl -I http://localhost:443 --insecure
docker compose -f docker-compose.production.yml ps
```

Nếu 2 lệnh trên OK nhưng `https://benhub.vn` chưa vào được từ bên ngoài — bình thường, còn thiếu bước **W9** (port-forward Windows ra ngoài).

---

## W9. Port-forward Windows ↔ WSL2 (bắt buộc)

Đây là khác biệt lớn nhất so với VPS Linux thuần: **card mạng public của VPS gắn vào Windows host**, còn container Docker chạy **bên trong WSL2** — một máy ảo NAT riêng với IP nội bộ (`172.x.x.x`) đổi mỗi lần reboot. Không forward port thì request từ Internet vào port 80/443 của Windows **không bao giờ tới được** container.

### 9.1 Lấy IP hiện tại của WSL2

Trong PowerShell:

```powershell
wsl -d Ubuntu-22.04 -- hostname -I
```

Kết quả ví dụ: `172.28.144.5`

### 9.2 Tạo port-forward (PowerShell, Administrator)

```powershell
$wslIp = (wsl -d Ubuntu-22.04 -- hostname -I).Trim().Split(" ")[0]

foreach ($port in 80, 443) {
    netsh interface portproxy delete v4tov4 listenport=$port listenaddress=0.0.0.0 2>$null
    netsh interface portproxy add    v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wslIp
}

netsh interface portproxy show v4tov4
```

Kết quả mong đợi:
```
Listen on ipv4:             Connect to ipv4:

Address         Port        Address         Port
--------------- ----------  --------------- ----------
0.0.0.0         80          172.28.144.5    80
0.0.0.0         443         172.28.144.5    443
```

> **IP của WSL2 đổi mỗi lần Windows Server reboot** → rule portproxy ở trên sẽ trỏ sai IP sau khi restart nếu không làm lại. Giải quyết dứt điểm ở [W11](#w11-tự-khởi-động-khi-windows-server-reboot) bằng script tự refresh khi khởi động.

### 9.3 Kiểm tra từ máy cá nhân

```bash
curl -I https://benhub.vn
```

Nếu vẫn không vào được, kiểm tra tiếp [W10](#w10-windows-firewall).

---

## W10. Windows Firewall

Thay cho `firewall-cmd` của CentOS. Chạy trong **PowerShell (Administrator)**:

```powershell
New-NetFirewallRule -DisplayName "HTTP"  -Direction Inbound -Protocol TCP -LocalPort 80  -Action Allow
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow

# Kiểm tra
Get-NetFirewallRule -DisplayName "HTTP","HTTPS" | Select-Object DisplayName, Enabled, Direction, Action
```

> **Cảnh báo:** không tắt/xoá rule cho port RDP (3389) hoặc SSH (22 nếu đã bật ở W2) — sẽ mất quyền truy cập VPS và phải nhờ nhà cung cấp can thiệp qua console riêng.

---

## W11. Tự khởi động khi Windows Server reboot

WSL2 **không tự chạy** khi Windows khởi động lại — cần Task Scheduler khởi động distro và refresh port-forward mỗi lần reboot.

### 11.1 Tạo script refresh port-forward

Trong PowerShell (Administrator), lưu file `C:\WSL\refresh-portproxy.ps1`:

```powershell
New-Item -ItemType Directory -Force -Path C:\WSL | Out-Null

@'
$wslIp = (wsl -d Ubuntu-22.04 -- hostname -I).Trim().Split(" ")[0]
foreach ($port in 80, 443) {
    netsh interface portproxy delete v4tov4 listenport=$port listenaddress=0.0.0.0 2>$null
    netsh interface portproxy add    v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wslIp
}
'@ | Out-File -Encoding utf8 C:\WSL\refresh-portproxy.ps1
```

### 11.2 Đăng ký 2 Scheduled Task chạy lúc khởi động

```powershell
# Task 1 — khởi động WSL2 distro (dockerd tự chạy nhờ systemd đã bật ở W5)
$action1 = New-ScheduledTaskAction -Execute "wsl.exe" -Argument "-d Ubuntu-22.04 -u root -e /bin/true"
$trigger1 = New-ScheduledTaskTrigger -AtStartup
$principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd -ExecutionTimeLimit ([TimeSpan]::Zero)

Register-ScheduledTask -TaskName "WSL-Start-Ubuntu" -Action $action1 -Trigger $trigger1 -Principal $principal -Settings $settings -Force

# Task 2 — refresh port-forward, chạy trễ 30s để chắc WSL2 đã lên hẳn
$action2 = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -File C:\WSL\refresh-portproxy.ps1"
$trigger2 = New-ScheduledTaskTrigger -AtStartup
$trigger2.Delay = "PT30S"

Register-ScheduledTask -TaskName "WSL-PortProxy-Refresh" -Action $action2 -Trigger $trigger2 -Principal $principal -Settings $settings -Force
```

### 11.3 Kiểm tra

```powershell
Restart-Computer
```

Sau khi Windows khởi động lại và RDP vào lại được:

```powershell
wsl -l -v                        # Ubuntu-22.04 phải ở trạng thái Running
netsh interface portproxy show v4tov4   # phải thấy đúng IP WSL2 mới
```

```bash
# trong WSL
docker compose -f ~/benhub/docker-compose.production.yml ps   # tất cả container phải Up
```

---

## W12. Backup, cập nhật code, xử lý sự cố

Vì Docker chạy trong WSL2 Ubuntu **với systemd bật**, mọi thứ ở đây **giống hệt Linux thật** — chạy trong bash (`wsl -d Ubuntu-22.04`), không cần viết lại riêng cho Windows:

- **Backup định kỳ**: làm y hệt [mục 13 Phần I](#13-backup-định-kỳ) — `crontab -e` hoạt động bình thường vì `cron` chạy qua systemd. Cài `cron` nếu thiếu: `sudo apt install -y cron && sudo systemctl enable --now cron`.
- **Gia hạn SSL tự động**: y hệt [mục 12 Phần I](#12-thiết-lập-tự-động-gia-hạn-ssl), cron job giống nguyên văn.
- **Cập nhật code sau này**: y hệt [mục 14 Phần I](#14-quy-trình-cập-nhật-code-sau-này) (`git pull` → `docker compose build` → `up -d --no-deps`), chạy trong `~/benhub`.
- **Xử lý sự cố chung** (container không chạy, backend 500, hết dung lượng disk...): y hệt [mục 15 Phần I](#15-xử-lý-sự-cố-thường-gặp) — **bỏ qua phần SELinux** (không tồn tại trên Ubuntu/WSL2) và phần aaPanel (đặc thù panel Linux, không dùng trên Windows).

### Sự cố đặc thù Windows Server / WSL2

**`https://benhub.vn` không vào được nhưng container chạy bình thường trong WSL:**

```powershell
# 1. Kiểm tra WSL2 có đang chạy không
wsl -l -v

# 2. Kiểm tra port-forward còn trỏ đúng IP không (IP đổi sau mỗi lần WSL2 restart)
netsh interface portproxy show v4tov4
wsl -d Ubuntu-22.04 -- hostname -I

# Nếu IP lệch nhau → chạy lại script refresh
powershell -ExecutionPolicy Bypass -File C:\WSL\refresh-portproxy.ps1
```

**WSL2 báo lỗi liên quan Hyper-V / ảo hoá khi khởi động:**

Nested virtualization chưa bật ở tầng hypervisor của nhà cung cấp VPS — xem lại [W1](#w1-yêu-cầu-hệ-thống), liên hệ nhà cung cấp.

**Docker build rất chậm (>15 phút cho lần đầu):**

Repo đang nằm ở `/mnt/c/...` thay vì filesystem Linux của WSL2. Clone lại vào `~/benhub` (xem [W7](#w7-clone-dự-án-tạo-env-cài-ssl)).

**Sau khi Windows Update / reboot, mất kết nối tới website:**

Windows Update đôi khi reset Scheduled Task hoặc rule portproxy. Chạy lại 2 lệnh kiểm tra ở mục "container chạy bình thường trong WSL" phía trên; nếu Task Scheduler bị vô hiệu hoá, chạy lại toàn bộ [W11.2](#w11-tự-khởi-động-khi-windows-server-reboot).

---

## W13. Checklist Windows Server

```
CHUẨN BỊ
[ ] VPS Windows Server 2019/2022 đã có (≥ 4GB RAM)
[ ] Nested virtualization đã được nhà cung cấp bật (WSL2 cần Hyper-V)
[ ] Domain benhub.vn đã trỏ về IP VPS
[ ] RDP vào được VPS bằng Administrator

WSL2 + UBUNTU
[ ] dism.exe bật Microsoft-Windows-Subsystem-Linux + VirtualMachinePlatform
[ ] Restart-Computer
[ ] Cài wsl_update_x64.msi, wsl --set-default-version 2
[ ] wsl --import Ubuntu-22.04 ... (tải rootfs từ cloud-images.ubuntu.com/wsl)
[ ] Tạo user thường (adduser benhub, usermod -aG sudo)
[ ] /etc/wsl.conf bật systemd=true, default user benhub
[ ] wsl --shutdown && wsl -d Ubuntu-22.04 → systemctl status chạy "running"

DOCKER (trong WSL2, giống Ubuntu thật)
[ ] apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
[ ] sudo systemctl enable --now docker
[ ] usermod -aG docker $USER

DỰ ÁN (trong WSL2)
[ ] git clone vào ~/benhub (KHÔNG phải /mnt/c/...)
[ ] Tạo .env với đầy đủ secrets
[ ] chmod 600 .env
[ ] certbot certonly --standalone -d benhub.vn -d www.benhub.vn
[ ] cp certs vào deploy/certs/, chown về user, chmod 600

DEPLOY
[ ] bash deploy/deploy.sh (trong WSL2)
[ ] docker compose ps: 5 containers đều Up (kiểm tra trong WSL)

MẠNG WINDOWS ↔ WSL2 (bước dễ quên nhất)
[ ] netsh interface portproxy add v4tov4 cho port 80 và 443 trỏ đúng IP WSL2
[ ] New-NetFirewallRule mở port 80/443 trên Windows Firewall
[ ] Task Scheduler "WSL-Start-Ubuntu" chạy AtStartup
[ ] Task Scheduler "WSL-PortProxy-Refresh" chạy AtStartup (delay 30s)
[ ] Restart-Computer thử lại — verify portproxy show v4tov4 tự cập nhật đúng

KIỂM TRA
[ ] https://benhub.vn mở được từ máy ngoài VPS
[ ] HTTPS có khoá xanh
[ ] /login và /cms/dashboard hoạt động

BẢO MẬT & VẬN HÀNH
[ ] cron trong WSL2 cho gia hạn SSL + backup DB (giống Linux, nhờ systemd)
[ ] mkdir -p ~/benhub/backups
```
