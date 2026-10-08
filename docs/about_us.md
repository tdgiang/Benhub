# PAGE SPEC — Về Chúng Tôi (About Us)

> File này dành cho Claude CLI. Đọc toàn bộ trước khi viết code.

---

## 1. THÔNG TIN KỸ THUẬT

```
URL:        /ve-chung-toi
Framework:  Next.js 14 App Router + TypeScript
Route file: app/ve-chung-toi/page.tsx
Rendering:  Static (generateStaticParams không cần, dùng SSG mặc định)
```

---

## 3. LAYOUT TỔNG THỂ

```
<Navbar />                  ← shared component, đã có sẵn
<HeroSection />
<StorySection />
<MissionVisionSection />
<CoreValuesSection />
<EcosystemSection />
<MilestonesSection />
<LeadershipSection />
<PresenceSection />
<JoinUsSection />
<Footer />                  ← shared component, đã có sẵn
```

---

## 4. CHI TIẾT TỪNG SECTION

---

### S1 — HERO

```tsx
// Layout: dark navy full-width, min-h-[480px]
// Background: subtle animated dots/grid pattern (dùng CSS, không dùng canvas)
```

**Content:**

```
label:      "VỀ CHÚNG TÔI"               // text-gold uppercase tracking-widest text-sm
headline:   "Chúng tôi xây dựng"
            "hạ tầng số cho ngành"
            "vận tải công trình"          // H1, Barlow Condensed 700, text-white
                                          // "vận tải công trình" → text-gold
subtext:    "BenHub ra đời từ thực tế vận hành đầy bất cập của ngành
             logistics xây dựng Việt Nam — nơi hàng nghìn chuyến xe
             ben mỗi ngày vẫn được quản lý bằng phiếu giấy và điện thoại."
            // text-slate-300, text-lg, max-w-2xl
```

**Stats bar** (4 số, border-top rgba(255,255,255,0.1)):

```
5,000+          10+             6               2025
Xe tham gia     Dự án           Tỉnh thành      Năm thành lập
```

---

### S2 — STORY (Câu chuyện ra đời)

```tsx
// Layout: bg-white, 2 cột — text trái (60%), visual phải (40%)
// Visual bên phải: timeline dọc với 5 điểm, dùng SVG hoặc CSS
```

**Content — cột trái:**

```
section-label:  "CÂU CHUYỆN RA ĐỜI"

headline:       "Từ bất cập thực tế
                 đến nền tảng quốc gia"

paragraph-1:    "Trong quá trình nghiên cứu và tham gia triển khai các dự án
                 công nghệ, đội ngũ sáng lập BenHub nhận ra một nghịch lý lớn:
                 Vận Tải công trình có quy mô 60–80 tỷ USD mỗi năm nhưng vẫn đang
                 vận hành bằng phiếu giấy, cuộc gọi điện thoại và bảng Excel."

paragraph-2:    "Hàng nghìn chuyến xe ben mỗi ngày. Hàng triệu phiếu vận tải
                 viết tay. Công nợ kéo dài 30–90 ngày. Thất thoát vật liệu
                 5–20% mỗi dự án. Không một dashboard. Không một dữ liệu tập
                 trung. Trong khi đó, Grab đã số hóa taxi, Shopee đã số hóa
                 thương mại điện tử — vận tải công trình gần như bị bỏ ngỏ."

paragraph-3:    "BenHub được xây dựng để lấp đầy khoảng trống đó."
                // font-medium, text-navy
```

**Content — cột phải (timeline CSS/SVG):**

```
Các mốc theo chiều dọc, dot màu gold, line nối navy:

2023  →  Nghiên cứu thị trường, xác định bài toán
2024  →  Xây dựng nền tảng công nghệ, thử nghiệm
2025  →  Ra mắt chính thức, triển khai pilot
2026  →  Mở rộng 6 tỉnh thành, 5,000+ xe
2027+ →  Mục tiêu 50,000+ xe, liên tỉnh toàn quốc
```

---

### S3 — MISSION & VISION

```tsx
// Layout: bg-[#0F2246] (navy), 2 cards ngang
// Mỗi card: border border-white/10, bg-white/5, rounded-xl, p-8
```

**Card 1 — Sứ mệnh:**

