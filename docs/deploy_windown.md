# Hướng dẫn Deploy BenHub lên VPS Windows Server

> Tài liệu này dành cho người **chưa từng deploy** dự án lên VPS Windows.
> Đọc hết một lượt trước khi bắt tay thực hiện.

> Áp dụng cho VPS thuê chạy **Windows Server 2019** hoặc **2022** (Standard/Datacenter).
> **Docker Desktop không được hỗ trợ chính thức trên Windows Server** (chỉ hỗ trợ Windows 10/11) — nên lộ trình dưới đây cài **Docker Engine bên trong WSL2 (Ubuntu 22.04)**, y hệt cách Docker chạy trên một VPS Linux thật. Images của dự án (`node:22-alpine`) là Linux container nên **bắt buộc** phải chạy qua WSL2, không dùng được Windows Containers.
>
> Nếu VPS của bạn là **CentOS/Linux** thay vì Windows, xem [`docs/deploy_vps.md`](./deploy_vps.md) — nội dung tương đương nhưng chạy trực tiếp trên hệ điều hành Linux, không cần WSL2.

---

## Mục lục

1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Kết nối vào Windows Server](#2-kết-nối-vào-windows-server)
3. [Bật WSL2](#3-bật-wsl2)
4. [Cài Ubuntu 22.04 vào WSL2 (không cần Microsoft Store)](#4-cài-ubuntu-2204-vào-wsl2-không-cần-microsoft-store)
5. [Bật systemd trong WSL2](#5-bật-systemd-trong-wsl2)
6. [Cài Docker Engine trong WSL2](#6-cài-docker-engine-trong-wsl2)
7. [Clone dự án, tạo `.env`, cài SSL](#7-clone-dự-án-tạo-env-cài-ssl)
8. [Chạy deploy](#8-chạy-deploy)
9. [Port-forward Windows ↔ WSL2 (bắt buộc)](#9-port-forward-windows--wsl2-bắt-buộc)
10. [Windows Firewall](#10-windows-firewall)
11. [Tự khởi động khi Windows Server reboot](#11-tự-khởi-động-khi-windows-server-reboot)
12. [Backup định kỳ](#12-backup-định-kỳ)
13. [Quy trình cập nhật code sau này](#13-quy-trình-cập-nhật-code-sau-này)
14. [Xử lý sự cố thường gặp](#14-xử-lý-sự-cố-thường-gặp)
15. [Checklist Windows Server](#15-checklist-windows-server)

---

## 1. Yêu cầu hệ thống

| Thành phần | Tối thiểu | Khuyến nghị |
|------------|-----------|-------------|
| RAM | 4 GB | 8 GB (WSL2 + Docker ăn RAM hơn Linux thuần) |
| CPU | 2 vCPU | 4 vCPU |
| Disk | 40 GB SSD | 60 GB SSD |
| OS | Windows Server 2019 (build ≥ 1809) / 2022 | Windows Server 2022 |
| Ảo hoá | Nested virtualization **phải bật** ở phía nhà cung cấp VPS cho WSL2 chạy | — |
| Port | RDP 3389, HTTP 80, HTTPS 443 mở | — |

> **Quan trọng:** WSL2 dùng Hyper-V bên dưới. Nếu VPS là máy ảo (hầu hết VPS Windows đều vậy), nhà cung cấp phải bật **nested virtualization** cho gói VPS của bạn, nếu không `wsl --set-default-version 2` sẽ báo lỗi. Hỏi trước nhà cung cấp nếu không chắc.

### Tên miền

Domain (ví dụ `benhub.vn`) phải trỏ **A record** về IP VPS trước khi làm bước SSL. Kiểm tra:

```bash
nslookup benhub.vn
```

Kết quả phải trả về đúng IP của VPS.

---

## 2. Kết nối vào Windows Server

Dùng **Remote Desktop (RDP)** — không dùng SSH như CentOS:

1. Trên máy cá nhân, mở **Remote Desktop Connection** (Windows) hoặc **Microsoft Remote Desktop** (macOS).
2. Nhập IP VPS, đăng nhập bằng user `Administrator` và password được cấp.
3. Mở **PowerShell as Administrator** trên VPS — mọi lệnh ở tài liệu này chạy trong PowerShell trừ khi ghi rõ là chạy trong WSL/bash.

> Muốn thao tác qua terminal SSH quen thuộc thay vì RDP: cài **OpenSSH Server** (tính năng có sẵn trong Windows Server):
> ```powershell
> Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
> Start-Service sshd
> Set-Service -Name sshd -StartupType Automatic
> New-NetFirewallRule -Name sshd -DisplayName "OpenSSH Server" -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
> ```
> Sau đó `ssh Administrator@<IP_VPS>` từ máy cá nhân, vào PowerShell y như RDP.

---

## 3. Bật WSL2

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

> Nếu lệnh `wsl --set-default-version 2` báo lỗi liên quan đến ảo hoá (`WSL_E_HYPERV_NOT_SUPPORTED` hoặc tương tự) — nhà cung cấp VPS chưa bật nested virtualization. Liên hệ họ, xem lại lưu ý ở [mục 1](#1-yêu-cầu-hệ-thống).

---

## 4. Cài Ubuntu 22.04 vào WSL2 (không cần Microsoft Store)

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

## 5. Bật systemd trong WSL2

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

> Từ đây, mọi lệnh bash ở các mục 6–14 chạy **bên trong WSL2** (`wsl -d Ubuntu-22.04`), và về cơ bản **giống hệt Ubuntu/Debian thật** — dùng `apt`, không cần SELinux.

---

## 6. Cài Docker Engine trong WSL2

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

# 4. Bật Docker qua systemd (chạy được vì đã bật systemd ở mục 5)
sudo systemctl enable --now docker

# 5. Dùng Docker không cần sudo
sudo usermod -aG docker $USER
newgrp docker

# 6. Kiểm tra
docker --version
docker compose version
```

Kết quả mong đợi:
```
Docker version 26.x.x, build ...
Docker Compose version v2.x.x
```

---

## 7. Clone dự án, tạo `.env`, cài SSL

Vẫn trong bash (WSL2). **Clone vào filesystem của Linux (`~/benhub`), không clone vào `/mnt/c/...`** — I/O qua ranh giới Windows↔WSL rất chậm, sẽ làm `docker build` chậm gấp nhiều lần:

```bash
mkdir -p ~/benhub
cd ~/benhub
git clone https://github.com/tdgiang/Benhub.git .
ls
```

### 7.1 Tạo file `.env`

File `.env` chứa **tất cả mật khẩu và secret** — không bao giờ commit file này lên Git.

```bash
cd ~/benhub
nano .env
```

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

Tạo các secret ngẫu nhiên, sao chép kết quả vào file `.env`:

```bash
echo "POSTGRES_PASSWORD:" && openssl rand -hex 16
echo "REDIS_PASSWORD:"    && openssl rand -hex 16
echo "JWT_SECRET:"        && openssl rand -hex 64
echo "JWT_REFRESH_SECRET:"&& openssl rand -hex 64
echo "AUTH_SECRET:"       && openssl rand -base64 32
```

Ví dụ file `.env` đã điền:

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

Phân quyền file `.env`:

```bash
chmod 600 ~/benhub/.env
```

### 7.2 Cài SSL (Let's Encrypt)

> Port 80 cần mở **trên Windows Firewall** (không phải `firewall-cmd` của CentOS) để certbot xin chứng chỉ thành công — làm [mục 10](#10-windows-firewall) trước khi chạy `certbot` bên dưới nếu Firewall chưa mở port 80.

```bash
sudo apt install -y certbot

sudo certbot certonly --standalone \
  -d benhub.vn -d www.benhub.vn \
  --email admin@benhub.vn --agree-tos --non-interactive
```

Nếu thành công sẽ thấy:
```
Congratulations! Your certificate and chain have been saved at:
/etc/letsencrypt/live/benhub.vn/fullchain.pem
```

Copy chứng chỉ vào thư mục dự án:

```bash
mkdir -p ~/benhub/deploy/certs
sudo cp /etc/letsencrypt/live/benhub.vn/fullchain.pem ~/benhub/deploy/certs/
sudo cp /etc/letsencrypt/live/benhub.vn/privkey.pem   ~/benhub/deploy/certs/
sudo chown $USER:$USER ~/benhub/deploy/certs/*.pem
chmod 600 ~/benhub/deploy/certs/*.pem

# Kiểm tra
ls -la ~/benhub/deploy/certs/
```

---

## 8. Chạy deploy

Vẫn trong bash (WSL2):

```bash
cd ~/benhub
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

Theo dõi log real-time:

```bash
docker compose -f docker-compose.production.yml logs -f
```

Kiểm tra containers **bên trong WSL** trước:

```bash
curl -I http://localhost:443 --insecure
docker compose -f docker-compose.production.yml ps
```

Nếu 2 lệnh trên OK nhưng `https://benhub.vn` chưa vào được từ bên ngoài — bình thường, còn thiếu bước **9** (port-forward Windows ra ngoài).

---

## 9. Port-forward Windows ↔ WSL2 (bắt buộc)

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

> **IP của WSL2 đổi mỗi lần Windows Server reboot** → rule portproxy ở trên sẽ trỏ sai IP sau khi restart nếu không làm lại. Giải quyết dứt điểm ở [mục 11](#11-tự-khởi-động-khi-windows-server-reboot) bằng script tự refresh khi khởi động.

### 9.3 Kiểm tra từ máy cá nhân

```bash
curl -I https://benhub.vn
```

Nếu vẫn không vào được, kiểm tra tiếp [mục 10](#10-windows-firewall).

---

## 10. Windows Firewall

Thay cho `firewall-cmd` của CentOS. Chạy trong **PowerShell (Administrator)**:

```powershell
New-NetFirewallRule -DisplayName "HTTP"  -Direction Inbound -Protocol TCP -LocalPort 80  -Action Allow
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow

# Kiểm tra
Get-NetFirewallRule -DisplayName "HTTP","HTTPS" | Select-Object DisplayName, Enabled, Direction, Action
```

> **Cảnh báo:** không tắt/xoá rule cho port RDP (3389) hoặc SSH (22 nếu đã bật ở mục 2) — sẽ mất quyền truy cập VPS và phải nhờ nhà cung cấp can thiệp qua console riêng.

---

## 11. Tự khởi động khi Windows Server reboot

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
# Task 1 — khởi động WSL2 distro (dockerd tự chạy nhờ systemd đã bật ở mục 5)
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

## 12. Backup định kỳ

Chạy trong bash (WSL2) — vì systemd đã bật ở mục 5, `cron` hoạt động bình thường như Linux thật.

### 12.1 Tạo thư mục backup

```bash
mkdir -p ~/benhub/backups
```

### 12.2 Backup database thủ công

```bash
cd ~/benhub

docker compose -f docker-compose.production.yml exec -T postgres \
  pg_dump -U benhub benhub \
  > backups/db-$(date +%Y%m%d-%H%M%S).sql

echo "Backup xong: backups/db-$(date +%Y%m%d).sql"
```

### 12.3 Backup ảnh upload thủ công

```bash
docker run --rm \
  -v benhub_uploads_data:/data \
  -v ~/benhub/backups:/backup \
  alpine \
  tar czf /backup/uploads-$(date +%Y%m%d).tar.gz -C /data .

echo "Backup uploads xong"
```

### 12.4 Tự động backup hàng ngày (cron)

```bash
sudo apt install -y cron
sudo systemctl enable --now cron
crontab -e
```

Thêm vào:

```cron
# Backup DB lúc 2:00 sáng, giữ 7 ngày gần nhất
0 2 * * * cd ~/benhub && docker compose -f docker-compose.production.yml exec -T postgres pg_dump -U benhub benhub > ~/benhub/backups/db-$(date +\%Y\%m\%d).sql 2>/dev/null && find ~/benhub/backups -name "db-*.sql" -mtime +7 -delete
```

### 12.5 Gia hạn SSL tự động

```bash
crontab -e
```

Thêm vào:

```cron
# Gia hạn SSL mỗi Chủ nhật lúc 3:00 sáng
0 3 * * 0 certbot renew --quiet && cp /etc/letsencrypt/live/benhub.vn/fullchain.pem ~/benhub/deploy/certs/ && cp /etc/letsencrypt/live/benhub.vn/privkey.pem ~/benhub/deploy/certs/ && cd ~/benhub && docker compose -f docker-compose.production.yml restart nginx
```

Kiểm tra certbot renew hoạt động (dry-run — không thực sự gia hạn):

```bash
sudo certbot renew --dry-run
```

---

## 13. Quy trình cập nhật code sau này

Sau khi deploy lần đầu thành công, mỗi khi có code mới — chạy trong bash (WSL2), thư mục `~/benhub`:

```bash
cd ~/benhub

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

## 14. Xử lý sự cố thường gặp

### `https://benhub.vn` không vào được nhưng container chạy bình thường trong WSL

```powershell
# 1. Kiểm tra WSL2 có đang chạy không
wsl -l -v

# 2. Kiểm tra port-forward còn trỏ đúng IP không (IP đổi sau mỗi lần WSL2 restart)
netsh interface portproxy show v4tov4
wsl -d Ubuntu-22.04 -- hostname -I
```

Nếu IP lệch nhau, chạy lại script refresh:

```powershell
powershell -ExecutionPolicy Bypass -File C:\WSL\refresh-portproxy.ps1
```

### WSL2 báo lỗi liên quan Hyper-V / ảo hoá khi khởi động

Nested virtualization chưa bật ở tầng hypervisor của nhà cung cấp VPS — xem lại [mục 1](#1-yêu-cầu-hệ-thống), liên hệ nhà cung cấp.

### Docker build rất chậm (>15 phút cho lần đầu)

Repo đang nằm ở `/mnt/c/...` thay vì filesystem Linux của WSL2. Clone lại vào `~/benhub` (xem [mục 7](#7-clone-dự-án-tạo-env-cài-ssl)).

### Sau khi Windows Update / reboot, mất kết nối tới website

Windows Update đôi khi reset Scheduled Task hoặc rule portproxy. Chạy lại 2 lệnh kiểm tra ở mục "container chạy bình thường trong WSL" phía trên; nếu Task Scheduler bị vô hiệu hoá, chạy lại toàn bộ [mục 11.2](#11-tự-khởi-động-khi-windows-server-reboot).

### Website không truy cập được (kiểm tra chung, trong WSL)

```bash
# Kiểm tra containers
docker compose -f docker-compose.production.yml ps

# Xem log nginx
docker compose -f docker-compose.production.yml logs nginx --tail=30

# Kiểm tra cert còn hạn không
openssl x509 -enddate -noout -in ~/benhub/deploy/certs/fullchain.pem
```

### Backend lỗi 500 / không kết nối được DB

```bash
# Xem log backend
docker compose -f docker-compose.production.yml logs backend --tail=100

# Kiểm tra PostgreSQL healthy
docker compose -f docker-compose.production.yml exec postgres pg_isready -U benhub

# Kiểm tra biến DATABASE_URL trong .env
grep DATABASE_URL ~/benhub/.env
```

### Frontend không hiển thị đúng

```bash
docker compose -f docker-compose.production.yml logs frontend --tail=100
```

### Docker daemon không khởi động sau khi reboot

```bash
# Kiểm tra trạng thái
sudo systemctl status docker

# Khởi động lại
sudo systemctl start docker
sudo systemctl enable docker

# Khởi động lại toàn bộ stack
cd ~/benhub
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
find ~/benhub/backups -mtime +30 -delete
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
  pg_dump -U benhub benhub > ~/benhub/backups/emergency-$(date +%Y%m%d).sql

# Dừng và xoá toàn bộ
docker compose -f docker-compose.production.yml down -v

# Deploy lại từ đầu
bash deploy/deploy.sh
```

---

## 15. Checklist Windows Server

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
