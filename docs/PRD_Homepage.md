# PRD — Trang Chủ Landing Page BenHub

**Page-Level Product Requirements Document**
**Version:** 1.0
**Ngày tạo:** 14/05/2026
**Author:** BA Team
**Status:** Draft — Chờ Review

---

## 1. THÔNG TIN TRANG

| Thuộc tính | Giá trị                 |
| ---------- | ----------------------- |
| URL        | `https://benhub.vn/`    |
| Page type  | Marketing Landing Page  |
| Framework  | Next.js 14 (App Router) |
| Ngôn ngữ   | Tiếng Việt              |
| Responsive | Mobile-first            |
| Route file | `app/page.tsx`          |

---

## 2. MỤC TIÊU TRANG

### 2.1 Mục tiêu chính

Chuyển đổi visitor thành **lead đăng ký tham gia hệ sinh thái BenHub** thông qua form phân loại theo segment.

### 2.2 Mục tiêu phụ

- Xây dựng nhận thức thương hiệu BenHub là "Construction Logistics OS"
- Thuyết phục từng nhóm persona rằng BenHub giải quyết đúng vấn đề của họ
- Tạo uy tín với nhà đầu tư và đối tác chiến lược

### 2.3 KPI chuyển đổi

| Metric                  | Target                    |
| ----------------------- | ------------------------- |
| Form Submission Rate    | ≥ 5% unique visitors      |
| Scroll Depth            | ≥ 60% users đọc đến S7    |
| Bounce Rate             | ≤ 50%                     |
| CTA Click Rate (Navbar) | ≥ 8%                      |
| Form Step 2 Completion  | ≥ 70% users đã qua Step 1 |

---

## 3. LAYOUT TỔNG THỂ

```
┌─────────────────────────────────────┐
│  NAVBAR (sticky, full-width)        │
├─────────────────────────────────────┤
│  S1. HERO                           │
│  (100vh, dark background)           │
├─────────────────────────────────────┤
│  S2. PROBLEM                        │
│  (light background)                 │
├─────────────────────────────────────┤
│  S3. SOLUTION                       │
│  (dark background)                  │
├─────────────────────────────────────┤
│  S4. PRODUCTS                       │
│  (light background)                 │
├─────────────────────────────────────┤
│  S5. MARKET OPPORTUNITY             │
│  (dark background, full-width)      │
├─────────────────────────────────────┤
│  S6. HOW IT WORKS                   │
│  (light background)                 │
├─────────────────────────────────────┤
│  S7. FOR YOU (Tab section)          │
│  (light background)                 │
├─────────────────────────────────────┤
│  S8. ROADMAP                        │
│  (dark background)                  │
├─────────────────────────────────────┤
│  S9. REGISTER FORM                  │
│  (orange gradient background)       │
├─────────────────────────────────────┤
│  FOOTER                             │
│  (dark background)                  │
└─────────────────────────────────────┘
```

---

## 4. NAVBAR

### 4.1 Behavior

- **Position:** `fixed top-0`, full width, z-index cao nhất
- **Default state:** background transparent, text trắng (khi Hero còn trong viewport)
- **Scroll state:** background `#0F172A` với `backdrop-blur`, chuyển mượt (transition 300ms)
- **Mobile:** Hamburger menu, drawer từ phải sang

### 4.2 Layout Desktop

```
[ Logo BenHub ]    [ Giải pháp | Sản phẩm | Hệ sinh thái | Lộ trình ]    [ Đăng ký ngay → ]
```

### 4.3 Content

| Element    | Nội dung                   | Action                  |
| ---------- | -------------------------- | ----------------------- |
| Logo       | SVG logo BenHub + wordmark | Link về `/`             |
| Nav item 1 | Giải pháp                  | Scroll đến `#solution`  |
| Nav item 2 | Sản phẩm                   | Scroll đến `#products`  |
| Nav item 3 | Hệ sinh thái               | Scroll đến `#ecosystem` |
| Nav item 4 | Lộ trình                   | Scroll đến `#roadmap`   |
| CTA Button | "Đăng ký ngay"             | Scroll đến `#register`  |

### 4.4 Mobile Drawer Menu

```
[ X ]
  Giải pháp
  Sản phẩm
  Hệ sinh thái
  Lộ trình
  ─────────────
  [ Đăng ký ngay ]
```

### 4.5 Component Spec

```tsx
// components/layout/Navbar.tsx
interface NavbarProps {
  items: NavItem[];
}
interface NavItem {
  label: string;
  href: string; // anchor id
}
```

---

## 5. S1 — HERO SECTION

### 5.1 Mục tiêu

Truyền tải định vị thương hiệu trong 3 giây. Kéo visitor cuộn xuống đọc tiếp.

### 5.2 Layout

