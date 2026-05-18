# Hướng dẫn Deploy BenHub lên VPS (Lần đầu)

> Tài liệu này dành cho người **chưa từng deploy** dự án lên VPS.  
> Đọc hết một lượt trước khi bắt tay thực hiện.

---

## Mục lục

1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Chuẩn bị trên máy tính cá nhân](#2-chuẩn-bị-trên-máy-tính-cá-nhân)
3. [Cài đặt VPS](#3-cài-đặt-vps)
4. [Cài đặt Docker](#4-cài-đặt-docker)
5. [Clone dự án lên VPS](#5-clone-dự-án-lên-vps)
6. [Tạo file cấu hình `.env`](#6-tạo-file-cấu-hình-env)
7. [Cấu hình SSL (HTTPS)](#7-cấu-hình-ssl-https)
8. [Chạy deploy](#8-chạy-deploy)
9. [Kiểm tra sau deploy](#9-kiểm-tra-sau-deploy)
10. [Cấu hình tường lửa (UFW)](#10-cấu-hình-tường-lửa-ufw)
11. [Thiết lập tự động gia hạn SSL](#11-thiết-lập-tự-động-gia-hạn-ssl)
12. [Backup định kỳ](#12-backup-định-kỳ)
13. [Quy trình cập nhật code sau này](#13-quy-trình-cập-nhật-code-sau-này)
14. [Xử lý sự cố thường gặp](#14-xử-lý-sự-cố-thường-gặp)

---

## 1. Yêu cầu hệ thống

### VPS tối thiểu

| Thành phần | Yêu cầu tối thiểu | Khuyến nghị |
|------------|-------------------|-------------|
| RAM | 2 GB | 4 GB |
| CPU | 2 vCPU | 2–4 vCPU |
| Disk | 20 GB SSD | 40 GB SSD |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |
| Port | 22, 80, 443 mở | — |

### Tên miền

- Đã có domain `benhub.vn` trỏ về IP của VPS (DNS A record)
- Kiểm tra bằng lệnh: `nslookup benhub.vn` → phải trả về đúng IP VPS

> **Lưu ý:** DNS cần 5–30 phút để propagate sau khi cấu hình. Hãy đợi DNS hoạt động trước khi cài SSL.

---

## 2. Chuẩn bị trên máy tính cá nhân

### 2.1 Checklist trước khi bắt đầu

- [ ] Có địa chỉ IP của VPS
- [ ] Có user và password (hoặc SSH key) để SSH vào VPS
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

## 3. Cài đặt VPS

> Chạy các lệnh này **trên VPS** sau khi SSH vào.

### 3.1 Cập nhật hệ thống

```bash
apt update && apt upgrade -y
```

### 3.2 Cài các công cụ cơ bản

```bash
apt install -y git curl wget nano ufw certbot
```

### 3.3 Tạo user không phải root (tuỳ chọn nhưng khuyến nghị)

```bash
adduser benhub
usermod -aG sudo benhub

# Cấp quyền SSH cho user mới
rsync --archive --chown=benhub:benhub ~/.ssh /home/benhub
```

Từ bước này có thể dùng user `benhub` thay vì `root`.

---

## 4. Cài đặt Docker

```bash
# Cài Docker Engine chính thức
curl -fsSL https://get.docker.com | sh

# Cho phép user hiện tại dùng Docker không cần sudo
usermod -aG docker $USER

# Áp dụng group mới ngay lập tức (hoặc logout rồi login lại)
newgrp docker

# Kiểm tra Docker đã chạy chưa
docker --version
docker compose version
```

Kết quả mong đợi:
```
Docker version 26.x.x, build ...
Docker Compose version v2.x.x
```

---

## 5. Clone dự án lên VPS

```bash
# Tạo thư mục chứa dự án
mkdir -p /opt/benhub
cd /opt/benhub

# Clone từ GitHub (thay <repo-url> bằng URL thật)
git clone https://github.com/tdgiang/Benhub.git .

# Kiểm tra file đã có
ls
```

Kết quả mong đợi: thấy `docker-compose.production.yml`, `src/`, `deploy/`, v.v.

---

## 6. Tạo file cấu hình `.env`

File `.env` chứa **tất cả mật khẩu và secret** — không bao giờ commit file này lên Git.

### 6.1 Tạo file `.env`

```bash
cd /opt/benhub
nano .env
```

### 6.2 Nội dung file `.env`

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

### 6.3 Tạo các secret ngẫu nhiên

Chạy từng lệnh dưới đây để tạo secret mạnh, rồi dán vào file `.env`:

```bash
# POSTGRES_PASSWORD
openssl rand -hex 16

# REDIS_PASSWORD
openssl rand -hex 16

# JWT_SECRET
openssl rand -hex 64

# JWT_REFRESH_SECRET
openssl rand -hex 64

# AUTH_SECRET
openssl rand -base64 32
```

### 6.4 Ví dụ file `.env` đã điền

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

### 6.5 Phân quyền file `.env`

```bash
chmod 600 /opt/benhub/.env
```

---

## 7. Cấu hình SSL (HTTPS)

> Bước này yêu cầu domain đã trỏ về IP VPS và port 80 đang mở.

### 7.1 Cấp chứng chỉ SSL miễn phí từ Let's Encrypt

```bash
# Dừng bất kỳ service nào đang dùng port 80 (nếu có)
# Cấp chứng chỉ cho cả domain chính và www
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

### 7.2 Copy chứng chỉ vào thư mục dự án

```bash
mkdir -p /opt/benhub/deploy/certs

cp /etc/letsencrypt/live/benhub.vn/fullchain.pem /opt/benhub/deploy/certs/
cp /etc/letsencrypt/live/benhub.vn/privkey.pem   /opt/benhub/deploy/certs/

chmod 600 /opt/benhub/deploy/certs/*.pem
```

### 7.3 Kiểm tra file cert

```bash
ls -la /opt/benhub/deploy/certs/
# Phải thấy: fullchain.pem và privkey.pem
```

---

## 8. Chạy deploy

```bash
cd /opt/benhub
bash deploy/deploy.sh
```

Script sẽ tự động:
1. Kiểm tra các biến môi trường bắt buộc
2. Build Docker images (backend + frontend)
3. Khởi động PostgreSQL và Redis
4. Chạy database migration (Prisma)
5. Khởi động tất cả services
6. Health check cơ bản

Quá trình build lần đầu mất **5–15 phút** tuỳ tốc độ VPS và mạng.

### Theo dõi tiến trình

```bash
# Trong terminal khác, xem log real-time
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

## 9. Kiểm tra sau deploy

### 9.1 Kiểm tra containers đang chạy

```bash
docker compose -f docker-compose.production.yml ps
```

Kết quả mong đợi — tất cả status phải là `running`:

```
NAME               STATUS          PORTS
benhub_postgres    Up (healthy)    5432/tcp
benhub_redis       Up (healthy)    6379/tcp
benhub_backend     Up              4000/tcp
benhub_frontend    Up              3000/tcp
benhub_nginx       Up              0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
```

### 9.2 Kiểm tra website

```bash
# Frontend — phải trả về HTML
curl -I https://benhub.vn

# Backend API — phải trả về JSON
curl https://benhub.vn/api-backend/api/v1/posts

# Kiểm tra redirect HTTP → HTTPS
curl -I http://benhub.vn
# Phải thấy: Location: https://benhub.vn (301)
```

### 9.3 Kiểm tra bằng trình duyệt

- [ ] `https://benhub.vn` — trang chủ hiển thị bình thường
- [ ] Có biểu tượng khoá HTTPS trên thanh địa chỉ
- [ ] `https://benhub.vn/login` — trang đăng nhập hoạt động
- [ ] `https://benhub.vn/cms/dashboard` — redirect về `/login` nếu chưa đăng nhập

### 9.4 Kiểm tra log không có lỗi

```bash
# Log backend
docker compose -f docker-compose.production.yml logs backend --tail=50

# Log frontend
docker compose -f docker-compose.production.yml logs frontend --tail=50

# Log nginx
docker compose -f docker-compose.production.yml logs nginx --tail=20
```

---

## 10. Cấu hình tường lửa (UFW)

Chỉ cho phép port cần thiết:

```bash
# Cho phép SSH (bắt buộc — không được bỏ)
ufw allow 22/tcp

# Cho phép HTTP và HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Bật tường lửa
ufw enable

# Kiểm tra trạng thái
ufw status verbose
```

Kết quả mong đợi:
```
Status: active
To                   Action      From
22/tcp               ALLOW IN    Anywhere
80/tcp               ALLOW IN    Anywhere
443/tcp              ALLOW IN    Anywhere
```

> **Cảnh báo:** Không bao giờ block port 22 — sẽ mất quyền SSH vào VPS.

---

## 11. Thiết lập tự động gia hạn SSL

Chứng chỉ Let's Encrypt hết hạn sau 90 ngày. Cài cron để tự gia hạn:

```bash
crontab -e
```

Thêm vào cuối file:

```cron
# Gia hạn SSL mỗi Chủ nhật lúc 3:00 sáng
0 3 * * 0 certbot renew --quiet \
  && cp /etc/letsencrypt/live/benhub.vn/fullchain.pem /opt/benhub/deploy/certs/ \
  && cp /etc/letsencrypt/live/benhub.vn/privkey.pem   /opt/benhub/deploy/certs/ \
  && docker restart benhub_nginx \
  >> /var/log/certbot-renew.log 2>&1
```

Kiểm tra cron hoạt động:

```bash
# Thử gia hạn (dry-run — không thực sự gia hạn)
certbot renew --dry-run
```

---

## 12. Backup định kỳ

### 12.1 Backup database thủ công

```bash
cd /opt/benhub

docker compose -f docker-compose.production.yml exec postgres \
  pg_dump -U benhub benhub \
  > backup-db-$(date +%Y%m%d-%H%M%S).sql

echo "Backup xong: backup-db-$(date +%Y%m%d).sql"
```

### 12.2 Backup ảnh upload

```bash
docker run --rm \
  -v benhub_uploads_data:/data \
  -v /opt/benhub:/backup \
  alpine \
  tar czf /backup/backup-uploads-$(date +%Y%m%d).tar.gz /data

echo "Backup uploads xong"
```

### 12.3 Tự động backup hàng ngày (cron)

```bash
crontab -e
```

Thêm vào:

```cron
# Backup DB mỗi ngày lúc 2:00 sáng, giữ 7 ngày gần nhất
0 2 * * * cd /opt/benhub && docker compose -f docker-compose.production.yml exec -T postgres pg_dump -U benhub benhub > /opt/benhub/backups/db-$(date +\%Y\%m\%d).sql && find /opt/benhub/backups -name "db-*.sql" -mtime +7 -delete
```

```bash
# Tạo thư mục backup
mkdir -p /opt/benhub/backups
```

---

## 13. Quy trình cập nhật code sau này

Sau khi deploy lần đầu thành công, mỗi lần có code mới:

```bash
cd /opt/benhub

# 1. Pull code mới
git pull origin master

# 2. Build lại images (chỉ rebuild service thay đổi)
docker compose -f docker-compose.production.yml build backend frontend

# 3. Restart với zero-downtime
docker compose -f docker-compose.production.yml up -d --no-deps backend frontend

# 4. Xem log để xác nhận không có lỗi
docker compose -f docker-compose.production.yml logs -f backend frontend
```

Nếu có migration database mới:

```bash
# Chạy migration trước khi restart backend
docker compose -f docker-compose.production.yml run --rm migrate
docker compose -f docker-compose.production.yml up -d --no-deps backend
```

---

## 14. Xử lý sự cố thường gặp

### Website không truy cập được

```bash
# 1. Kiểm tra containers
docker compose -f docker-compose.production.yml ps

# 2. Xem log nginx
docker compose -f docker-compose.production.yml logs nginx

# 3. Kiểm tra cert SSL còn hạn không
openssl x509 -enddate -noout -in /opt/benhub/deploy/certs/fullchain.pem
```

### Backend lỗi 500 / không kết nối được DB

```bash
# Xem log backend
docker compose -f docker-compose.production.yml logs backend --tail=100

# Kiểm tra PostgreSQL healthy không
docker compose -f docker-compose.production.yml exec postgres pg_isready -U benhub
```

### Frontend không hiển thị đúng (lỗi hydration, v.v.)

```bash
docker compose -f docker-compose.production.yml logs frontend --tail=100
```

### Restart một service cụ thể

```bash
# Restart chỉ backend
docker compose -f docker-compose.production.yml restart backend

# Restart toàn bộ stack
docker compose -f docker-compose.production.yml restart
```

### Xoá và deploy lại hoàn toàn (dùng khi mọi cách khác thất bại)

> **Cảnh báo:** Lệnh này sẽ xoá database. Backup trước!

```bash
# Backup trước
docker compose -f docker-compose.production.yml exec postgres \
  pg_dump -U benhub benhub > emergency-backup.sql

# Dừng và xoá toàn bộ
docker compose -f docker-compose.production.yml down -v

# Deploy lại từ đầu
bash deploy/deploy.sh
```

### Hết dung lượng disk

```bash
# Kiểm tra dung lượng
df -h

# Xoá Docker cache không dùng
docker system prune -af

# Xoá backup cũ hơn 30 ngày
find /opt/benhub/backups -mtime +30 -delete
```

---

## Tóm tắt checklist lần đầu deploy

```
CHUẨN BỊ
[ ] VPS đã có (≥ 2GB RAM, Ubuntu 22.04)
[ ] Domain benhub.vn trỏ về IP VPS (đã propagate)
[ ] Có thể SSH vào VPS

TRÊN VPS
[ ] apt update && apt upgrade -y
[ ] Cài Docker (curl -fsSL https://get.docker.com | sh)
[ ] git clone repo vào /opt/benhub
[ ] Tạo file .env với đầy đủ secrets
[ ] chmod 600 .env

SSL
[ ] certbot certonly --standalone -d benhub.vn -d www.benhub.vn
[ ] Copy certs vào deploy/certs/

DEPLOY
[ ] bash deploy/deploy.sh
[ ] Xác nhận docker ps: 5 containers đều Up

KIỂM TRA
[ ] https://benhub.vn mở được trên trình duyệt
[ ] HTTPS có khoá xanh
[ ] /login và /cms/dashboard hoạt động
[ ] curl https://benhub.vn/api-backend/api/v1/posts trả về JSON

BẢO MẬT SAU DEPLOY
[ ] ufw enable (chỉ mở port 22, 80, 443)
[ ] Cài cron gia hạn SSL tự động
[ ] Cài cron backup DB hàng ngày
```
