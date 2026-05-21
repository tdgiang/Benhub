# PRD — BenHub Landing Page

**Product Requirements Document**
**Version:** 1.0
**Ngày tạo:** 14/05/2026
**Author:** BA Team
**Status:** Draft

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1 Mục đích tài liệu

Tài liệu này mô tả toàn bộ yêu cầu sản phẩm cho dự án xây dựng Landing Page giới thiệu công ty BenHub Việt Nam — nền tảng logistics công trình và vận tải san lấp hàng đầu Việt Nam.

### 1.2 Bối cảnh

BenHub đang ở giai đoạn 1 (2025–2026): xây dựng nền tảng và mở rộng mạng lưới đội xe. Landing page là công cụ marketing và acquisition quan trọng để:

- Giới thiệu hệ sinh thái BenHub đến thị trường
- Thu hút các nhóm đối tượng tham gia hệ sinh thái
- Tạo uy tín thương hiệu với nhà đầu tư và đối tác doanh nghiệp

### 1.3 Phạm vi

**Trong phạm vi (In-scope):**

- 1 landing page đa phân khúc (multi-segment)
- Form đăng ký tham gia hệ sinh thái (tích hợp NestJS backend)
- Responsive design (Desktop + Mobile)
- Brand identity đề xuất mới

**Ngoài phạm vi (Out-of-scope):**

- Trang admin quản lý lead
- Tích hợp CRM/Email marketing (giai đoạn 2)
- Đa ngôn ngữ (giai đoạn 2)
- Blog / SEO content pages

---

## 2. MỤC TIÊU SẢN PHẨM

### 2.1 Business Goals

| #   | Mục tiêu                                          | Chỉ số đo lường                       |
| --- | ------------------------------------------------- | ------------------------------------- |
| G1  | Tăng nhận diện thương hiệu BenHub                 | Page views, Time on page              |
| G2  | Thu hút đội xe và tài xế đăng ký                  | Số form submission / tháng            |
| G3  | Tạo uy tín với nhà đầu tư & đối tác               | Bounce rate < 50%, Scroll depth > 60% |
| G4  | Hỗ trợ sales team tiếp cận chủ đầu tư / tổng thầu | Demo request conversion rate          |

### 2.2 Primary Conversion Goal

> **Đăng ký tham gia hệ sinh thái BenHub** (đội xe, tài xế, đối tác địa phương)

### 2.3 Secondary Conversion Goals

- Yêu cầu tư vấn / demo (cho nhóm chủ đầu tư, tổng thầu)
- Liên hệ hợp tác đối tác chiến lược (nhà đầu tư, tổ chức tài chính)

---

## 3. ĐỐI TƯỢNG NGƯỜI DÙNG (User Personas)

### Persona 1 — Chủ Đội Xe / Fleet Owner

- **Mô tả:** Sở hữu 5–50 xe ben, đang tìm cách có việc đều và quản lý hiệu quả hơn
- **Pain points:** Thiếu cuốc xe ổn định, quản lý thủ công, phụ thuộc "cò vận tải", dòng tiền bấp bênh
- **Mong muốn:** Việc đều, thu nhập ổn định, quản lý đội xe qua app, thanh toán minh bạch
- **CTA phù hợp:** "Đăng ký đội xe tham gia BenHub"

### Persona 2 — Tài Xế Xe Ben

- **Mô tả:** Tài xế độc lập hoặc thuộc đội xe tư nhân
- **Pain points:** Cuốc xe bấp bênh, mất phiếu giấy, thanh toán chậm, phụ thuộc mối quan hệ
- **Mong muốn:** Cuốc xe ổn định, thu nhập rõ ràng, ứng tiền nhanh
- **CTA phù hợp:** "Đăng ký lái xe với BenHub"

### Persona 3 — Chủ Đầu Tư / Tổng Thầu Xây Dựng

- **Mô tả:** Quản lý dự án hạ tầng, đang đau đầu với thất thoát vật liệu và điều phối vận tải
- **Pain points:** Thất thoát 5–20% vật liệu, không có dashboard realtime, đối soát mất 1–2 tuần
- **Mong muốn:** Kiểm soát tiến độ, giảm thất thoát, báo cáo tự động
- **CTA phù hợp:** "Yêu cầu demo miễn phí"