```
┌────────────────────────────────────────────┐
│  [Background: Map animation + xe chạy]     │
│  [Overlay: dark gradient 60% opacity]      │
│                                            │
│         [Badge: "Nền tảng logistics        │
│          công trình #1 Việt Nam"]          │
│                                            │
│   Hệ Điều Hành Số                         │
│   Cho Ngành Vận Tải                        │
│   Công Trình Việt Nam                      │
│                                            │
│   [Sub-headline text]                      │
│                                            │
│   [Đăng ký tham gia]  [Xem cách hoạt động]│
│                                            │
│   ──────────────────────────────────       │
│   5,000+ xe  •  10+ dự án  •  6 tỉnh      │
└────────────────────────────────────────────┘
              [ ↓ scroll indicator ]
```

### 5.3 Content Chi Tiết

**Badge (trên headline):**

```
🏆  Nền tảng logistics công trình #1 Việt Nam
```

Style: pill shape, border cam, text cam nhạt, background cam 10% opacity

**Headline (H1):**

```
Hệ Điều Hành Số
Cho Ngành Vận Tải
Công Trình Việt Nam
```

Font: Barlow Condensed 700, size 64px desktop / 40px mobile, màu trắng
"Công Trình Việt Nam" — màu cam `#F97316`

**Sub-headline:**

```
BenHub số hóa toàn bộ chuỗi logistics xây dựng — từ điều phối
xe ben, quản lý đội xe đến đối soát tài chính realtime.
Minh bạch. Hiệu quả. Dữ liệu.
```

Font: Plus Jakarta Sans 400, size 18px, màu `#CBD5E1`

**Primary CTA:**

```
Đăng ký tham gia →
```

Style: background `#F97316`, text trắng, border-radius 8px, padding 14px 28px
Hover: background `#EA6C0A`, scale 1.02

**Secondary CTA:**

```
▶  Xem cách hoạt động
```

Style: border trắng, text trắng, transparent background
Action: Scroll đến `#how-it-works`

**Social Proof Bar:**

```
5,000+ xe tham gia   •   10+ dự án vận hành   •   6 tỉnh thành
```

Style: border-top `rgba(255,255,255,0.15)`, text `#94A3B8`, icons nhỏ

**Background Animation:**

- SVG animated map của Việt Nam với các dot (dự án) pulse
- Các đường route GPS di chuyển giữa các điểm
- Subtle, không chiếm quá nhiều attention
- Fallback: gradient mesh nếu animation disabled

### 5.4 Animation Sequence (Framer Motion)

```
0ms:    Badge fade in + slide up
200ms:  Headline line 1 fade in
400ms:  Headline line 2 fade in
600ms:  Headline line 3 fade in
800ms:  Sub-headline fade in
1000ms: 2 CTA buttons fade in (stagger 150ms)
1200ms: Social proof bar slide up
```

### 5.5 Component Spec

```tsx
// components/sections/HeroSection.tsx
// Không nhận props — nội dung hardcode từ content config
// Sử dụng: Framer Motion, next/font (Barlow Condensed)
```

---

## 6. S2 — PROBLEM SECTION

### 6.1 Mục tiêu

Gây đồng cảm. Khiến persona nhận ra "đây chính xác là vấn đề của mình."

### 6.2 Layout

```
┌──────────────────────────────────────────┐
│  [Section label: "BÀI TOÁN NGÀNH"]      │
│                                          │
│  Ngành vận tải công trình:               │
│  Quy mô cực lớn — Số hóa cực thấp       │
│                                          │
│  [Sub-text]                              │
│                                          │
│  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ Card 1 │ │ Card 2 │ │ Card 3 │       │
│  └────────┘ └────────┘ └────────┘       │
│  ┌────────┐ ┌────────┐                  │
│  │ Card 4 │ │ Card 5 │                  │
│  └────────┘ └────────┘                  │
└──────────────────────────────────────────┘
```

Layout: 3 cột desktop, 2 cột tablet, 1 cột mobile

### 6.3 Content

**Section Label:** `BÀI TOÁN NGÀNH`
Style: text cam, uppercase, letter-spacing 0.1em, font size 13px

**Headline:**

```
Ngành vận tải công trình:
Quy mô cực lớn — Số hóa cực thấp
```

**Sub-text:**

```
Dù có quy mô hàng chục tỷ USD mỗi năm, ngành vận tải công trình
Việt Nam vẫn đang vận hành bằng phiếu giấy, điện thoại và Zalo.
```

**5 Pain Point Cards:**

