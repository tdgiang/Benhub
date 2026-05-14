# PRD — Trang Tin Tức BenHub
**Page-Level Product Requirements Document**
**Version:** 1.0
**Ngày tạo:** 14/05/2026
**Author:** BA Team
**Status:** Draft — Chờ Review

---

## 1. THÔNG TIN TRANG

| Thuộc tính | Giá trị |
|-----------|---------|
| URL | `https://benhub.vn/tin-tuc` |
| Page type | News / Blog Listing + Detail |
| Framework | Next.js 14 (App Router) |
| Ngôn ngữ | Tiếng Việt |
| Responsive | Mobile-first |
| Route files | `app/tin-tuc/page.tsx` (listing) · `app/tin-tuc/[slug]/page.tsx` (detail) |
| Rendering | ISR (Incremental Static Regeneration) — revalidate 60s |

---

## 2. MỤC TIÊU TRANG

### 2.1 Mục tiêu kinh doanh
- Xây dựng uy tín thương hiệu BenHub là đơn vị dẫn dắt tư duy ngành logistics công trình
- Tạo nội dung SEO hữu cơ thu hút traffic từ các chủ đầu tư, tổng thầu, nhà đầu tư
- Cập nhật tin tức nội bộ: milestone, mở rộng tỉnh thành, hợp tác chiến lược

### 2.2 Mục tiêu người dùng
- Đọc tin tức, cập nhật mới nhất từ BenHub và ngành logistics xây dựng
- Tìm kiếm bài viết theo chủ đề quan tâm
- Chia sẻ bài viết qua mạng xã hội (Zalo, Facebook, LinkedIn)

### 2.3 KPI
| Metric | Target |
|--------|--------|
| Avg. time on article page | ≥ 3 phút |
| Scroll depth article | ≥ 70% |
| CTA click từ article → register | ≥ 3% readers |
| Organic search traffic | Tăng 20%/tháng sau tháng 3 |
| Social share rate | ≥ 5% readers/bài |

---

## 3. KIẾN TRÚC TRANG

Trang Tin Tức gồm **2 sub-page:**

```
/tin-tuc                    → Listing page (danh sách bài viết)
/tin-tuc/[slug]             → Detail page (chi tiết bài viết)
```

---

## 4. PHÂN LOẠI NỘI DUNG (Categories)

| Category ID | Tên hiển thị | Mô tả | Màu tag |
|------------|-------------|-------|---------|
| `tin-benhub` | Tin BenHub | Milestone, ra mắt sản phẩm, mở rộng tỉnh, hợp tác | Cam `#F97316` |
| `nganh-logistics` | Ngành Logistics | Phân tích thị trường, xu hướng ngành vận tải công trình | Navy `#1E3A5F` |
| `cong-nghe` | Công Nghệ | AI, GPS, E-ticket, số hóa vận tải | Teal `#0F6E56` |
| `chinh-sach` | Chính Sách | Quy định nhà nước, hạ tầng quốc gia, đầu tư công | Slate `#475569` |
| `case-study` | Case Study | Câu chuyện thành công từ dự án thực tế | Amber `#B45309` |

---

## 5. LISTING PAGE — `/tin-tuc`

### 5.1 Layout Tổng Thể

```
┌──────────────────────────────────────────────┐
│  NAVBAR (shared component)                   │
├──────────────────────────────────────────────┤
│  PAGE HERO                                   │
│  "Tin Tức & Góc Nhìn"                        │
│  [Search bar]                                │
├──────────────────────────────────────────────┤
│  FEATURED ARTICLE (bài nổi bật)              │
│  [Full-width card — ảnh lớn + excerpt]       │
├──────────────────────────────────────────────┤
│  CATEGORY FILTER BAR                         │
│  [Tất cả] [Tin BenHub] [Ngành] [CN] [CS]    │
├──────────────────────────────────────────────┤
│  ARTICLE GRID                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │ Card 1   │ │ Card 2   │ │ Card 3   │     │
│  └──────────┘ └──────────┘ └──────────┘     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │ Card 4   │ │ Card 5   │ │ Card 6   │     │
│  └──────────┘ └──────────┘ └──────────┘     │
├──────────────────────────────────────────────┤
│  PAGINATION                                  │
├──────────────────────────────────────────────┤
│  CTA BANNER — "Tham gia hệ sinh thái"        │
├──────────────────────────────────────────────┤
│  FOOTER (shared component)                   │
└──────────────────────────────────────────────┘
```

