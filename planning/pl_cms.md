# Kế hoạch xây dựng CMS & Backend
**Ngày:** 2026-05-15  
**Branch:** ui_2 → feature/cms-backend  
**Scope đã xác nhận:** Posts/Blog + Leads (view/filter/export) + Dashboard analytics thật  
**Editor:** TipTap rich-text  
**Priority:** Posts → Leads → Dashboard

---

## 1. Tổng quan hiện trạng

### Đã có
| Layer | Thành phần | Trạng thái |
|---|---|---|
| Backend | Auth module (JWT, refresh token) | ✅ Hoàn chỉnh |
| Backend | Users module (CRUD, cache) | ✅ Hoàn chỉnh |
| Backend | Prisma schema: `User`, `Post`, `Product` | ✅ Schema có, chưa có module Posts |
| Backend | Leads module | ❌ Chưa có (forms đang gọi nhưng 404) |
| Frontend CMS | Layout: Sidebar + Topbar | ✅ Hoàn chỉnh |
| Frontend CMS | Posts UI (list, create, edit) | ✅ UI có, dùng **in-memory store** |
| Frontend CMS | Dashboard UI | ✅ UI có, **dữ liệu hardcode** |
| Frontend CMS | Leads UI | ❌ Chưa có |

### Vấn đề cần giải quyết
1. `POST /api/v1/leads` trả 404 — form đăng ký tài xế/đối tác **đang mất data**
2. Posts backend module chưa tồn tại — CMS đang dùng `postsStore` in-memory (reset khi restart)
3. Dashboard hiển thị số liệu hardcode, không phản ánh thực tế

---

## 2. Kiến trúc tổng thể

```
┌─────────────────────────────────────────────┐
│           Frontend (Next.js 16)             │
│                                             │
│  /cms/posts   →  /api/v1/posts  (backend)  │
│  /cms/leads   →  /api/v1/leads  (backend)  │
│  /cms/dashboard → /api/v1/stats (backend)  │
│                                             │
│  Forms (landing) → POST /api/v1/leads      │
└────────────────┬────────────────────────────┘
                 │ HTTP / JWT Bearer
┌────────────────▼────────────────────────────┐
│           Backend (NestJS 11)               │
│                                             │
│  LeadsModule   — POST/GET/export           │
│  PostsModule   — CRUD + publish             │
│  StatsModule   — aggregate counts          │
│                                             │
│  PostgreSQL (via Prisma 7)                  │
│  Redis (cache)                              │
└─────────────────────────────────────────────┘
```

---

## 3. Backend — Thay đổi cần làm

### 3.1 Prisma Schema — thêm Lead model

```prisma
enum LeadSegment {
  driver
  partner
}

model Lead {
  id           String      @id @default(uuid())
  segment      LeadSegment
  fullName     String
  phone        String
  email        String?
  province     String?
  companyName  String?
  licensePlate String?
  projectScale String?
  fleetSize    Int?
  source       String?
  note         String?
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
  deletedAt    DateTime?

  @@map("leads")
}
```

**Migration:** `npx prisma migrate dev --name add-leads`

> Post model đã có trong schema — không cần sửa.

---

### 3.2 LeadsModule (mới hoàn toàn)

**Cấu trúc file:**
```
src/modules/leads/
  leads.module.ts
  application/leads.service.ts
  infrastructure/leads.repository.ts
  interface/leads.controller.ts
  interface/dto/
    create-lead.dto.ts
    lead-query.dto.ts       # filter: segment, province, dateFrom, dateTo
```

**Endpoints:**

| Method | Path | Auth | Mô tả |
|---|---|---|---|
| `POST` | `/api/v1/leads` | `@Public()` | Nhận form từ landing page |
| `GET` | `/api/v1/leads` | `@Roles(ADMIN)` | List + filter + pagination |
| `GET` | `/api/v1/leads/:id` | `@Roles(ADMIN)` | Detail |
| `GET` | `/api/v1/leads/export/csv` | `@Roles(ADMIN)` | Export CSV (stream) |
| `DELETE` | `/api/v1/leads/:id` | `@Roles(ADMIN)` | Soft delete |

**`create-lead.dto.ts` — các field từ form:**
```typescript
segment:     'driver' | 'partner'   // required
fullName:    string                  // required
phone:       string                  // required
email?:      string
province?:   string
companyName?: string                 // partner only
licensePlate?: string                // driver only
projectScale?: string
fleetSize?:  number
source?:     string
note?:       string
```

**`lead-query.dto.ts`:**
```typescript
segment?:    LeadSegment
province?:   string
dateFrom?:   string   // ISO date
dateTo?:     string
page?:       number
limit?:      number
```

**CSV Export** — dùng stream response:
- Header: `Content-Type: text/csv`, `Content-Disposition: attachment; filename="leads-{date}.csv"`
- Columns: id, segment, fullName, phone, email, province, companyName, licensePlate, source, note, createdAt
- Dùng `fast-csv` hoặc tự build string (không cần lib nặng)