### Persona 4 — Nhà Đầu Tư / Quỹ VC

- **Mô tả:** Tìm kiếm cơ hội đầu tư vào tech startup ngành logistics / construction
- **Pain points:** Thiếu thông tin thị trường, cần hiểu mô hình kinh doanh và scalability
- **Mong muốn:** Hiểu rõ market size, competitive moat, roadmap, đội ngũ
- **CTA phù hợp:** "Tải Pitch Deck / Liên hệ đội ngũ"

---

## 4. KIẾN TRÚC THÔNG TIN (Information Architecture)

### 4.1 Cấu trúc trang — 10 Sections

```
[S1] HERO
[S2] PROBLEM — Bài toán ngành
[S3] SOLUTION — BenHub giải quyết như thế nào
[S4] PRODUCTS — Hệ thống 8 sản phẩm
[S5] MARKET OPPORTUNITY — Quy mô thị trường
[S6] HOW IT WORKS — Flow vận hành
[S7] ECOSYSTEM — Mô hình hệ sinh thái
[S8] ROADMAP — Lộ trình 2025–2035
[S9] REGISTER — Form đăng ký
[S10] FOOTER — Liên hệ + Legal
```

### 4.2 Navigation

- Sticky top navbar với logo + menu anchor links
- CTA button cố định trên navbar: "Đăng ký ngay"
- Mobile: Hamburger menu

---

## 5. YÊU CẦU CHỨC NĂNG CHI TIẾT

### S1 — HERO SECTION

**Mục tiêu:** Truyền tải định vị thương hiệu, tạo ấn tượng mạnh trong 3 giây đầu

| Element       | Nội dung                                                                                                                 | Ghi chú                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| Headline      | "Hệ Điều Hành Số Cho Ngành Vận Tải Công Trình"                                                                           | H1, bold, nổi bật        |
| Sub-headline  | "BenHub số hóa toàn bộ chuỗi logistics xây dựng — từ điều phối vận tải, quản lý đội xe đến đối soát tài chính realtime." | 1–2 dòng                 |
| Primary CTA   | "Đăng ký tham gia hệ sinh thái"                                                                                          | Scroll đến S9            |
| Secondary CTA | "Tìm hiểu thêm"                                                                                                          | Scroll xuống             |
| Background    | Animation: GPS route / xe ben đang chạy trên bản đồ                                                                      | Looping subtle animation |
| Social proof  | "5,000+ xe đã tham gia • 10+ dự án đang vận hành"                                                                        | Dạng badge/counter       |

---

### S2 — PROBLEM SECTION

**Mục tiêu:** Gây đồng cảm với pain points, khiến persona nhận ra vấn đề của mình

**Layout:** 5 card pain points, mỗi card gồm icon + tiêu đề + mô tả ngắn + số liệu

| Pain Point          | Tiêu đề Card                      | Số liệu nổi bật                               |
| ------------------- | --------------------------------- | --------------------------------------------- |
| Thất thoát vật liệu | "Thất thoát lên đến 20%"          | "1 dự án 100 tỷ → mất 10–20 tỷ đồng vật liệu" |
| Điều phối thủ công  | "Gọi điện, Zalo, Excel"           | "Không scale khi vượt 50 xe"                  |
| Phiếu giấy          | "Hàng triệu phiếu tay mỗi ngày"   | "Đối soát mất 1–2 tuần/tháng"                 |
| Công nợ kéo dài     | "Chuỗi công nợ 30–90 ngày"        | "Tài xế không có tiền dầu chạy xe"            |
| Mù dữ liệu          | "Không có dashboard, không có AI" | "Không biết xe ở đâu, tiến độ thực ra sao"    |

---

### S3 — SOLUTION SECTION

**Mục tiêu:** Giới thiệu BenHub như giải pháp toàn diện, không chỉ là app đơn lẻ

**Layout:** Trước (Before) vs Sau (After) — 2 cột so sánh

| Trước BenHub             | Sau BenHub                      |
| ------------------------ | ------------------------------- |
| Phiếu giấy dễ gian lận   | E-Ticket số hóa, GPS proof      |
| Điều phối qua điện thoại | Smart Dispatch AI tự động       |
| Không biết xe ở đâu      | Realtime GPS Tracking           |
| Đối soát mất 2 tuần      | Realtime Reconciliation tự động |
| Dòng tiền kẹt 90 ngày    | BenHub Finance ứng tiền nhanh   |