---

### 5.2 Page Hero

**Layout:**
```
┌──────────────────────────────────────────────┐
│  [Background: dark navy, subtle pattern]      │
│                                              │
│  Tin Tức & Góc Nhìn                          │
│  Cập nhật mới nhất từ BenHub và ngành        │
│  logistics xây dựng Việt Nam                 │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │  🔍  Tìm kiếm bài viết...           │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

**Content:**

| Element | Nội dung |
|---------|---------|
| Section label | `TIN TỨC & INSIGHTS` |
| Headline | `Tin Tức & Góc Nhìn` |
| Sub-text | `Cập nhật mới nhất từ BenHub và ngành logistics xây dựng Việt Nam` |
| Search placeholder | `Tìm kiếm bài viết, chủ đề, từ khóa...` |

**Search behavior:**
- Debounce 300ms khi user gõ
- Lọc realtime danh sách bài viết theo `title` + `tags`
- Khi có kết quả: ẩn Featured Article, ẩn Category Filter, hiện search results grid
- Khi xóa search: restore về trạng thái mặc định
- Không có kết quả: hiện empty state "Không tìm thấy bài viết phù hợp"

---

### 5.3 Featured Article

Bài được gắn cờ `isFeatured: true` trong CMS.

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Thumbnail ảnh — 60% width]  │ [Content]    │
│                              │ [Tag badge]  │
│                              │ [Title H2]   │
│                              │ [Excerpt]    │
│                              │ [Meta: date  │
│                              │  + read time]│
│                              │ [Đọc tiếp →] │
└─────────────────────────────────────────────┘
```

**Content fields:**

| Field | Spec |
|-------|------|
| Tag badge | Category name + màu category |
| Title | H2, max 2 dòng, ellipsis nếu dài hơn |
| Excerpt | Max 3 dòng, 150 ký tự |
| Author avatar | Ảnh tròn 32px + tên tác giả |
| Date | Format: "14 tháng 5, 2026" |
| Read time | Tính tự động: `Math.ceil(wordCount / 200)` phút |
| CTA | "Đọc bài viết →" — link đến `/tin-tuc/[slug]` |

**Hover:** thumbnail scale 1.03, title underline, transition 300ms

---

### 5.4 Category Filter Bar

**Layout:** Horizontal scroll trên mobile, inline trên desktop

```
[ Tất cả ]  [ Tin BenHub ]  [ Ngành Logistics ]  [ Công Nghệ ]  [ Chính Sách ]  [ Case Study ]
```

**Behavior:**
- Default active: "Tất cả"
- Click category: filter article grid, update URL param `?category=tin-benhub`
- Active state: background cam, text trắng
- Inactive: border mỏng, text secondary
- Số lượng bài trong mỗi category hiện dạng badge nhỏ: `Tin BenHub (12)`

**URL behavior:**
- Filter state được sync vào URL query param
- Có thể share link với filter đã chọn
- Back button giữ nguyên filter state

---

### 5.5 Article Grid

**Layout:** 3 cột desktop / 2 cột tablet / 1 cột mobile

```
┌──────────────────────────────┐
│ [Thumbnail 16:9]             │
│ [Category tag]               │
│ [Title — max 2 dòng]         │
│ [Excerpt — max 2 dòng]       │
│ ──────────────────────────── │
│ [Avatar] [Author] · [Date]   │
│                  [Read time] │
└──────────────────────────────┘
```

**Content fields per card:**

| Field | Spec | Validation |
|-------|------|-----------|
| Thumbnail | Tỷ lệ 16:9, lazy load, có skeleton placeholder | Required |
| Category tag | Màu theo category ID | Required |
| Title | Font 500, 15px, max 2 dòng, ellipsis | Required, max 80 ký tự |
| Excerpt | 14px, color secondary, max 2 dòng | Optional, max 120 ký tự |
| Author avatar | Ảnh tròn 24px | Optional, fallback initials |
| Author name | 13px, color secondary | Required |
| Date | "14/05/2026" | Required |
| Read time | "5 phút đọc" | Auto-calculated |

**Hover state:**
- Card: shadow nhẹ, translateY(-2px), transition 200ms
- Thumbnail: scale 1.04 với overflow hidden
- Title: color primary → cam

**Skeleton loading:** Hiện skeleton cards khi đang fetch data (3 cards x 2 rows)

---

### 5.6 Pagination