**Cache:** list key `leads_list_*`, invalidate on create/delete.

---

### 3.3 PostsModule (mới — schema đã có)

**Cấu trúc file:**
```
src/modules/posts/
  posts.module.ts
  application/posts.service.ts
  infrastructure/posts.repository.ts
  interface/posts.controller.ts
  interface/dto/
    create-post.dto.ts
    update-post.dto.ts      # PartialType(CreatePostDto)
    post-query.dto.ts
```

**Endpoints:**

| Method | Path | Auth | Mô tả |
|---|---|---|---|
| `POST` | `/api/v1/posts` | `@Roles(ADMIN)` | Tạo bài viết |
| `GET` | `/api/v1/posts` | `@Public()` | List, filter status/page |
| `GET` | `/api/v1/posts/:id` | `@Public()` | Detail by ID |
| `GET` | `/api/v1/posts/slug/:slug` | `@Public()` | Detail by slug |
| `PATCH` | `/api/v1/posts/:id` | `@Roles(ADMIN)` | Cập nhật |
| `DELETE` | `/api/v1/posts/:id` | `@Roles(ADMIN)` | Soft delete |

**`create-post.dto.ts`:**
```typescript
title:    string   // required, min 3
slug:     string   // auto từ frontend, unique validation
content:  string   // HTML từ TipTap
excerpt?: string   // tóm tắt, max 300 ký tự
status:   'DRAFT' | 'PUBLISHED'
```

**Lưu ý:** `authorId` lấy từ JWT payload trong controller, không nhận từ client.

**Slug validation:** `posts.service.ts` check unique trước khi insert, throw `ConflictException` nếu trùng.

**Cache:** giống pattern trong `UsersService`.

---

### 3.4 StatsModule (mới — aggregate cho dashboard)

**Endpoint duy nhất:**

| Method | Path | Auth | Mô tả |
|---|---|---|---|
| `GET` | `/api/v1/stats` | `@Roles(ADMIN)` | Trả toàn bộ stats |

**Response:**
```typescript
{
  posts:         { total: number; published: number; draft: number }
  leads:         { total: number; driver: number; partner: number; thisWeek: number }
  users:         { total: number; active: number }
  recentLeads:   Lead[]    // 5 leads mới nhất
  recentPosts:   Post[]    // 5 posts mới nhất
}
```

**Cấu trúc:** Không cần full module — 1 service + 1 controller đơn giản trong `modules/stats/`.  
**Cache:** TTL 60s, key `stats_dashboard`.

---

## 4. Frontend CMS — Thay đổi cần làm

### 4.1 Wire Posts CMS lên backend thật

**Thay thế `/api/posts` (in-memory) bằng `/api/v1/posts` (backend):**

1. **`PostsTableClient.tsx`** — đổi fetch URL:
   - `GET /api/posts` → `GET /api/v1/posts?page=&limit=`  
   - `DELETE /api/posts/:id` → `DELETE /api/v1/posts/:id`

2. **`/cms/posts/new/PostFormWrapper.tsx`** — submit tới backend:
   - `POST /api/posts` → `POST /api/v1/posts`

3. **`/cms/posts/[id]/edit/EditPostFormWrapper.tsx`** — update + fetch:
   - `GET /api/posts/:id` → `GET /api/v1/posts/:id`
   - `PATCH /api/posts/:id` → `PATCH /api/v1/posts/:id`

4. **`PostForm.tsx`** — giữ nguyên interface, chỉ thêm field `excerpt`.

5. **Xóa** `src/app/api/posts/` (in-memory routes) và `src/lib/posts-store.ts` sau khi backend live.

> **Helper:** Dùng `src/lib/api.ts` (đã có) thay vì `fetch` trực tiếp — xử lý Bearer token tự động.

---

### 4.2 TipTap Editor

**Cài packages:**
```bash
pnpm add @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/extension-link @tiptap/extension-image @tiptap/extension-underline @tiptap/extension-text-align
```

**Component:** `src/components/cms/RichTextEditor.tsx`  
- Toolbar: Bold, Italic, Underline, H2, H3, BulletList, OrderedList, Link, Image (by URL), Align
- Output: HTML string → lưu vào `Post.content`
- Input: nhận `value: string` + `onChange: (html: string) => void`

**Tích hợp vào `PostForm.tsx`:**
```typescript
// Thay <textarea name="content" /> bằng:
<RichTextEditor value={content} onChange={setContent} />
```

**Hiển thị ở landing/blog:** dùng `dangerouslySetInnerHTML` bọc trong wrapper có CSS prose (`@tailwindcss/typography`).

---

### 4.3 Trang Leads CMS (mới)

**Route:** `src/app/cms/leads/page.tsx`