**Tagline cuối section:** _"BenHub — Hệ điều hành số cho ngành vận tải công trình."_

---

### S4 — PRODUCTS SECTION

**Mục tiêu:** Giới thiệu 8 sản phẩm trong hệ sinh thái

**Layout:** Grid 4x2, mỗi card gồm icon + tên + mô tả 1 dòng

| Sản phẩm           | Icon gợi ý | Mô tả ngắn                                                  |
| ------------------ | ---------- | ----------------------------------------------------------- |
| BenHub Core        | 🏗️         | Trung tâm điều hành — Dashboard, Dispatch, Báo cáo realtime |
| BenHub Driver      | 📱         | App tài xế — Nhận chuyến, GPS, E-Ticket, Ví tiền            |
| BenHub Supervisor  | 👁️         | Giám sát công trường — Duyệt chuyến, kiểm GPS, kiểm tải     |
| BenHub Fleet       | 🚛         | Quản lý đội xe — Xe, tài xế, bảo dưỡng, chi phí             |
| BenHub Marketplace | 🔗         | Sàn kết nối — Matching, Bidding, Dynamic Pricing            |
| BenHub Finance     | 💳         | Tài chính vận tải — Factoring, Ứng tiền, Ví điện tử         |
| BenHub Materials   | ⛏️         | Sàn vật liệu — Kết nối mỏ, Báo giá, Logistics               |
| BenHub AI Labs     | 🤖         | AI logistics — Chống gian lận, Routing, Dự báo              |

---

### S5 — MARKET OPPORTUNITY SECTION

**Mục tiêu:** Thuyết phục nhà đầu tư và đối tác về quy mô cơ hội

**Layout:** 3 số liệu lớn (counter animation) + bản đồ Việt Nam với điểm dự án

| Metric                            | Con số             | Nguồn               |
| --------------------------------- | ------------------ | ------------------- |
| Quy mô Vận Tải công trình VN      | 60–80 tỷ USD/năm   | Bộ Xây dựng         |
| Xe ben tại Việt Nam               | 100,000+ xe        | Ước tính thị trường |
| Nhu cầu đất đắp cao tốc 2025–2030 | Hàng trăm triệu m³ | Bộ GTVT             |

**Callout box:** _"Ngành vận tải công trình: Quy mô cực lớn — Số hóa cực thấp. Đây là khoảng trống BenHub đang lấp đầy."_

---

### S6 — HOW IT WORKS SECTION

**Mục tiêu:** Giải thích flow vận hành cụ thể, dễ hiểu

**Layout:** Stepper / flow diagram — 5 bước

```
[1] Chủ đầu tư tạo lệnh vận chuyển
    ↓
[2] BenHub Smart Dispatch phân bổ xe tự động
    ↓
[3] Tài xế nhận chuyến qua app — GPS bật, E-Ticket tạo
    ↓
[4] Supervisor giám sát realtime — phát hiện lệch tuyến ngay lập tức
    ↓
[5] Chuyến hoàn thành — Đối soát & thanh toán tự động
```

---

### S7 — ECOSYSTEM / FOR YOU SECTION

**Mục tiêu:** Nói chuyện trực tiếp với từng persona — "BenHub dành cho bạn"

**Layout:** Tab selector — 4 tab tương ứng 4 persona

**Tab 1 — Chủ Đầu Tư / Tổng Thầu**

- Dashboard realtime giám sát toàn bộ đội xe
- Báo cáo khối lượng tự động
- Giảm thất thoát vật liệu xuống gần 0%
- CTA: "Yêu cầu demo"

**Tab 2 — Chủ Đội Xe**

- Có việc đều từ hệ sinh thái BenHub
- Quản lý toàn bộ đội xe trên 1 app
- Theo dõi doanh thu realtime
- CTA: "Đăng ký đội xe"

**Tab 3 — Tài Xế**

- Nhận cuốc xe ổn định hàng ngày
- E-Ticket thay phiếu giấy — không bao giờ mất phiếu
- Ứng tiền nhanh — không chờ cuối tháng
- CTA: "Đăng ký lái xe"

**Tab 4 — Nhà Đầu Tư / Đối Tác**