**Style:** Simple numbered pagination

```
← Trước   [1]  [2]  [3]  ...  [8]  Tiếp →
```

**Behavior:**
- 9 bài/trang
- Active page: background cam, text trắng
- URL param: `?page=2`
- Scroll to top khi đổi trang
- Disabled state khi ở trang đầu/cuối

---

### 5.7 CTA Banner

Đặt cuối listing page, trước footer.

```
┌──────────────────────────────────────────────┐
│  [Background: cam gradient nhẹ]              │
│                                              │
│  Sẵn sàng tham gia hệ sinh thái BenHub?     │
│  Hơn 5,000 xe và đội tài xế đã tin tưởng.  │
│                                              │
│  [Đăng ký ngay →]   [Xem demo]              │
└──────────────────────────────────────────────┘
```

| Element | Action |
|---------|--------|
| "Đăng ký ngay →" | Link đến `/#register` |
| "Xem demo" | Link đến `mailto:contact@benhub.vn` hoặc form demo |

---

## 6. DETAIL PAGE — `/tin-tuc/[slug]`

### 6.1 Layout Tổng Thể

```
┌──────────────────────────────────────────────┐
│  NAVBAR                                      │
├──────────────────────────────────────────────┤
│  BREADCRUMB                                  │
│  Trang chủ / Tin tức / [Tên bài]            │
├──────────────────────────────────────────────┤
│  ARTICLE HEADER                              │
│  [Category] [Title] [Meta] [Share]           │
├──────────────────────────────────────────────┤
│  HERO IMAGE (full-width)                     │
├────────────────────────────┬─────────────────┤
│  ARTICLE BODY (70%)        │  SIDEBAR (30%)  │
│  [Nội dung bài viết]       │  [Table of      │
│                            │   Contents]     │
│                            │  [Related       │
│                            │   articles]     │
│                            │  [CTA card]     │
├──────────────────────────────────────────────┤
│  AUTHOR BIO                                  │
├──────────────────────────────────────────────┤
│  RELATED ARTICLES                            │
├──────────────────────────────────────────────┤
│  CTA BANNER                                  │
├──────────────────────────────────────────────┤
│  FOOTER                                      │
└──────────────────────────────────────────────┘
```

---

### 6.2 Breadcrumb

```
🏠 Trang chủ  /  Tin tức  /  [Tên bài viết rút gọn max 40 ký tự]
```

- Schema markup: `BreadcrumbList` JSON-LD
- Responsive: trên mobile chỉ hiện "← Tin tức"

---

### 6.3 Article Header

```
┌──────────────────────────────────────────────┐
│  [Category tag badge]                        │
│                                              │
│  [H1 — Tiêu đề bài viết đầy đủ]             │
│                                              │
│  [Excerpt / Sapo — 1 đoạn tóm tắt]         │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [Avatar] [Tên tác giả] · [Ngày] ·     │  │
│  │          [X phút đọc]                  │  │
│  │                         [Share icons]  │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

**Content spec:**

| Element | Spec |
|---------|------|
| Category tag | Màu theo category, pill shape |
| H1 | Font 700, 32px desktop / 26px mobile, line-height 1.2 |
| Sapo | 18px, color secondary, font-style italic, border-left cam 3px |
| Author avatar | Ảnh tròn 40px |
| Author name | "Bởi [Tên tác giả]" — link đến author profile (phase 2) |
| Date | "14 tháng 5, 2026 · Cập nhật: 15/05/2026" |
| Read time | "7 phút đọc" |

**Share icons:**
- Facebook → `https://facebook.com/sharer/sharer.php?u={url}`
- Zalo → `https://zalo.me/share/...`
- LinkedIn → `https://linkedin.com/shareArticle?url={url}`
- Copy link → clipboard API, hiện tooltip "Đã sao chép!"
- Mỗi icon: 32px, hover màu brand của mạng xã hội đó

---

### 6.4 Hero Image

- Full width, tỷ lệ 21:9 desktop / 16:9 mobile
- `alt` tag = title bài viết
- Lazy load với blur placeholder (Next.js Image component)
- Caption nếu có: hiện dưới ảnh, font 13px, color tertiary, italic

---

### 6.5 Article Body

**Chiều rộng:** 70% desktop (max 680px), 100% mobile

**Typography cho nội dung:**