| #   | Icon | Tiêu đề                | Mô tả                                                                       | Stat nổi bật                       |
| --- | ---- | ---------------------- | --------------------------------------------------------------------------- | ---------------------------------- |
| 1   | 📉   | Thất thoát vật liệu    | Xe chở thiếu tải, quay vòng khống, làm giả phiếu — không ai phát hiện được  | **5–20%** giá trị dự án thất thoát |
| 2   | 📞   | Điều phối thủ công     | Gọi điện từng xe, nhắn Zalo từng chuyến — không scale khi vượt 50 xe        | **0%** tự động hóa                 |
| 3   | 📄   | Phiếu giấy dễ gian lận | Hàng triệu phiếu viết tay mỗi ngày — dễ mất, dễ sửa, dễ làm giả             | **1–2 tuần** đối soát mỗi tháng    |
| 4   | ⏳   | Công nợ kéo dài        | Chủ đầu tư chậm trả → nhà thầu nợ đội xe → đội xe nợ tài xế                 | **30–90 ngày** chuỗi công nợ       |
| 5   | 📊   | Mù dữ liệu             | Không dashboard, không GPS, không AI — không biết xe ở đâu, tiến độ thế nào | **0** dữ liệu tập trung            |

**Card Style:**

- Background: white
- Border: 1px `#E2E8F0`
- Border-left: 4px solid `#F97316` (accent)
- Hover: shadow-lg, translateY(-4px), transition 300ms
- Stat nổi bật: số lớn màu cam, bold

---

## 7. S3 — SOLUTION SECTION

### 7.1 Mục tiêu

Giới thiệu BenHub như giải pháp toàn diện. Chuyển tiếp logic từ "vấn đề" sang "giải pháp."

### 7.2 Layout (Dark background `#0F172A`)

```
┌───────────────────────────────────────────┐
│  [Section label: "GIẢI PHÁP"]             │
│                                           │
│  BenHub giải quyết từng                   │
│  vấn đề của ngành                         │
│                                           │
│  ┌─────────────────┬─────────────────┐    │
│  │  TRƯỚC BENHUB   │  SAU BENHUB     │    │
│  │  (icon ❌)      │  (icon ✅)      │    │
│  ├─────────────────┼─────────────────┤    │
│  │ Phiếu giấy...   │ E-Ticket số...  │    │
│  │ Gọi điện xe...  │ AI Dispatch...  │    │
│  │ Không GPS...    │ Realtime GPS... │    │
│  │ Đối soát 2 tuần │ Tự động tức thì │    │
│  │ Nợ 90 ngày...   │ Ứng tiền nhanh  │    │
│  └─────────────────┴─────────────────┘    │
│                                           │
│  "BenHub — Hệ điều hành số cho ngành      │
│   vận tải công trình."                    │
└───────────────────────────────────────────┘
```

### 7.3 Content

**Section Label:** `GIẢI PHÁP`

**Headline:**

```
BenHub giải quyết từng vấn đề của ngành
```

**Before / After Table:**

| Trước BenHub                           | Sau BenHub                                           |
| -------------------------------------- | ---------------------------------------------------- |
| ❌ Phiếu giấy dễ gian lận, dễ thất lạc | ✅ E-Ticket số — GPS proof, watermark, chống giả mạo |
| ❌ Điều phối qua điện thoại, Zalo      | ✅ Smart Dispatch AI — tự động phân bổ xe tối ưu     |
| ❌ Không biết xe đang ở đâu            | ✅ Realtime GPS Tracking — visibility toàn đội xe    |
| ❌ Đối soát tốn 1–2 tuần/tháng         | ✅ Realtime Reconciliation — báo cáo tức thì         |
| ❌ Công nợ kẹt 30–90 ngày              | ✅ BenHub Finance — ứng tiền ngay sau chuyến xong    |

Style: Dòng "Trước" màu đỏ nhạt `#FEE2E2`, "Sau" màu xanh nhạt `#DCFCE7`. Hover từng dòng highlight.

**Tagline cuối:**

```
"BenHub — Hệ điều hành số cho ngành vận tải công trình."
```

Style: text lớn, in nghiêng, màu cam, centered

---

## 8. S4 — PRODUCTS SECTION

### 8.1 Mục tiêu

Giới thiệu breadth của hệ sinh thái. Thể hiện đây không chỉ là "app gọi xe."

### 8.2 Layout

```
┌──────────────────────────────────────────┐
│  [Section label: "HỆ THỐNG SẢN PHẨM"]   │
│                                          │
│  8 sản phẩm. 1 hệ sinh thái.            │
│  Toàn bộ chuỗi logistics công trình.    │
│                                          │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │Core  │ │Driver│ │Super │ │Fleet │   │
│  └──────┘ └──────┘ └──────┘ └──────┘   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │Mkt   │ │Fin   │ │Mat   │ │AI    │   │
│  └──────┘ └──────┘ └──────┘ └──────┘   │
└──────────────────────────────────────────┘
```

Grid: 4 cột desktop, 2 cột tablet, 2 cột mobile

### 8.3 Content — 8 Product Cards