```
icon:     rocket (Phosphor / Lucide)     // text-gold, w-10 h-10
label:    "SỨ MỆNH"                      // text-gold/70, text-xs tracking-widest
headline: "Dùng công nghệ để minh bạch hóa,
           tối ưu hóa và hiện đại hóa
           ngành vận tải công trình"      // text-white, text-xl font-semibold
```

**Card 2 — Tầm nhìn:**

```
icon:     eye / target                   // text-gold, w-10 h-10
label:    "TẦM NHÌN"                     // text-gold/70, text-xs tracking-widest
headline: "Trở thành Construction
           Logistics Operating System
           hàng đầu Việt Nam và ASEAN"   // text-white, text-xl font-semibold

sub-timeline:
  2030 → Nền tảng vận tải công trình số 1 Việt Nam
  2035 → Construction Logistics OS hàng đầu ASEAN
```

---

### S4 — CORE VALUES (Giá trị cốt lõi)

```tsx
// Layout: bg-white, grid 5 cột desktop / 2-3 cột tablet / 1 cột mobile
// Mỗi card: border-l-4 border-gold, bg-slate-50, rounded-lg, p-6
// Hover: shadow-md translateY(-4px) transition-300
```

**5 Values:**

```
1. MINH BẠCH          Transparency
   icon: eye
   desc: "Mọi chuyến xe đều có dữ liệu xác thực.
          Không thể gian lận khi mọi thứ đều được ghi nhận."

2. HIỆU QUẢ           Efficiency
   icon: zap / lightning
   desc: "Tối ưu vận hành bằng công nghệ và dữ liệu.
          Mỗi quyết định đều dựa trên thực tế, không phải cảm tính."

3. TIN CẬY            Reliability
   icon: shield-check
   desc: "Xây dựng nền tảng ổn định, đáng tin cậy.
          Dữ liệu luôn chính xác, hệ thống luôn sẵn sàng."

4. ĐỔI MỚI            Innovation
   icon: sparkles / brain
   desc: "Liên tục cải tiến bằng AI và dữ liệu.
          Công nghệ là lợi thế cạnh tranh dài hạn của BenHub."

5. HỆ SINH THÁI       Ecosystem
   icon: network / tree
   desc: "Phát triển giá trị cho toàn bộ chuỗi ngành.
          BenHub mạnh hơn khi hệ sinh thái mạnh hơn."
```

---

### S5 — ECOSYSTEM (Hệ sinh thái sản phẩm)

```tsx
// Layout: bg-[#F8FAFC], text center
// Sub-layout: hexagon-like grid hoặc 4+4 grid đơn giản
// Mỗi product card: icon + tên + 1 dòng mô tả
```

**Intro:**

```
label:    "HỆ THỐNG SẢN PHẨM"
headline: "8 sản phẩm. 1 hệ sinh thái.
           Toàn bộ chuỗi logistics công trình."
subtext:  "BenHub không chỉ là một app gọi xe — đây là hạ tầng số
           phủ toàn bộ chuỗi giá trị từ điều phối, quản lý đến tài chính."
```

**8 Products (grid 4x2):**

```
BenHub Core       → Trung tâm điều hành, dashboard realtime
BenHub Driver     → App tài xế, E-Ticket, GPS, ví tiền
BenHub Supervisor → Giám sát công trường, kiểm tải, kiểm ảnh
BenHub Fleet      → Quản lý đội xe, bảo dưỡng, chi phí
BenHub Marketplace→ Sàn kết nối, matching, dynamic pricing
BenHub Finance    → Factoring, ứng tiền, ví điện tử
BenHub Materials  → Sàn vật liệu, kết nối mỏ
BenHub AI Labs    → AI routing, chống gian lận, dự báo
```

---

### S6 — MILESTONES (Lộ trình phát triển)

```tsx
// Layout: bg-[#0F2246], horizontal timeline desktop / vertical mobile
// 3 giai đoạn, dùng CSS timeline với connector line màu gold
```

**3 Phases:**

