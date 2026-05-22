# BenHub — VPS Deploy Checklist

## Yêu cầu tối thiểu VPS
| | Yêu cầu |
|---|---|
| RAM | ≥ 2 GB (4 GB khuyến nghị) |
| CPU | ≥ 2 vCPU |
| Disk | ≥ 20 GB SSD |
| OS | Ubuntu 22.04 LTS |
| Port | 80, 443 mở |

---

## Bước 1 — Cài đặt VPS

```bash
# Docker
curl -fsSL https://get.docker.com | sh
usermod -aG docker $USER && newgrp docker

# SSL (certbot)
apt install certbot -y
certbot certonly --standalone -d benhub.vn -d www.benhub.vn
```

---

## Bước 2 — Clone và cấu hình

```bash
git clone <repo-url> /opt/benhub
cd /opt/benhub

# Tạo .env từ template
cp deploy/.env.production.example .env
nano .env   # Điền các giá trị thật (xem bên dưới)
```

### Các giá trị BẮT BUỘC thay đổi trong `.env`:

| Biến | Lý do | Cách tạo |
|---|---|---|
| `APP_URL` | Domain thật | `https://benhub.vn` |
| `POSTGRES_PASSWORD` | Bảo mật DB | `openssl rand -hex 16` |
| `REDIS_PASSWORD` | Bảo mật cache | `openssl rand -hex 16` |
| `JWT_SECRET` | Ký JWT tokens | `openssl rand -hex 64` |
| `JWT_REFRESH_SECRET` | Ký refresh tokens | `openssl rand -hex 64` |
| `AUTH_SECRET` | Ký NextAuth sessions | `openssl rand -base64 32` |

---

## Bước 3 — SSL Certificates

```bash
mkdir -p /opt/benhub/deploy/certs
cp /etc/letsencrypt/live/benhub.vn/fullchain.pem /opt/benhub/deploy/certs/
cp /etc/letsencrypt/live/benhub.vn/privkey.pem   /opt/benhub/deploy/certs/
chmod 600 /opt/benhub/deploy/certs/*.pem
```

---

## Bước 4 — Deploy

```bash
cd /opt/benhub
bash deploy/deploy.sh
```

---

## Bước 5 — Kiểm tra sau deploy

```bash
# Trạng thái containers
docker compose -f docker-compose.production.yml ps

# Logs
docker compose -f docker-compose.production.yml logs -f backend
docker compose -f docker-compose.production.yml logs -f frontend

# Health check
curl https://benhub.vn              # Frontend
curl https://benhub.vn/api-backend/api/v1/posts  # Backend API
```

---

## Cập nhật code (sau deploy đầu)

```bash
cd /opt/benhub
git pull origin main
docker compose -f docker-compose.production.yml build backend frontend
docker compose -f docker-compose.production.yml up -d backend frontend
```

---

## Lưu ý quan trọng

### ⚠️ Upload ảnh
- Ảnh upload lưu trong backend container: volume `uploads_data` → `/app/uploads`
- URL hiển thị: `https://benhub.vn/uploads/<filename>.png`
- **VPS dùng aaPanel (không có container `benhub_nginx`):** bắt buộc dán block `location /uploads/` từ `deploy/nginx-aapanel.conf` vào config site `benhub.vn`, rồi `nginx -t && nginx -s reload`
- Chạy stack: `docker compose -f docker-compose.production.yml -f docker-compose.aapanel.yml up -d` (expose `127.0.0.1:4000` cho nginx host)
- Kiểm tra trên VPS:
  ```bash
  curl -I http://127.0.0.1:4000/uploads/<filename>.png   # phải 200
  curl -I https://benhub.vn/uploads/<filename>.png        # phải 200 sau khi sửa nginx
  ```
- **KHÔNG** bị mất khi restart/redeploy
- Backup định kỳ: `docker run --rm -v benhub_uploads_data:/data -v $(pwd):/backup alpine tar czf /backup/uploads-$(date +%Y%m%d).tar.gz /data`

### ⚠️ Swagger API docs
- Hiện tại Swagger expose tại `/api/docs` — cần bảo vệ bằng basic auth hoặc chặn trong Nginx production
- Thêm vào nginx.conf: `location /api-backend/api/docs { deny all; }`

### ⚠️ Database backup
```bash
docker compose -f docker-compose.production.yml exec postgres \
  pg_dump -U benhub benhub > backup-$(date +%Y%m%d).sql
```

### ⚠️ Renew SSL (tự động với cron)
```bash
echo "0 3 * * 0 certbot renew --quiet && cp /etc/letsencrypt/live/benhub.vn/*.pem /opt/benhub/deploy/certs/ && docker restart benhub_nginx" | crontab -
```