| #   | Sản phẩm           | Icon | Tag         | Mô tả ngắn                               | Tính năng chính                               |
| --- | ------------------ | ---- | ----------- | ---------------------------------------- | --------------------------------------------- |
| 1   | BenHub Core        | 🏗️   | Platform    | Trung tâm điều hành toàn bộ hệ sinh thái | Dashboard • Dispatch • Reporting • Control    |
| 2   | BenHub Driver      | 📱   | Mobile App  | App dành cho tài xế xe ben               | Nhận chuyến • GPS • E-Ticket • Ví tiền        |
| 3   | BenHub Supervisor  | 👁️   | Monitoring  | Giám sát công trường realtime            | Duyệt chuyến • Kiểm GPS • Kiểm tải • Ảnh XN   |
| 4   | BenHub Fleet       | 🚛   | Management  | Quản lý toàn bộ đội xe                   | Xe • Tài xế • Bảo dưỡng • Chi phí             |
| 5   | BenHub Marketplace | 🔗   | Marketplace | Sàn kết nối cung–cầu vận tải             | Matching • Bidding • Dynamic Pricing • Rating |
| 6   | BenHub Finance     | 💳   | Fintech     | Tài chính vận tải cho ngành              | Factoring • Ứng tiền • Ví điện tử • Công nợ   |
| 7   | BenHub Materials   | ⛏️   | Marketplace | Sàn giao dịch vật liệu xây dựng          | Kết nối mỏ • Báo giá • Logistics VL           |
| 8   | BenHub AI Labs     | 🤖   | AI          | Trí tuệ nhân tạo cho logistics           | Chống gian lận • Routing • Pricing • Forecast |

**Card Structure:**

```
┌──────────────────┐
│  [Icon 48px]     │
│  [Tag badge]     │
│  Tên sản phẩm    │
│  Mô tả ngắn      │
│  ─────────────   │
│  • Feature 1     │
│  • Feature 2     │
│  • Feature 3     │
└──────────────────┘
```

Hover: card lift, icon scale 1.1, show "Tìm hiểu thêm →" link (phase 2)

---

## 9. S5 — MARKET OPPORTUNITY SECTION

### 9.1 Mục tiêu

Thuyết phục nhà đầu tư và đối tác về quy mô cơ hội khổng lồ.

### 9.2 Layout (Dark, full-width background)

```
┌──────────────────────────────────────────┐
│  [Section label: "CƠ HỘI THỊ TRƯỜNG"]   │
│                                          │
│  Thị trường khổng lồ.                    │
│  Gần như chưa được số hóa.              │
│                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ 60–80 tỷ │ │ 100,000+ │ │  < 5%    │ │
│  │   USD    │ │    xe    │ │ số hóa   │ │
│  │  /năm   │ │   ben    │ │          │ │
│  └──────────┘ └──────────┘ └──────────┘ │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  "Ngành vận tải công trình:        │  │
│  │   Quy mô cực lớn — Số hóa cực thấp│  │
│  │   Đây là khoảng trống BenHub       │  │
│  │   đang lấp đầy."                   │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [Map VN với các dot dự án hạ tầng]     │
│  Cao tốc BN • Long Thành • Vành đai...  │
└──────────────────────────────────────────┘
```

### 9.3 Content

**Section Label:** `CƠ HỘI THỊ TRƯỜNG`

**Headline:**

```
Thị trường khổng lồ.
Gần như chưa được số hóa.
```

**3 Big Numbers (Counter Animation khi scroll vào viewport):**

| Số liệu      | Label                        | Sub-label                 |
| ------------ | ---------------------------- | ------------------------- |
| 60–80 tỷ USD | Quy mô Vận Tải công trình VN | Tăng trưởng 8–10%/năm     |
| 100,000+     | Xe ben đang hoạt động        | Phần lớn chưa có platform |
| < 5%         | Tỷ lệ số hóa hiện tại        | Khoảng trống khổng lồ     |

Counter animation: count từ 0 → target trong 2 giây, easing ease-out

**Callout Quote:**

```
"Ngành vận tải công trình Việt Nam: Quy mô cực lớn nhưng số hóa cực thấp.
 Đây là khoảng trống thị trường BenHub đang lấp đầy."
```

**Dự án hạ tầng đang tạo nhu cầu (tags/badges):**

```
🛣️ Cao tốc Bắc Nam   ✈️ Sân bay Long Thành   🏭 KCN & FDI
🌆 Đô thị hóa        ⚡ Năng lượng tái tạo    🚢 Cảng biển
```

---

## 10. S6 — HOW IT WORKS SECTION

### 10.1 Mục tiêu

Giải thích flow vận hành cụ thể, xây dựng sự tin tưởng qua tính cụ thể.

### 10.2 Layout

```
┌──────────────────────────────────────────┐
│  [Section label: "CÁCH HOẠT ĐỘNG"]       │
│                                          │
│  Từ lệnh vận chuyển                      │
│  đến đối soát — tự động hoàn toàn       │
│                                          │
│  [Step 1] ──→ [Step 2] ──→ [Step 3]     │
│              ──→ [Step 4] ──→ [Step 5]  │
│                                          │
│  [Active step: hiện detail bên phải]    │
└──────────────────────────────────────────┘
```

Desktop: Stepper ngang + detail panel bên phải
Mobile: Vertical stepper accordion