```
Phase 1 — 2025–2026 — "Xây Nền Tảng"
  badge:    "ĐANG TRIỂN KHAI"           // bg-gold text-navy
  items:
    - Hoàn thiện nền tảng công nghệ
    - 5,000+ xe tham gia hệ sinh thái
    - 10+ dự án vận hành thực tế
    - Chuẩn hóa E-Ticket & GPS routing
    - Triển khai tại 6 tỉnh thành

Phase 2 — 2026–2028 — "Mở Rộng Hệ Sinh Thái"
  badge:    "SẮP TỚI"                   // bg-white/10 text-white/70
  items:
    - 50,000+ xe trên nền tảng
    - Ra mắt BenHub Marketplace
    - Tích hợp BenHub Finance
    - AI Dispatch toàn quốc
    - Data logistics liên tỉnh

Phase 3 — 2028–2035 — "Hạ Tầng Quốc Gia"
  badge:    "TẦM NHÌN"                  // bg-white/10 text-white/70
  items:
    - Construction Logistics OS
    - Mở rộng thị trường ASEAN
    - ESG & Carbon logistics platform
    - AI & Financial infrastructure
    - IPO vision
```

---

### S7 — LEADERSHIP (Đội ngũ lãnh đạo)

```tsx
// Layout: bg-white, grid 3 cột desktop / 2 cột tablet / 1 cột mobile
// Chỉ render section này nếu có data — dùng conditional rendering
// Nếu chưa có data thực tế: dùng placeholder data bên dưới
```

**Component structure:**

```tsx
interface Leader {
  name: string;
  title: string;
  bio: string; // 2-3 dòng
  avatar?: string; // URL ảnh, nếu không có dùng initials
  linkedin?: string;
}
```

**Placeholder data (thay bằng data thực khi có):**

```tsx
const leaders: Leader[] = [
  {
    name: "Nguyễn Văn An",
    title: "CEO & Co-Founder",
    bio: "10+ năm kinh nghiệm trong ngành logistics và công nghệ. Cựu quản lý cấp cao tại các tập đoàn xây dựng lớn tại Việt Nam.",
  },
  {
    name: "Cao Quốc Thắng",
    title: "CTO & Co-Founder",
    bio: "Chuyên gia về AI và hệ thống phân tán. Từng xây dựng platform logistics cho 3 quốc gia Đông Nam Á.",
  },
  {
    name: "Lê Văn Lộc",
    title: "COO",
    bio: "15 năm vận hành đội xe và dự án hạ tầng. Am hiểu sâu về bài toán logistics công trình từ thực tế hiện trường.",
  },
];
```

**Card layout:**

```
┌────────────────────────┐
│  [Avatar 80px — circle]│
│  Tên lãnh đạo          │
│  Chức danh — text-gold │
│  Bio — text-slate text-sm
│  [LinkedIn icon]       │
└────────────────────────┘
```

---

### S8 — PRESENCE (Hiện diện toàn quốc)

```tsx
// Layout: bg-[#F8FAFC], 2 cột — text trái, map/visual phải
// Visual: SVG simplified map hoặc card grid tỉnh thành
```

**Content — cột trái:**

```
label:    "HIỆN DIỆN"
headline: "Đang vận hành tại
           6 tỉnh thành"
subtext:  "BenHub phát triển theo mô hình 'Một tỉnh – Một pháp nhân –
           Một hệ sinh thái địa phương', kết hợp sức mạnh công nghệ
           trung ương với mạng lưới đối tác địa phương."
```

**6 Province cards (grid 3x2):**

```tsx
const provinces = [
  { name: "Hà Nội", entity: "BenHub Hà Nội", status: "active" },
  { name: "Nghệ An", entity: "BenHub Nghệ An", status: "active" },
  { name: "Quảng Ninh", entity: "BenHub Quảng Ninh", status: "active" },
  { name: "Đồng Nai", entity: "BenHub Đồng Nai", status: "active" },
  { name: "Bình Dương", entity: "BenHub Bình Dương", status: "active" },
  { name: "Long An", entity: "BenHub Long An", status: "active" },
];
// status "active" → dot xanh + "Đang vận hành"
// status "coming" → dot vàng + "Sắp ra mắt"
```

**Ownership model note:**

```
// Small callout box bên dưới grid
"Mô hình cổ đông: BenHub Việt Nam (51%) · Đối tác địa phương (39%) · ESOP (10%)"
// bg-navy/5, border-l-4 border-gold, text-sm text-slate
```

---

### S9 — JOIN US (CTA cuối trang)