- Market size 60–80 tỷ USD, số hóa < 5%
- Mô hình asset-light, platform-first
- Roadmap rõ ràng đến 2035 và IPO
- CTA: "Tải Pitch Deck"

---

### S8 — ROADMAP SECTION

**Mục tiêu:** Thể hiện tầm nhìn dài hạn, tạo niềm tin về chiến lược

**Layout:** Timeline ngang — 3 giai đoạn

| Giai đoạn                         | Thời gian | Milestone chính                                         |
| --------------------------------- | --------- | ------------------------------------------------------- |
| Giai đoạn 1: Xây Nền Tảng         | 2025–2026 | 5,000+ xe • 10+ dự án • Hoàn thiện E-Ticket & GPS       |
| Giai đoạn 2: Mở Rộng Hệ Sinh Thái | 2026–2028 | 50,000+ xe • Marketplace • BenHub Finance • AI Dispatch |
| Giai đoạn 3: Hạ Tầng Quốc Gia     | 2028–2035 | Construction Logistics OS • ASEAN Expansion • IPO       |

---

### S9 — REGISTRATION FORM SECTION (Primary CTA)

**Mục tiêu:** Thu thập lead, phân loại theo nhóm đối tượng

**Layout:** Form 2 bước (Step form) để tăng completion rate

**Bước 1 — Chọn nhóm đối tượng:**

- 🚛 Tôi là Chủ Đội Xe
- 👤 Tôi là Tài Xế
- 🏗️ Tôi là Chủ Đầu Tư / Tổng Thầu
- 🤝 Tôi là Nhà Đầu Tư / Đối Tác

**Bước 2 — Điền thông tin (dynamic theo lựa chọn):**

| Field          | Chủ Đội Xe | Tài Xế | Chủ Đầu Tư | Nhà Đầu Tư |
| -------------- | ---------- | ------ | ---------- | ---------- |
| Họ và tên      | ✅         | ✅     | ✅         | ✅         |
| Số điện thoại  | ✅         | ✅     | ✅         | ✅         |
| Email          | ✅         | ❌     | ✅         | ✅         |
| Tỉnh/Thành phố | ✅         | ✅     | ✅         | ❌         |
| Số lượng xe    | ✅         | ❌     | ❌         | ❌         |
| Biển số xe     | ❌         | ✅     | ❌         | ❌         |
| Tên công ty    | ❌         | ❌     | ✅         | ✅         |
| Quy mô dự án   | ❌         | ❌     | ✅         | ❌         |

**Validation rules:**

- Số điện thoại: 10 số, bắt đầu bằng 0
- Email: format hợp lệ
- Họ tên: tối thiểu 2 ký tự, không chứa số
- Tất cả field required trừ note

**Submit behavior:**

- Hiện loading spinner khi gửi
- Success: Hiện message "Cảm ơn! Đội ngũ BenHub sẽ liên hệ trong vòng 24h"
- Error: Hiện thông báo lỗi cụ thể, không reset form

---

### S10 — FOOTER

| Cột 1                                  | Cột 2                           | Cột 3        | Cột 4      |
| -------------------------------------- | ------------------------------- | ------------ | ---------- |
| Logo + tagline                         | Sản phẩm (links)                | Công ty      | Liên hệ    |
|                                        | Core, Driver, Fleet, Finance... | Về chúng tôi | Hotline    |
|                                        |                                 | Tuyển dụng   | Email      |
|                                        |                                 | Tin tức      | Địa chỉ HN |
| Social icons: Facebook, LinkedIn, Zalo |                                 |              |            |
| Copyright © 2026 BenHub Việt Nam       |                                 |              |            |

---

## 6. YÊU CẦU KỸ THUẬT

### 6.1 Tech Stack

| Layer       | Technology                               |
| ----------- | ---------------------------------------- |
| Frontend    | Next.js 14 (App Router) + TypeScript     |
| Styling     | Tailwind CSS + shadcn/ui                 |
| Animation   | Framer Motion                            |
| Form State  | React Hook Form + Zod validation         |
| Backend API | NestJS (endpoint nhận form submission)   |
| Database    | PostgreSQL + Prisma (lưu lead)           |
| Deployment  | Vercel (frontend) + VPS/Railway (NestJS) |