### 10.3 Content — 5 Steps

| Step | Icon | Tiêu đề             | Mô tả chi tiết                                                                                                            | Actor                  |
| ---- | ---- | ------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 1    | 📋   | Tạo lệnh vận chuyển | Chủ đầu tư hoặc tổng thầu tạo lệnh trên BenHub Core: số chuyến, loại vật liệu, điểm nhận – điểm trả, thời gian.           | Chủ đầu tư / Tổng thầu |
| 2    | 🤖   | AI Smart Dispatch   | BenHub tự động matching với đội xe phù hợp nhất: gần nhất, đúng tải trọng, rating cao, có lịch trống. Không cần gọi điện. | Hệ thống AI            |
| 3    | 📱   | Tài xế nhận chuyến  | Tài xế nhận thông báo qua app, xác nhận, bật GPS. E-Ticket tự động tạo với mã QR, watermark thời gian + tọa độ.           | Tài xế                 |
| 4    | 👁️   | Giám sát realtime   | Supervisor theo dõi toàn bộ đội xe trên bản đồ. Phát hiện ngay nếu xe lệch tuyến, dừng bất thường, thiếu tải.             | Supervisor             |
| 5    | ✅   | Đối soát tự động    | Khi chuyến hoàn thành: hệ thống tự tổng hợp khối lượng, so sánh lệnh vs thực tế, xuất báo cáo, cập nhật công nợ.          | Hệ thống               |

---

## 11. S7 — FOR YOU SECTION (Tab)

### 11.1 Mục tiêu

Nói chuyện trực tiếp với từng persona. "BenHub sinh ra là dành cho bạn."

### 11.2 Layout

```
┌──────────────────────────────────────────┐
│  BenHub dành cho ai?                     │
│                                          │
│  [Tab 1] [Tab 2] [Tab 3] [Tab 4]        │
│  Chủ Đội Xe  Tài Xế  Chủ ĐT  Nhà ĐT   │
│  ──────────────────────────────────      │
│                                          │
│  ┌──────────────────┬──────────────────┐ │
│  │ [Illustration]   │ Headline         │ │
│  │                  │ Sub-text         │ │
│  │                  │ ✅ Benefit 1     │ │
│  │                  │ ✅ Benefit 2     │ │
│  │                  │ ✅ Benefit 3     │ │
│  │                  │ [CTA Button]     │ │
│  └──────────────────┴──────────────────┘ │
└──────────────────────────────────────────┘
```

### 11.3 Content — 4 Tabs

**Tab 1 — Chủ Đội Xe 🚛**

Headline: _"Có việc đều. Quản lý dễ. Thu nhập tăng."_

Sub-text: _"Tham gia hệ sinh thái BenHub — đội xe của bạn luôn có việc, doanh thu minh bạch, quản lý từ một app duy nhất."_

Benefits:

- ✅ Nhận cuốc xe ổn định từ mạng lưới dự án BenHub
- ✅ Quản lý toàn bộ đội xe, tài xế, bảo dưỡng trên app
- ✅ Theo dõi doanh thu realtime từng xe, từng ngày
- ✅ Đối soát công nợ tự động — không tranh cãi cuối tháng
- ✅ Tiếp cận BenHub Finance khi cần vốn vận hành

CTA: `Đăng ký đội xe ngay →`

---

**Tab 2 — Tài Xế 👤**

Headline: _"Cuốc xe đều. Thu nhập rõ. Không mất phiếu."_

Sub-text: _"Tài xế BenHub luôn có việc, thu nhập được ghi nhận đầy đủ, E-Ticket thay phiếu giấy — không lo mất, không lo gian lận."_

Benefits:

- ✅ Nhận cuốc xe hàng ngày qua app — không cần quan hệ hay cò
- ✅ E-Ticket số hoá — không bao giờ mất phiếu, không tranh cãi
- ✅ Thu nhập được ghi nhận từng chuyến, rõ ràng minh bạch
- ✅ Ứng tiền nhanh sau mỗi chuyến — không chờ cuối tháng
- ✅ Đánh giá uy tín → cuốc xe tốt hơn, thu nhập cao hơn

CTA: `Đăng ký lái xe ngay →`

---

**Tab 3 — Chủ Đầu Tư / Tổng Thầu 🏗️**

Headline: _"Kiểm soát toàn bộ. Không thất thoát. Dữ liệu realtime."_

Sub-text: _"BenHub cho bạn dashboard giám sát toàn bộ đội xe 24/7, phát hiện gian lận tức thì, báo cáo khối lượng tự động."_

Benefits:

- ✅ Dashboard realtime: biết mọi xe đang ở đâu, tiến độ thế nào
- ✅ Phát hiện thất thoát ngay lập tức — chở thiếu tải, lệch tuyến, dừng bất thường
- ✅ Báo cáo khối lượng tự động cuối ngày — không cần thủ công
- ✅ Đối soát công nợ trong vài phút thay vì vài tuần
- ✅ Bảo vệ tài sản chủ đầu tư bằng dữ liệu xác thực