| Element | Spec |
|---------|------|
| Paragraph | 17px, line-height 1.8, color primary |
| H2 | 24px, font 500, margin-top 2rem |
| H3 | 20px, font 500, margin-top 1.5rem |
| H4 | 17px, font 500 |
| Bold | Font 500 — không dùng 700 |
| Link | Màu cam, underline, hover darker |
| Blockquote | Border-left 4px cam, padding-left 1rem, italic, color secondary |
| Code inline | Font mono, background secondary, padding 2px 6px, radius 4px |
| Code block | Font mono, background `#0F172A`, text trắng, padding 1rem, radius 8px, copy button |
| Image trong bài | Full width column, caption dưới, border-radius 8px |
| Table | Border collapse, header background secondary, stripe rows |
| List (ul/ol) | Line-height 1.8, gap 4px giữa items |
| Divider `---` | Border top 1px, margin 2rem 0 |
| Callout box | Background info/warning/tip, border-left 4px, padding 1rem |

**Reading progress indicator:**
- Progress bar mỏng 3px, màu cam, fixed top (dưới navbar)
- Hiện % scroll đã đọc

---

### 6.6 Sidebar (Desktop only — ẩn trên mobile)

**Sticky sidebar** — cuộn theo bài viết đến khi chạm footer

**Block 1 — Table of Contents:**
```
┌─────────────────────────┐
│ Mục lục bài viết        │
│ ─────────────────────── │
│ • Giới thiệu            │
│ • Phần 1: ...           │
│   › 1.1 ...             │
│   › 1.2 ...             │
│ • Phần 2: ...           │
│ • Kết luận              │
└─────────────────────────┘
```

- Auto-generated từ H2, H3 trong bài
- Active highlight heading đang trong viewport (IntersectionObserver)
- Click → smooth scroll đến heading
- Hiện khi bài có ≥ 3 headings

**Block 2 — CTA Card:**
```
┌─────────────────────────┐
│ 🚛                      │
│ Tham gia BenHub         │
│ Đăng ký để nhận cuốc   │
│ xe đều và quản lý đội  │
│ xe dễ dàng hơn.         │
│                         │
│ [Đăng ký ngay →]        │
└─────────────────────────┘
```

**Block 3 — Related Articles (mini):**
```
┌─────────────────────────┐
│ Bài viết liên quan      │
│ ─────────────────────── │
│ [Thumb] [Title 2 dòng]  │
│ [Thumb] [Title 2 dòng]  │
│ [Thumb] [Title 2 dòng]  │
└─────────────────────────┘
```
- 3 bài cùng category hoặc cùng tag
- Thumb 60px x 60px, tỷ lệ vuông

---

### 6.7 Author Bio

Hiện cuối bài, trước related articles.

```
┌──────────────────────────────────────────────┐
│  [Avatar 64px]  Tên Tác Giả                  │
│                 Chức danh tại BenHub          │
│                                              │
│  [Bio ngắn 2–3 dòng về tác giả]             │
└──────────────────────────────────────────────┘
```

---

### 6.8 Related Articles

3 bài viết cùng category, layout card ngang 3 cột (giống grid listing).

```
Bài viết liên quan

┌──────────┐  ┌──────────┐  ┌──────────┐
│ Card 1   │  │ Card 2   │  │ Card 3   │
└──────────┘  └──────────┘  └──────────┘
```

---

### 6.9 Mobile — Article Layout

Trên mobile, ẩn sidebar hoàn toàn. Table of Contents hiện dạng collapsible accordion ở đầu bài viết (trước nội dung), sau hero image.

```
[Hero Image]
▼ Mục lục bài viết   ← tap để mở/đóng
  • Phần 1
  • Phần 2
[Article content full width]
```

---

## 7. DATA MODEL

### 7.1 Article Schema

```typescript
interface Article {
  id: string
  slug: string                  // URL-friendly, unique
  title: string                 // Max 80 ký tự
  excerpt: string               // Max 160 ký tự
  sapo: string                  // Đoạn sapo, max 300 ký tự
  content: string               // HTML / Markdown
  thumbnail: {
    url: string
    alt: string
    width: number
    height: number
  }
  heroImage?: {
    url: string
    alt: string
    caption?: string
  }
  category: CategoryId          // 'tin-benhub' | 'nganh-logistics' | ...
  tags: string[]                // ['cao-toc', 'gps', 'e-ticket', ...]
  author: Author
  isFeatured: boolean
  status: 'draft' | 'published' | 'archived'
  publishedAt: string           // ISO 8601
  updatedAt: string
  readTimeMinutes: number       // Auto-calculated
  seo: {
    metaTitle: string
    metaDescription: string
    ogImage?: string
  }
}

interface Author {
  id: string
  name: string
  title: string                 // "Content Manager tại BenHub"
  avatar?: string
  bio?: string                  // Max 200 ký tự
}

type CategoryId =
  | 'tin-benhub'
  | 'nganh-logistics'
  | 'cong-nghe'
  | 'chinh-sach'
  | 'case-study'
```