### 6.2 API Specification — Form Submission

**Endpoint:** `POST /api/leads`

**Request Body:**

```json
{
  "segment": "fleet_owner | driver | investor | partner",
  "fullName": "string",
  "phone": "string",
  "email": "string | null",
  "province": "string | null",
  "fleetSize": "number | null",
  "licensePlate": "string | null",
  "companyName": "string | null",
  "projectScale": "string | null",
  "source": "landing_page",
  "createdAt": "ISO8601"
}
```

**Response Success (201):**

```json
{
  "success": true,
  "message": "Đăng ký thành công"
}
```

**Response Error (400/500):**

```json
{
  "success": false,
  "message": "string",
  "errors": []
}
```

### 6.3 Performance Requirements

| Metric                   | Target |
| ------------------------ | ------ |
| Lighthouse Performance   | ≥ 90   |
| First Contentful Paint   | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive      | < 3.5s |
| Mobile Lighthouse Score  | ≥ 85   |

### 6.4 SEO Requirements

- Meta title, description cho từng page
- Open Graph tags (cho share Facebook/Zalo)
- Sitemap.xml
- robots.txt
- Structured data (Organization schema)

### 6.5 Responsive Breakpoints

| Breakpoint | Width          |
| ---------- | -------------- |
| Mobile     | < 768px        |
| Tablet     | 768px – 1024px |
| Desktop    | > 1024px       |

---

## 7. BRAND IDENTITY ĐỀ XUẤT

> Lưu ý: BenHub chưa có brand guideline. Dưới đây là đề xuất của BA/Design team, cần được approve trước khi triển khai.

### 7.1 Color Palette

| Tên                 | Hex       | Sử dụng                           |
| ------------------- | --------- | --------------------------------- |
| BenHub Orange       | `#F97316` | Primary CTA, Accent, Highlight    |
| Construction Yellow | `#FBBF24` | Secondary accent, Icon background |
| Navy Dark           | `#0F172A` | Hero background, Text heading     |
| Steel Blue          | `#1E3A5F` | Section backgrounds               |
| Concrete Gray       | `#64748B` | Body text, Sub-heading            |
| White               | `#FFFFFF` | Card background, Light sections   |

**Rationale:** Cam/Vàng gợi lên hình ảnh công trường, máy móc — đáng tin cậy, năng động. Navy/Xanh đậm thể hiện công nghệ, chuyên nghiệp. Sự kết hợp này tránh generic, phù hợp với ngành Industrial-Tech.

### 7.2 Typography Đề Xuất

| Role                   | Font                  | Weight  |
| ---------------------- | --------------------- | ------- |
| Display / Hero Heading | **Barlow Condensed**  | 700–900 |
| Body Heading           | **Plus Jakarta Sans** | 600–700 |
| Body Text              | **Plus Jakarta Sans** | 400–500 |
| Số liệu lớn / Counter  | **Barlow Condensed**  | 800     |

### 7.3 Visual Language

- Industrial-Tech: góc cạnh, mạnh mẽ, không hoa mỹ
- Sử dụng iconography dạng line icon (Phosphor Icons)
- Background sections xen kẽ Dark (Navy) và Light (White/Gray)
- Ảnh thực tế: xe ben, công trường, dashboard mockup
- Data visualization: maps, GPS routes, progress bars

---

## 8. USER FLOW

```
User truy cập trang
    ↓
[Hero] Đọc tagline → Hiểu BenHub là gì
    ↓
[Problem] Nhận ra pain point của mình
    ↓
[Solution + Products] Hiểu BenHub giải quyết thế nào
    ↓
[For You — Tab] Chọn persona phù hợp → Đọc benefits
    ↓
[CTA click] Scroll đến form / Click button trên navbar
    ↓
[Form Step 1] Chọn nhóm đối tượng
    ↓
[Form Step 2] Điền thông tin phù hợp
    ↓
[Submit] → API NestJS → Lưu DB → Email xác nhận
    ↓
[Success Screen] "Cảm ơn! Đội ngũ sẽ liên hệ trong 24h"
```

---

## 9. ACCEPTANCE CRITERIA

### AC-01: Hero Section

- [ ] Hiển thị đúng headline và sub-headline
- [ ] Animation background hoạt động mượt, không ảnh hưởng performance
- [ ] 2 CTA button hoạt động đúng (scroll behavior)
- [ ] Responsive trên mobile