CTA: `Yêu cầu demo miễn phí →`

---

**Tab 4 — Nhà Đầu Tư / Đối Tác 💼**

Headline: _"Cơ hội đầu tư vào hạ tầng số Vận Tải công trình."_

Sub-text: _"BenHub đang xây dựng Construction Logistics OS đầu tiên của Việt Nam trong thị trường 60–80 tỷ USD với tỷ lệ số hóa < 5%."_

Benefits:

- ✅ Market size: 60–80 tỷ USD/năm, tăng trưởng 8–10%/năm
- ✅ Asset-light platform model — scalable toàn quốc
- ✅ 5 luồng doanh thu: SaaS, Marketplace, Finance, Data, Carbon
- ✅ Roadmap rõ ràng đến 2035 với tầm nhìn IPO
- ✅ Mô hình Holding địa phương — mở rộng nhanh với chi phí thấp

CTA: `Tải Pitch Deck →` / `Liên hệ đội ngũ →`

---

## 12. S8 — ROADMAP SECTION

### 12.1 Mục tiêu

Thể hiện tầm nhìn dài hạn, cam kết chiến lược 10 năm.

### 12.2 Layout (Dark background)

```
┌──────────────────────────────────────────┐
│  [Section label: "LỘ TRÌNH PHÁT TRIỂN"] │
│                                          │
│  Từ nền tảng đến hạ tầng quốc gia       │
│                                          │
│  2025 ────────── 2026 ─ 2028 ─── 2035  │
│  [Phase 1]       [Phase 2]   [Phase 3]  │
│                                          │
│  [Active phase card: detail bên dưới]   │
└──────────────────────────────────────────┘
```

### 12.3 Content — 3 Phases

| Phase | Thời gian | Tag                | Headline             | KPI                                                                       |
| ----- | --------- | ------------------ | -------------------- | ------------------------------------------------------------------------- |
| 1     | 2025–2026 | 🔵 Đang triển khai | Xây Nền Tảng         | 5,000+ xe • 10+ dự án • Hoàn thiện E-Ticket & GPS • Data pipeline vận tải |
| 2     | 2026–2028 | ⚪ Sắp tới         | Mở Rộng Hệ Sinh Thái | 50,000+ xe • Marketplace • BenHub Finance • AI Dispatch • Liên tỉnh       |
| 3     | 2028–2035 | ⚪ Tầm nhìn        | Hạ Tầng Quốc Gia     | Construction Logistics OS • ASEAN • IPO • Carbon & ESG • AI Platform      |

Phase 1 highlighted (vì đang ở 2026) với border cam và badge "Đang triển khai"

---

## 13. S9 — REGISTRATION FORM SECTION

### 13.1 Mục tiêu

Thu hút lead đăng ký. Đây là Primary CTA của toàn trang.

### 13.2 Layout

```
┌──────────────────────────────────────────┐
│  [Background: orange gradient]           │
│                                          │
│  Tham gia hệ sinh thái BenHub            │
│  Đội ngũ sẽ liên hệ trong 24 giờ        │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  [Step 1: Chọn nhóm — 4 options]  │  │
│  │                                    │  │
│  │  🚛 Chủ Đội Xe  👤 Tài Xế         │  │
│  │  🏗️ Chủ Đầu Tư  💼 Nhà Đầu Tư   │  │
│  │                                    │  │
│  │  ──────── hoặc ────────            │  │
│  │                                    │  │
│  │  [Step 2: Form fields (dynamic)]   │  │
│  │  [Họ tên]  [Số điện thoại]        │  │
│  │  [Email]   [Tỉnh/Thành]           │  │
│  │  [Dynamic field theo segment]      │  │
│  │                                    │  │
│  │  [Gửi đăng ký →]                  │  │
│  └────────────────────────────────────┘  │
│                                          │
│  🔒 Thông tin của bạn được bảo mật tuyệt đối
└──────────────────────────────────────────┘
```

### 13.3 Step 1 — Chọn Segment

4 option cards, chọn 1:

```tsx
interface SegmentOption {
  id: "fleet_owner" | "driver" | "investor" | "partner";
  icon: string;
  label: string;
  description: string;
}

const segments: SegmentOption[] = [
  {
    id: "fleet_owner",
    icon: "🚛",
    label: "Chủ Đội Xe",
    description: "Sở hữu hoặc quản lý đội xe ben",
  },
  {
    id: "driver",
    icon: "👤",
    label: "Tài Xế",
    description: "Tài xế xe ben muốn có việc đều",
  },
  {
    id: "investor",
    icon: "🏗️",
    label: "Chủ Đầu Tư / Tổng Thầu",
    description: "Cần giải pháp quản lý vận tải dự án",
  },
  {
    id: "partner",
    icon: "💼",
    label: "Nhà Đầu Tư / Đối Tác",
    description: "Muốn hợp tác hoặc đầu tư vào BenHub",
  },
];
```