---

## 8. API SPECIFICATION

### 8.1 Listing — GET /api/articles

**Query params:**

| Param | Type | Default | Mô tả |
|-------|------|---------|-------|
| `page` | number | 1 | Trang hiện tại |
| `limit` | number | 9 | Số bài/trang |
| `category` | string | null | Filter theo category slug |
| `search` | string | null | Full-text search |
| `sort` | string | `publishedAt:desc` | Sắp xếp |

**Response:**
```json
{
  "data": {
    "articles": [Article],
    "featured": Article | null,
    "total": 48,
    "page": 1,
    "totalPages": 6
  }
}
```

---

### 8.2 Detail — GET /api/articles/[slug]

**Response:**
```json
{
  "data": {
    "article": Article,
    "related": [Article]        // 3 bài liên quan
  }
}
```

**Error 404:**
```json
{
  "error": "Article not found",
  "code": "NOT_FOUND"
}
```

---

### 8.3 Categories — GET /api/articles/categories

**Response:**
```json
{
  "data": [
    {
      "id": "tin-benhub",
      "label": "Tin BenHub",
      "count": 12,
      "color": "#F97316"
    }
  ]
}
```

---

## 9. SEO SPECIFICATION

### 9.1 Listing Page

```tsx
export const metadata: Metadata = {
  title: 'Tin Tức & Góc Nhìn | BenHub — Logistics Công Trình',
  description: 'Cập nhật mới nhất về BenHub, ngành vận tải công trình và logistics xây dựng Việt Nam.',
  openGraph: {
    title: 'Tin Tức BenHub — Logistics Công Trình Việt Nam',
    description: 'Tin tức, phân tích thị trường và góc nhìn từ đội ngũ BenHub.',
    url: 'https://benhub.vn/tin-tuc',
    images: [{ url: '/og-tin-tuc.png', width: 1200, height: 630 }],
  },
}
```

### 9.2 Detail Page — Dynamic Metadata

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.slug)
  return {
    title: `${article.seo.metaTitle} | BenHub`,
    description: article.seo.metaDescription,
    openGraph: {
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      url: `https://benhub.vn/tin-tuc/${article.slug}`,
      images: [{ url: article.seo.ogImage || article.thumbnail.url }],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  }
}
```

### 9.3 JSON-LD Structured Data (Detail page)

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "[Article title]",
  "datePublished": "[ISO date]",
  "dateModified": "[ISO date]",
  "author": {
    "@type": "Person",
    "name": "[Author name]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "BenHub Việt Nam",
    "logo": { "@type": "ImageObject", "url": "https://benhub.vn/logo.png" }
  },
  "image": "[Hero image URL]",
  "description": "[Excerpt]"
}
```

### 9.4 Static Generation

```tsx
// Tạo tất cả slugs lúc build
export async function generateStaticParams() {
  const articles = await getAllArticleSlugs()
  return articles.map(({ slug }) => ({ slug }))
}
```

---

## 10. COMPONENT TREE

```
app/tin-tuc/
├── page.tsx                        // Listing page
└── [slug]/
    └── page.tsx                    // Detail page

components/news/
├── ArticleCard.tsx                 // Grid card
├── ArticleCardFeatured.tsx         // Featured card (lớn)
├── ArticleCardMini.tsx             // Sidebar related mini card
├── CategoryFilter.tsx              // Filter bar
├── SearchBar.tsx                   // Search input
├── ArticleHeader.tsx               // Detail: header section
├── ArticleBody.tsx                 // Detail: nội dung + typography
├── ArticleSidebar.tsx              // Detail: sidebar (TOC + CTA + related)
├── TableOfContents.tsx             // TOC auto-generated
├── ShareButtons.tsx                // Social share
├── AuthorBio.tsx                   // Author card
├── ReadingProgress.tsx             // Progress bar
├── ArticleSkeleton.tsx             // Loading skeleton
├── EmptyState.tsx                  // Không có bài viết
└── RelatedArticles.tsx             // Related articles grid
```