### AC-02: Form Submission

- [ ] Form validate realtime, hiện lỗi rõ ràng bằng tiếng Việt
- [ ] Step 1 → Step 2 chuyển mượt
- [ ] Dynamic fields hiển thị đúng theo segment đã chọn
- [ ] Submit gọi đúng API endpoint
- [ ] Hiện success/error message đúng
- [ ] Không reset form khi gặp lỗi server

### AC-03: Performance

- [ ] Lighthouse Performance ≥ 90 trên desktop
- [ ] Lighthouse Performance ≥ 85 trên mobile
- [ ] LCP < 2.5s

### AC-04: Cross-browser

- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Chrome / Safari

---

## 10. PHÂN RÃ CÔNG VIỆC & ƯỚC TÍNH

| Task                                    | Ưu tiên | Ước tính     | Ghi chú           |
| --------------------------------------- | ------- | ------------ | ----------------- |
| Brand identity + Design system setup    | P0      | 2 ngày       | Cần approve trước |
| Next.js project setup + Tailwind config | P0      | 0.5 ngày     |                   |
| NestJS lead API endpoint                | P0      | 1 ngày       |                   |
| Hero Section                            | P0      | 1 ngày       |                   |
| Problem + Solution Section              | P0      | 1 ngày       |                   |
| Registration Form (2 steps)             | P0      | 2 ngày       | Complex nhất      |
| Products Section                        | P1      | 1 ngày       |                   |
| Market Opportunity Section              | P1      | 0.5 ngày     |                   |
| How It Works Section                    | P1      | 1 ngày       |                   |
| Ecosystem / For You Section             | P1      | 1.5 ngày     | Tab component     |
| Roadmap Section                         | P1      | 1 ngày       |                   |
| Footer                                  | P2      | 0.5 ngày     |                   |
| SEO + Meta tags                         | P2      | 0.5 ngày     |                   |
| Performance optimization                | P2      | 1 ngày       |                   |
| QA + Cross-browser testing              | P2      | 1 ngày       |                   |
| **Tổng**                                |         | **~15 ngày** | Solo developer    |

---

## 11. RỦI RO & GIẢI PHÁP

| Rủi ro                                   | Xác suất   | Mức độ     | Giải pháp                                              |
| ---------------------------------------- | ---------- | ---------- | ------------------------------------------------------ |
| Brand chưa được approve gây chậm tiến độ | Cao        | Cao        | Approve brand trước khi code, dùng placeholder màu tạm |
| Nội dung/copy chưa được confirm          | Trung bình | Cao        | Confirm nội dung song song với thiết kế                |
| Performance kém do animation nặng        | Thấp       | Trung bình | Dùng Framer Motion lazy load, giảm JS bundle           |
| NestJS API chưa sẵn sàng khi FE xong     | Trung bình | Thấp       | Dùng mock API trong FE trước, tích hợp sau             |

---

## 12. OPEN QUESTIONS

| #    | Câu hỏi                                             | Owner       | Deadline        |
| ---- | --------------------------------------------------- | ----------- | --------------- |
| OQ-1 | BenHub có logo chưa? Nếu có, cần file vector (.svg) | BenHub Team | Trước khi start |
| OQ-2 | Domain trang sẽ là gì? (benhub.vn?)                 | BenHub Team | Sprint 1        |
| OQ-3 | Ai là người approve content/copy cuối cùng?         | BenHub CEO  | Trước khi start |
| OQ-4 | Cần tích hợp Google Analytics / Meta Pixel không?   | Marketing   | Sprint 1        |
| OQ-5 | Email thông báo khi có lead mới gửi về địa chỉ nào? | Sales Team  | Trước go-live   |
| OQ-6 | Có cần captcha (Google reCAPTCHA) cho form không?   | Tech Lead   | Sprint 1        |

---

## 13. LỊCH SỬ THAY ĐỔI

| Version | Ngày       | Người thực hiện | Nội dung          |
| ------- | ---------- | --------------- | ----------------- |
| 1.0     | 14/05/2026 | BA Team         | Khởi tạo tài liệu |

---

_Tài liệu này cần được review và sign-off bởi Product Owner trước khi bắt đầu sprint._