Selected state: border cam 2px, background cam nhạt, checkmark icon

### 13.4 Step 2 — Dynamic Form Fields

**Fields matrix:**

| Field                       | fleet_owner | driver | investor | partner | Validate          |
| --------------------------- | :---------: | :----: | :------: | :-----: | ----------------- |
| Họ và tên \*                |     ✅      |   ✅   |    ✅    |   ✅    | min 2 ký tự       |
| Số điện thoại \*            |     ✅      |   ✅   |    ✅    |   ✅    | 10 số, bắt đầu 0  |
| Email                       |     ✅      |   ❌   |    ✅    |   ✅    | email format      |
| Tỉnh/Thành phố \*           |     ✅      |   ✅   |    ✅    |   ❌    | required          |
| Số lượng xe hiện có         |     ✅      |   ❌   |    ❌    |   ❌    | số nguyên dương   |
| Biển số xe (1 xe tiêu biểu) |     ❌      |   ✅   |    ❌    |   ❌    | format biển số    |
| Tên công ty / Dự án         |     ❌      |   ❌   |    ✅    |   ✅    | min 2 ký tự       |
| Quy mô dự án (tỷ VNĐ)       |     ❌      |   ❌   |    ✅    |   ❌    | số dương          |
| Ghi chú thêm                |     ✅      |   ✅   |    ✅    |   ✅    | optional, max 500 |

**Tỉnh/Thành phố:** Dropdown select với danh sách 63 tỉnh thành Việt Nam

### 13.5 Form Validation Rules

```typescript
// Validation schema (Zod)
const baseSchema = z.object({
  segment: z.enum(["fleet_owner", "driver", "investor", "partner"]),
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().regex(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
  note: z.string().max(500).optional(),
});

const fleetOwnerSchema = baseSchema.extend({
  province: z.string().min(1, "Vui lòng chọn tỉnh thành"),
  email: z.string().email("Email không hợp lệ").optional(),
  fleetSize: z.number().int().positive().optional(),
});

const driverSchema = baseSchema.extend({
  province: z.string().min(1, "Vui lòng chọn tỉnh thành"),
  licensePlate: z.string().optional(),
});

const investorSchema = baseSchema.extend({
  email: z.string().email("Email không hợp lệ"),
  companyName: z.string().min(2),
  projectScale: z.string().optional(),
  province: z.string().min(1, "Vui lòng chọn tỉnh thành"),
});

const partnerSchema = baseSchema.extend({
  email: z.string().email("Email không hợp lệ"),
  companyName: z.string().min(2),
});
```

### 13.6 Submit Flow

```
User click "Gửi đăng ký"
  ↓
Client validate (Zod) — nếu lỗi: hiện inline error, scroll đến field lỗi đầu tiên
  ↓
Button → loading state (spinner), disabled
  ↓
POST /api/leads (NestJS)
  ↓
[Success 201] → Ẩn form, hiện Success Screen
[Error 4xx]   → Hiện error message, form không reset
[Error 5xx]   → Hiện "Có lỗi xảy ra, vui lòng thử lại"
```

**Success Screen:**

```
✅

Đăng ký thành công!

Cảm ơn [Họ tên]. Đội ngũ BenHub sẽ liên hệ với bạn
qua số [phone] trong vòng 24 giờ làm việc.

Trong thời gian chờ, hãy theo dõi BenHub tại:
[Facebook]  [Zalo]  [LinkedIn]
```

### 13.7 Trust Signals (dưới form)

```
🔒  Thông tin của bạn được bảo mật tuyệt đối
⚡  Đội ngũ liên hệ trong vòng 24 giờ làm việc
✅  Hơn 5,000 xe và đội tài xế đã tham gia
```

---

## 14. FOOTER

### 14.1 Layout

```
┌──────────────────────────────────────────┐
│  [Dark background #0F172A]               │
│                                          │
│  [Logo]    [Cột 2]    [Cột 3]  [Cột 4] │
│  Tagline   Sản phẩm   Công ty  Liên hệ  │
│                                          │
│  [Social: FB | Zalo | LinkedIn]          │
│  ────────────────────────────────────── │
│  © 2026 BenHub Việt Nam. All rights...  │
│                        [Privacy | Terms] │
└──────────────────────────────────────────┘
```

### 14.2 Content

**Cột 1 — Brand:**

- Logo BenHub (white version)
- "Hệ điều hành số cho ngành vận tải công trình Việt Nam"
- Social: Facebook, Zalo OA, LinkedIn

**Cột 2 — Sản phẩm:**

- BenHub Core
- BenHub Driver
- BenHub Fleet
- BenHub Finance
- BenHub Materials
- BenHub AI Labs

**Cột 3 — Công ty:**

- Về BenHub
- Tin tức
- Tuyển dụng
- Đối tác
- Nhà đầu tư

**Cột 4 — Liên hệ:**

