# Hướng dẫn Public Website BenHub lên Domain

**VPS:** CentOS — IP `123.31.17.67`  
**Domain:** `benhub.vn`  
**Stack:** Docker Compose (frontend :3000 · backend :4000 · postgres · redis · nginx)

---

## Tổng quan luồng

```
Internet
  │
  ▼
benhub.vn (DNS A → 123.31.17.67)
  │
  ▼
VPS :80 / :443  ←── nginx container (benhub_nginx)
  │
  ├── /api-backend/  →  benhub_backend  :4000
  └── /             →  benhub_frontend :3000
```

---

## Bước 1 — Trỏ DNS domain về VPS

Đăng nhập vào nhà đăng ký domain (tenten.vn / GoDaddy / Namecheap...) → vào **DNS Management** → thêm 2 bản ghi:

| Type | Name  | Value          | TTL |
|------|-------|----------------|-----|
| A    | @     | 123.31.17.67   | 300 |
| A    | www   | 123.31.17.67   | 300 |

**Kiểm tra DNS đã propagate chưa** (chạy từ máy local, chờ 5–30 phút):

```bash
nslookup benhub.vn 8.8.8.8
# Kết quả đúng: Address: 123.31.17.67
```

> Không qua bước tiếp theo cho đến khi DNS trả về IP đúng.

---

## Bước 2 — SSH vào VPS và chuẩn bị môi trường

```bash
ssh root@123.31.17.67
```

### 2.1 Mở firewall (CentOS dùng firewalld)

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Kiểm tra
sudo firewall-cmd --list-services
# Kết quả phải có: http https
```

### 2.2 Kiểm tra Docker và containers đang chạy

```bash
docker ps
# Phải thấy: benhub_frontend, benhub_backend, benhub_postgres, benhub_redis
```

---

## Bước 3 — Tạo file `.env` production

```bash
cd ~/LandingPage   # hoặc đường dẫn bạn clone project về

cp deploy/.env.production.example .env
nano .env
```

Điền đầy đủ các giá trị (thay `CHANGE_ME` bằng giá trị thực):

```env
# Domain
APP_URL=https://benhub.vn

# Database
POSTGRES_DB=benhub
POSTGRES_USER=benhub
POSTGRES_PASSWORD=<chạy: openssl rand -hex 16>

# Redis
REDIS_PASSWORD=<chạy: openssl rand -hex 16>

# JWT
JWT_SECRET=<chạy: openssl rand -hex 64>
JWT_REFRESH_SECRET=<chạy: openssl rand -hex 64>

# NextAuth
AUTH_SECRET=<chạy: openssl rand -base64 32>
```

**Sinh password nhanh:**

```bash
echo "POSTGRES_PASSWORD=$(openssl rand -hex 16)"
echo "REDIS_PASSWORD=$(openssl rand -hex 16)"
echo "JWT_SECRET=$(openssl rand -hex 64)"
echo "JWT_REFRESH_SECRET=$(openssl rand -hex 64)"
echo "AUTH_SECRET=$(openssl rand -base64 32)"
```

Lưu file (Ctrl+O → Enter → Ctrl+X trong nano).

---

## Bước 4 — Lấy SSL Certificate (Let's Encrypt)

Dùng **acme.sh** để lấy cert miễn phí. Port 80 phải đang free (nginx chưa chạy).

### 4.1 Cài acme.sh

```bash
curl https://get.acme.sh | sh -s email=tdgiangdev@gmail.com
source ~/.bashrc
```

### 4.2 Lấy certificate

```bash
~/.acme.sh/acme.sh --issue \
  -d benhub.vn \
  -d www.benhub.vn \
  --standalone
```
 mkdir -p /opt/benhub/Benhub/deploy/certs
  ~/.acme.sh/acme.sh --install-cert -d benhub.vn \
    --cert-file      /opt/benhub/Benhub/deploy/certs/cert.pem \
    --key-file       /opt/benhub/Benhub/deploy/certs/privkey.pem \
    --fullchain-file /opt/benhub/Benhub/deploy/certs/fullchain.pem \
    --reloadcmd      "docker exec benhub_nginx nginx -s reload"

> Nếu bị lỗi `port 80 in use`: kiểm tra `ss -tlnp | grep :80` và dừng service đó.

### 4.3 Cài cert vào thư mục deploy/certs

```bash
mkdir -p ~/LandingPage/deploy/certs

~/.acme.sh/acme.sh --install-cert -d benhub.vn \
  --cert-file     /opt/benhub/Benhub/certs/cert.pem \
  --key-file       /opt/benhub/Benhub/certs/privkey.pem \
  --fullchain-file /opt/benhub/Benhub/certs/fullchain.pem \
  --reloadcmd      "docker exec benhub_nginx nginx -s reload"

