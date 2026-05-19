# Test website qua địa chỉ IP (trước khi trỏ domain)

**VPS IP:** `123.31.17.67`  
**Mục đích:** Kiểm tra toàn bộ stack hoạt động trước khi trỏ DNS

---

## Tại sao cần bước này?

DNS propagate mất 5–30 phút (đôi khi vài giờ). Bằng cách test qua IP trước, bạn đảm bảo:
- Website render đúng
- API backend phản hồi
- Nginx proxy hoạt động
- Không mất thời gian debug sau khi domain đã trỏ

---

## Sơ đồ luồng khi test qua IP

```
Trình duyệt
  │
  ▼
http://123.31.17.67   (port 80, HTTP — không cần SSL)
  │
  ▼
nginx container  (dùng nginx-http.conf thay vì nginx.conf)
  │
  ├── /api-backend/  →  benhub_backend  :4000
  └── /             →  benhub_frontend :3000
```

---

## Bước 1 — Mở port 80 trên firewall CentOS

SSH vào VPS:

```bash
ssh root@123.31.17.67
```

Mở port 80:

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --reload

# Kiểm tra
sudo firewall-cmd --list-services
# Phải thấy: http
```

---

## Bước 2 — Cập nhật `.env` để dùng IP thay domain

```bash
cd ~/LandingPage
nano .env
```

Thay đổi dòng `APP_URL`:

```env
# ── Đổi từ domain sang IP ──
APP_URL=http://123.31.17.67

# ── Giữ nguyên các dòng còn lại ──
POSTGRES_DB=benhub
POSTGRES_USER=benhub
POSTGRES_PASSWORD=...
REDIS_PASSWORD=...
JWT_SECRET=...
JWT_REFRESH_SECRET=...
AUTH_SECRET=...
```

> **Lưu ý:** `NEXT_PUBLIC_API_URL` được nhúng vào code lúc `docker build`, nên khi đổi `APP_URL` cần **rebuild lại frontend**.

---

## Bước 3 — Rebuild frontend với IP mới

```bash
cd ~/LandingPage

# Rebuild frontend (mất 2–5 phút)
docker compose -f docker-compose.production.yml up -d --build frontend

# Theo dõi quá trình build
docker compose -f docker-compose.production.yml logs -f frontend
# Ctrl+C khi thấy "Ready" hoặc "started on port 3000"
```

---

## Bước 4 — Khởi động nginx với config HTTP-only

File `deploy/nginx-http.conf` đã có sẵn trong project (không cần SSL cert).

```bash
cd ~/LandingPage

# Dừng nginx cũ nếu đang chạy
docker compose -f docker-compose.production.yml stop nginx

# Khởi động nginx với config HTTP
docker run -d \
  --name benhub_nginx_test \
  --network benhub_web \
  --network benhub_internal \
  -p 80:80 \
  -v $(pwd)/deploy/nginx-http.conf:/etc/nginx/conf.d/default.conf:ro \
  --restart unless-stopped \
  nginx:alpine

# Kiểm tra
docker ps | grep nginx
```

---

## Bước 5 — Kiểm tra hoạt động

### Test từ VPS (terminal)

```bash
# Frontend phải trả về HTML
curl -I http://123.31.17.67
# Phải thấy: HTTP/1.1 200 OK

# API backend
curl http://123.31.17.67/api-backend/api/v1
# Phải thấy: JSON {"success":true,...}

# Swagger docs
curl -I http://123.31.17.67/api-backend/api/docs
# Phải thấy: HTTP/1.1 200 OK
```

### Test từ trình duyệt (máy local)

Mở trình duyệt → nhập thẳng IP:

| URL | Kỳ vọng |
|-----|---------|
| `http://123.31.17.67` | Landing page hiển thị đầy đủ |
| `http://123.31.17.67/ve-chung-toi` | Trang Về chúng tôi |
| `http://123.31.17.67/tin-tuc` | Trang Tin tức |
| `http://123.31.17.67/api-backend/api/docs` | Swagger UI |

---

## Xử lý lỗi

### Lỗi: `curl: (7) Failed to connect`

Port 80 chưa mở hoặc nginx chưa chạy:

```bash
# Kiểm tra nginx
docker ps | grep nginx

# Kiểm tra port
ss -tlnp | grep :80

# Kiểm tra firewall
sudo firewall-cmd --list-services
```

---

### Lỗi: `502 Bad Gateway`

Frontend chưa khởi động xong:

```bash
docker logs benhub_frontend --tail=20
# Chờ thêm 1 phút rồi thử lại
```

---

### Trang trắng hoặc lỗi API call

`NEXT_PUBLIC_API_URL` vẫn trỏ về domain cũ → chưa rebuild frontend:

```bash
# Kiểm tra env đang dùng
docker inspect benhub_frontend | grep -A2 "NEXT_PUBLIC_API_URL"

# Rebuild lại
docker compose -f docker-compose.production.yml up -d --build frontend
```

---

## Bước 6 — Dọn dẹp sau khi test xong

Sau khi domain đã trỏ và test qua HTTPS thành công, xóa nginx test:

```bash
# Dừng và xóa nginx test
docker stop benhub_nginx_test
docker rm benhub_nginx_test

# Đổi lại APP_URL về domain thật
nano ~/LandingPage/.env
# APP_URL=https://benhub.vn

# Rebuild frontend với domain
docker compose -f docker-compose.production.yml up -d --build frontend

# Khởi động nginx production (có SSL)
docker compose -f docker-compose.production.yml up -d nginx
```

---

## Tóm tắt nhanh (copy-paste)

```bash
# 1. Mở firewall
sudo firewall-cmd --permanent --add-service=http && sudo firewall-cmd --reload

# 2. Đổi APP_URL về IP trong .env
sed -i 's|APP_URL=.*|APP_URL=http://123.31.17.67|' ~/LandingPage/.env

# 3. Rebuild frontend
cd ~/LandingPage && docker compose -f docker-compose.production.yml up -d --build frontend

# 4. Chạy nginx test
docker run -d --name benhub_nginx_test \
  --network benhub_web --network benhub_internal \
  -p 80:80 \
  -v $(pwd)/deploy/nginx-http.conf:/etc/nginx/conf.d/default.conf:ro \
  nginx:alpine

# 5. Test
curl -I http://123.31.17.67
```