```tsx
// Layout: bg-gradient từ #0F2246 sang #1E3A5F, text center
// Có 2 track CTA: tham gia hệ sinh thái hoặc làm việc cùng BenHub
```

**Content:**

```
headline: "Cùng chúng tôi xây dựng
           hạ tầng số cho ngành
           xây dựng Việt Nam"           // Barlow Condensed 700, text-white

subtext:  "Dù bạn là chủ đội xe, tài xế, chủ đầu tư hay nhà đầu tư —
           BenHub có chỗ cho bạn trong hệ sinh thái này."

CTAs:
  primary:   "Tham gia hệ sinh thái →"  // bg-gold text-navy
             href="/doi-tac"
  secondary: "Xem cơ hội việc làm"      // border-white text-white
             href="/tuyen-dung"          // page chưa có → href="#" tạm thời
```

**3 mini cards bên dưới buttons:**

```
🚛 Chủ Đội Xe      → /doi-tac/chu-doi-xe
👤 Tài Xế          → /doi-tac/tai-xe
🏗️ Chủ Đầu Tư    → /doi-tac/chu-dau-tu
```

---

## 5. SHARED COMPONENTS — CẦN DÙNG LẠI

```tsx
// Các component đã có, KHÔNG viết lại:
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import StatCounter from "@/components/ui/StatCounter";

// SectionLabel props:
// <SectionLabel text="VỀ CHÚNG TÔI" />
// → renders: text-gold uppercase tracking-widest text-sm font-medium

// StatCounter props:
// <StatCounter value={5000} suffix="+" label="Xe tham gia" />
// → renders: animated counter khi scroll vào viewport
```

---

## 6. ANIMATION

```tsx
// Dùng Framer Motion — đã cài sẵn
// Pattern chuẩn cho tất cả sections:

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

// Wrap mỗi section content với:
<motion.div
  variants={fadeUpVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

```tsx
// StatCounter: dùng useInView + useState để trigger count animation
// Chỉ chạy 1 lần khi element vào viewport
```

---

## 7. SEO

```tsx
// app/ve-chung-toi/page.tsx — export metadata

export const metadata: Metadata = {
  title: "Về Chúng Tôi | BenHub — Construction Logistics Platform",
  description:
    "BenHub là nền tảng logistics công trình hàng đầu Việt Nam. Tìm hiểu câu chuyện, sứ mệnh, giá trị cốt lõi và đội ngũ đứng sau hệ điều hành số cho ngành vận tải công trình.",
  openGraph: {
    title: "Về BenHub — Hệ Điều Hành Số Cho Vận Tải Công Trình",
    description:
      "Từ bất cập thực tế đến nền tảng quốc gia — câu chuyện hình thành BenHub Việt Nam.",
    url: "https://benhub.vn/ve-chung-toi",
    images: [{ url: "/og-about.png", width: 1200, height: 630 }],
  },
};
```

---

## 8. COMPONENT FILE STRUCTURE

```
app/
└── ve-chung-toi/
    └── page.tsx                    ← entry point, import tất cả sections

components/
└── pages/
    └── about/
        ├── HeroSection.tsx
        ├── StorySection.tsx
        ├── MissionVisionSection.tsx
        ├── CoreValuesSection.tsx
        ├── EcosystemSection.tsx
        ├── MilestonesSection.tsx
        ├── LeadershipSection.tsx
        ├── PresenceSection.tsx
        └── JoinUsSection.tsx
```

---

## 9. RESPONSIVE BREAKPOINTS

```
Mobile:   < 768px   → 1 cột, padding px-4, font scale nhỏ hơn
Tablet:   768–1024  → 2 cột, padding px-8
Desktop:  > 1024px  → layout đầy đủ theo spec, max-w-7xl mx-auto px-6
```

---

## 10. CHECKLIST TRƯỚC KHI HOÀN THÀNH

```
□ Tất cả sections render đúng trên mobile
□ Không có hardcode color — dùng đúng brand tokens
□ Mỗi section có SectionLabel component
□ Animation chỉ chạy 1 lần (once: true)
□ StatCounter trigger đúng khi scroll
□ Leadership section: ẩn nếu leaders array rỗng
□ Province cards: status dot đúng màu
□ CTA buttons đúng href
□ Metadata SEO đã export
□ Không có console.error khi build
□ TypeScript strict — không có `any`
```