# Kiểm tra file đã có chưa
ls -la /opt/benhub/Benhub/certs/
# Phải thấy: cert.pem  fullchain.pem  privkey.pem
```

---

## Bước 5 — Rebuild containers với env production

Nếu containers đang chạy từ lần trước (có thể env chưa đúng), rebuild lại:

```bash
cd ~/LandingPage

# Dừng tất cả (trừ postgres và redis để giữ data)
docker compose -f docker-compose.production.yml stop frontend backend nginx

# Build lại frontend và backend với env mới
docker compose -f docker-compose.production.yml up -d --build frontend backend

# Chờ build xong (2-5 phút)
docker compose -f docker-compose.production.yml logs -f frontend
# Ctrl+C khi thấy "server started" hoặc "ready"
```

---

## Bước 6 — Khởi động Nginx container

```bash
cd ~/LandingPage

docker compose -f docker-compose.production.yml up -d nginx

# Kiểm tra nginx đã chạy chưa
docker compose -f docker-compose.production.yml ps
```

Kết quả mong đợi:

```
NAME              STATUS          PORTS
benhub_frontend   Up              3000/tcp
benhub_backend    Up              4000/tcp
benhub_nginx      Up              0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
benhub_postgres   Up (healthy)    5432/tcp
benhub_redis      Up (healthy)    6379/tcp
```

---

## Bước 7 — Kiểm tra hoạt động

### 7.1 Test từ VPS

```bash
# HTTP phải redirect 301 → HTTPS
curl -I http://benhub.vn
# Phải thấy: HTTP/1.1 301 Moved Permanently

# HTTPS phải trả về 200
curl -I https://benhub.vn
# Phải thấy: HTTP/2 200

# API backend
curl https://benhub.vn/api-backend/api/v1
# Phải thấy: JSON response
```

### 7.2 Test từ trình duyệt

- `https://benhub.vn` → Landing page
- `https://benhub.vn/ve-chung-toi` → Trang về chúng tôi
- `https://benhub.vn/api-backend/api/docs` → Swagger docs

---

## Xử lý lỗi thường gặp

### Lỗi: `ERR_TOO_MANY_REDIRECTS`

Kiểm tra biến `AUTH_URL` trong `.env` phải là `https://benhub.vn` (không phải localhost).

```bash
docker compose -f docker-compose.production.yml exec frontend env | grep AUTH_URL
# Phải ra: AUTH_URL=https://benhub.vn
```

Nếu sai → sửa `.env` → rebuild frontend:

```bash
docker compose -f docker-compose.production.yml up -d --build frontend
```

---

### Lỗi: nginx `SSL certificate not found`

```bash
ls -la ~/LandingPage/deploy/certs/
# Nếu thư mục rỗng → chạy lại Bước 4
```

---

### Lỗi: `502 Bad Gateway`

Frontend hoặc backend chưa khởi động xong:

```bash
docker compose -f docker-compose.production.yml logs --tail=30 frontend
docker compose -f docker-compose.production.yml logs --tail=30 backend
```

Chờ thêm 1–2 phút rồi thử lại.

---

### Lỗi: port 80 đã bị dùng

```bash
ss -tlnp | grep :80
# Dừng service đang dùng port 80 (ví dụ: httpd/apache)
sudo systemctl stop httpd
sudo systemctl disable httpd
```

---

## Auto-renew SSL

acme.sh tự thêm cronjob renew mỗi 60 ngày. Kiểm tra:

```bash
crontab -l | grep acme
# Phải thấy dòng cron của acme.sh
```

---

## Lệnh quản lý thường dùng

```bash
cd ~/LandingPage

# Xem trạng thái tất cả containers
docker compose -f docker-compose.production.yml ps

# Xem log realtime
docker compose -f docker-compose.production.yml logs -f frontend
docker compose -f docker-compose.production.yml logs -f nginx

# Khởi động lại 1 service
docker compose -f docker-compose.production.yml restart frontend

# Dừng tất cả
docker compose -f docker-compose.production.yml down

# Khởi động lại tất cả (giữ nguyên data volumes)
docker compose -f docker-compose.production.yml up -d
```

---

## Checklist hoàn thành

- [ ] DNS A record `benhub.vn` → `123.31.17.67` đã propagate
- [ ] DNS A record `www.benhub.vn` → `123.31.17.67` đã propagate
- [ ] Firewall mở port 80 và 443
- [ ] File `.env` đã điền đầy đủ (không còn `CHANGE_ME`)
- [ ] SSL cert đã có trong `deploy/certs/` (3 file .pem)
- [ ] `benhub_nginx` đang chạy và expose `:80` `:443`
- [ ] `https://benhub.vn` mở được trên trình duyệt
- [ ] `https://www.benhub.vn` redirect về `https://benhub.vn`
- [ ] API `https://benhub.vn/api-backend/api/v1` phản hồi JSON