- 📞 Hotline: 024 777 67 666
- 📧 contact@benhub.vn
- 📍 Hà Nội, Việt Nam
- Giờ làm việc: T2–T6, 8:00–17:30

**Bottom bar:**

```
© 2026 Công ty Cổ phần BenHub Việt Nam. All rights reserved.
[Chính sách bảo mật]  [Điều khoản sử dụng]
```

---

## 15. SEO & META TAGS

```tsx
// app/page.tsx — metadata
export const metadata: Metadata = {
  title: "BenHub — Hệ Điều Hành Số Cho Vận Tải Công Trình Việt Nam",
  description:
    "BenHub số hóa toàn bộ chuỗi logistics xây dựng: điều phối xe ben, quản lý đội xe, E-Ticket, GPS tracking và đối soát tài chính realtime.",
  keywords:
    "BenHub, vận tải công trình, logistics xây dựng, quản lý xe ben, E-ticket vận tải, điều phối xe ben",
  openGraph: {
    title: "BenHub — Hệ Điều Hành Số Cho Vận Tải Công Trình",
    description:
      "Số hóa toàn bộ logistics xây dựng — từ xe ben đến đối soát tài chính.",
    url: "https://benhub.vn",
    siteName: "BenHub",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BenHub — Construction Logistics OS",
    description: "Số hóa ngành vận tải công trình Việt Nam",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};
```

---

## 16. COMPONENT TREE

```
app/page.tsx
├── components/layout/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── components/sections/
│   ├── HeroSection.tsx
│   ├── ProblemSection.tsx
│   ├── SolutionSection.tsx
│   ├── ProductsSection.tsx
│   ├── MarketSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── ForYouSection.tsx
│   ├── RoadmapSection.tsx
│   └── RegisterSection.tsx
├── components/ui/
│   ├── SectionLabel.tsx
│   ├── StatCounter.tsx
│   ├── ProductCard.tsx
│   ├── ProblemCard.tsx
│   ├── StepIndicator.tsx
│   └── TabSelector.tsx
├── components/form/
│   ├── RegisterForm.tsx
│   ├── SegmentSelector.tsx
│   ├── DynamicFields.tsx
│   └── SuccessScreen.tsx
└── lib/
    ├── api.ts          // API call to NestJS
    ├── validations.ts  // Zod schemas
    └── content.ts      // All text content (i18n-ready)
```

---

## 17. ACCEPTANCE CRITERIA CHECKLIST

### Navbar

- [ ] Sticky, transparent → solid khi scroll
- [ ] Smooth scroll đến đúng section
- [ ] Mobile hamburger menu hoạt động
- [ ] CTA button scroll đến form

### Hero

- [ ] Headline hiển thị đúng, responsive text size
- [ ] Animation không block FCP
- [ ] 2 CTA button hoạt động
- [ ] Social proof bar hiện đúng số liệu

### Problem Section

- [ ] 5 cards hiển thị đúng
- [ ] Hover effect mượt
- [ ] Stat nổi bật dễ đọc

### Form Section

- [ ] Step 1: chọn segment, highlight rõ
- [ ] Step 2: dynamic fields đúng theo segment
- [ ] Validate realtime, message tiếng Việt
- [ ] Submit → loading → success/error
- [ ] Success screen hiện đúng thông tin
- [ ] Form KHÔNG reset khi lỗi server

### Performance

- [ ] Lighthouse Performance Desktop ≥ 90
- [ ] Lighthouse Performance Mobile ≥ 85
- [ ] No CLS (layout shift)
- [ ] Images lazy loaded

### Cross-browser

- [ ] Chrome ✅ | Safari ✅ | Firefox ✅
- [ ] Mobile Chrome ✅ | Mobile Safari ✅

---

## 18. OPEN QUESTIONS CẦN XÁC NHẬN

| #    | Câu hỏi                                           | Ảnh hưởng           | Owner        |
| ---- | ------------------------------------------------- | ------------------- | ------------ |
| OQ-1 | Logo BenHub đã có chưa? Cần file .svg             | Block Hero & Navbar | BenHub Team  |
| OQ-2 | Domain chính thức: benhub.vn hay khác?            | SEO meta tags       | BenHub Team  |
| OQ-3 | Số hotline và email liên hệ thực tế?              | Footer content      | BenHub Sales |
| OQ-4 | Số liệu "5,000+ xe, 10+ dự án" có thể dùng không? | Hero social proof   | BenHub CEO   |
| OQ-5 | Email nhận thông báo khi có lead mới?             | NestJS notification | BenHub Sales |
| OQ-6 | Cần Google Analytics / Meta Pixel tracking không? | Analytics setup     | Marketing    |
| OQ-7 | Pitch Deck có sẵn để download (Tab nhà đầu tư)?   | Partner CTA         | BenHub CEO   |

---

_Document version 1.0 — Cần sign-off từ Product Owner và Tech Lead trước khi bắt đầu development sprint._