**UI cần có:**
```
┌─ Topbar: "Leads đăng ký" ───────────────────────┐
│                                                   │
│  Filter bar:  [Segment ▾]  [Tỉnh ▾]  [Từ ngày] [Đến ngày]  [Export CSV]  │
│                                                   │
│  Table:                                           │
│  | Họ tên | Điện thoại | Segment | Tỉnh | Nguồn | Ngày đăng ký |          │
│  | ...    | ...        | Driver  | HCM  | form  | 2026-05-15   |          │
│                                                   │
│  Pagination                                       │
└───────────────────────────────────────────────────┘
```

**Files cần tạo:**
- `src/app/cms/leads/page.tsx` — server component, fetch initial data
- `src/app/cms/leads/LeadsTableClient.tsx` — client: filter, pagination, export
- `src/app/cms/leads/loading.tsx` — skeleton
- `src/app/cms/leads/error.tsx` — error boundary

**Export CSV:** Button gọi `GET /api/v1/leads/export/csv` với Bearer token, trigger browser download.

**Sidebar:** Thêm link "Leads" vào `Sidebar.tsx`.

---

### 4.4 Dashboard — kết nối stats thật

**`/cms/dashboard/page.tsx`** — fetch từ `/api/v1/stats`:

```typescript
const stats = await apiFetch('/api/v1/stats')  // dùng lib/api.ts

// Thay hardcode:
{ title: "Tổng bài viết", value: stats.posts.total }
{ title: "Đã xuất bản",   value: stats.posts.published }
{ title: "Leads tuần này", value: stats.leads.thisWeek }
{ title: "Tổng leads",    value: stats.leads.total }

// Recent activity: dùng stats.recentLeads + stats.recentPosts
```

---

### 4.5 Slug auto-generate

Trong `PostForm.tsx`, thêm logic:
```typescript
// Khi title thay đổi và slug chưa được edit thủ công:
const autoSlug = title
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')  // bỏ dấu tiếng Việt
  .replace(/[^a-z0-9\s-]/g, '')
  .trim().replace(/\s+/g, '-')
```

---

## 5. Thứ tự implement

### Phase 1 — Backend Leads (ưu tiên nhất, forms đang mất data)
```
□ Thêm Lead model vào prisma schema
□ prisma migrate dev --name add-leads
□ Tạo LeadsModule: dto, repository, service, controller
□ Đăng ký vào AppModule
□ Test: POST /api/v1/leads từ form landing
□ Test: GET /api/v1/leads (với ADMIN token)
□ Implement CSV export endpoint
```

### Phase 2 — Backend Posts + Frontend wire-up
```
□ Tạo PostsModule: dto, repository, service, controller
□ Đăng ký vào AppModule
□ Cài TipTap packages
□ Tạo RichTextEditor component
□ Cập nhật PostForm dùng RichTextEditor + excerpt field
□ Wire PostsTableClient → backend
□ Wire PostFormWrapper (new) → backend
□ Wire EditPostFormWrapper → backend
□ Xóa in-memory routes + posts-store
□ Cài @tailwindcss/typography, style prose wrapper
```

### Phase 3 — Backend Stats + Dashboard + Leads CMS
```
□ Tạo StatsModule (service + controller)
□ Cập nhật dashboard/page.tsx fetch stats thật
□ Tạo leads/page.tsx + LeadsTableClient
□ Thêm link Leads vào Sidebar
□ Thêm error.tsx + loading.tsx cho leads route
```

---

## 6. Dependencies cần cài thêm

### Backend
```bash
# CSV export (nhẹ, không cần lib nếu dùng string builder)
# Không cần thêm gì — Prisma + NestJS đã đủ
```

### Frontend
```bash
pnpm add @tiptap/react @tiptap/pm @tiptap/starter-kit \
         @tiptap/extension-placeholder @tiptap/extension-link \
         @tiptap/extension-image @tiptap/extension-underline \
         @tiptap/extension-text-align

pnpm add @tailwindcss/typography
```

---

## 7. Rủi ro & lưu ý

| Rủi ro | Giải pháp |
|---|---|
| Leads đang live, form gọi 404 | **Build Phase 1 ngay** trước mọi thứ khác |
| TipTap output HTML có XSS | Sanitize bằng `dompurify` trước khi render ở frontend |
| Slug trùng khi tạo post | Backend throw `ConflictException`, frontend hiển thị lỗi inline |
| CSV với dữ liệu tiếng Việt | Set `BOM` ở đầu file CSV để Excel đọc đúng UTF-8 |
| Posts in-memory bị mất khi restart | Xóa sau khi backend live và đã migrate data (nếu có) |
| `@tailwindcss/typography` conflict với Tailwind v4 | Kiểm tra compatibility, có thể cần config riêng |

---

## 8. Không nằm trong scope này

- Quản lý Users/Admin accounts (sẽ plan riêng nếu cần)
- Image upload (S3/Cloudinary) — dùng URL input trước
- Lead assignment / pipeline status — phase 2 nếu sales team cần
- Email notification khi có lead mới — phase 2
- Đa ngôn ngữ CMS — không cần (CMS dùng nội bộ)