---

## 11. ACCESSIBILITY

- Tất cả ảnh có `alt` text mô tả nội dung
- Heading hierarchy đúng thứ tự (H1 → H2 → H3), không skip
- Share buttons có `aria-label`: "Chia sẻ lên Facebook"
- Category filter có `role="tablist"` và `aria-selected`
- TOC có `aria-label="Mục lục bài viết"`
- Reading progress bar có `role="progressbar"` với `aria-valuenow`
- Focus visible trên tất cả interactive elements
- Color contrast ratio ≥ 4.5:1 cho body text

---

## 12. PERFORMANCE

| Kỹ thuật | Áp dụng cho |
|---------|------------|
| ISR (revalidate 60s) | Listing + Detail page |
| `next/image` với lazy load | Tất cả thumbnail, hero image |
| Blur placeholder | Ảnh trong bài viết |
| `generateStaticParams` | Pre-render tất cả slug lúc build |
| Font subsetting | Chỉ load ký tự Latin + Vietnamese |
| `priority` prop | Hero image của Detail page |
| Skeleton UI | Card grid khi fetch |

---

## 13. CONTENT MANAGEMENT

Trang Tin Tức cần có **CMS** để team nội dung tự đăng bài mà không cần dev. Đề xuất:

| Option | Ưu điểm | Nhược điểm |
|--------|---------|-----------|
| **Notion + Notion API** | Team quen dùng, free | Rate limit API |
| **Contentful** | Headless CMS chuyên nghiệp | Có phí |
| **Sanity.io** | Real-time, GROQ query mạnh | Learning curve |
| **Tự build admin** | Full control, tích hợp NestJS | Tốn thời gian dev |

**Đề xuất giai đoạn 1:** Dùng **Notion** làm CMS tạm thời (nhanh, team quen). Giai đoạn 2 migrate sang Sanity hoặc tự build admin panel.

---

## 14. ACCEPTANCE CRITERIA

### Listing Page
- [ ] Hiển thị đúng featured article nổi bật
- [ ] Search debounce 300ms, filter đúng kết quả
- [ ] Category filter update URL param và giữ state khi back
- [ ] Pagination hoạt động đúng, scroll to top khi chuyển trang
- [ ] Skeleton loading hiện khi fetch data
- [ ] Empty state hiện khi không có kết quả search
- [ ] Responsive đúng: 3 cột → 2 cột → 1 cột

### Detail Page
- [ ] H1 đúng tiêu đề bài viết
- [ ] Reading progress bar cuộn đúng
- [ ] TOC auto-generate từ headings, highlight active heading
- [ ] Share buttons mở đúng URL chia sẻ
- [ ] Copy link hiện tooltip "Đã sao chép!"
- [ ] Related articles hiện đúng 3 bài cùng category
- [ ] Sidebar sticky đến footer
- [ ] Mobile ẩn sidebar, hiện TOC accordion
- [ ] 404 page khi slug không tồn tại

### SEO
- [ ] Meta title + description đúng cho mỗi bài
- [ ] OG image đúng khi share Facebook/Zalo
- [ ] JSON-LD structured data hợp lệ (test bằng Google Rich Results)
- [ ] Breadcrumb hiển thị trong Google Search

---

## 15. OPEN QUESTIONS

| # | Câu hỏi | Ảnh hưởng | Owner |
|---|---------|----------|-------|
| OQ-1 | CMS sẽ dùng Notion, Sanity, hay tự build? | Toàn bộ data layer | Tech Lead |
| OQ-2 | Ai là người viết và quản lý nội dung bài viết? | Content workflow | BenHub Team |
| OQ-3 | Comment section có cần không? (phase 1) | Scope | Product Owner |
| OQ-4 | Newsletter subscribe form có đặt trong trang tin tức không? | UX + Marketing | Marketing |
| OQ-5 | Bài viết có cần phân quyền (members-only) không? | Auth complexity | Product Owner |
| OQ-6 | Tracking bài đã đọc cho từng user không? | Analytics | Marketing |

---

## 16. LỊCH SỬ THAY ĐỔI

| Version | Ngày | Người thực hiện | Nội dung |
|---------|------|----------------|---------|
| 1.0 | 14/05/2026 | BA Team | Khởi tạo tài liệu |

---

*Tài liệu cần được review và sign-off bởi Product Owner và Tech Lead trước khi bắt đầu sprint.*
