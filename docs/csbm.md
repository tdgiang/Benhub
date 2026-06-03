# PAGE – CHÍNH SÁCH BẢO MẬT THÔNG TIN

# Route: `/chinh-sach-bao-mat`

---

## 1. MỤC TIÊU TRANG

Trang tĩnh pháp lý, trình bày toàn bộ chính sách bảo mật thông tin của Benhub.
Tuân thủ **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân tại Việt Nam.

---

## 2. METADATA

```tsx
export const metadata: Metadata = {
  title: "Chính sách bảo mật thông tin | Benhub",
  description:
    "Tìm hiểu cách Benhub thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng, đối tác tài xế và người dùng website.",
  robots: "index, follow",
};
```

---

## 3. LAYOUT TỔNG THỂ

```
<MiniHero />           ← Breadcrumb + Tiêu đề trang
<PolicyLayout>
  ├── <Sidebar />      ← Mục lục điều hướng (sticky, desktop only)
  └── <Content />      ← Nội dung 9 điều khoản
</PolicyLayout>
<UpdateBanner />       ← Ngày hiệu lực + nút in trang
```

**Breakpoint:**

- Desktop (`lg+`): 2 cột — sidebar 260px cố định bên trái, nội dung chiếm phần còn lại
- Mobile/Tablet: sidebar ẩn, chỉ hiển thị nội dung dọc

---

## 4. COMPONENT: `<MiniHero />`

```tsx
// Dùng component MiniHero dùng chung, truyền props:
<MiniHero
  breadcrumb={["Trang chủ", "Chính sách bảo mật"]}
  title="Chính sách bảo mật thông tin"
  subtitle="Cập nhật lần cuối: 01/01/2025 · Có hiệu lực từ: 01/01/2025"
/>
```

---

## 5. COMPONENT: `<PolicySidebar />`

**Vị trí:** `components/privacy/PolicySidebar.tsx`

**Hành vi:**

- `position: sticky; top: 80px` — bám theo scroll, không vượt quá footer
- Highlight mục đang xem (dùng `IntersectionObserver` theo `section id`)
- Click smooth-scroll tới section tương ứng

**Danh sách mục:**

```ts
const sections = [
  { id: "section-1", label: "1. Mục đích và phạm vi" },
  { id: "section-2", label: "2. Thông tin được thu thập" },
  { id: "section-3", label: "3. Mục đích sử dụng thông tin" },
  { id: "section-4", label: "4. Thời gian lưu trữ" },
  { id: "section-5", label: "5. Đối tượng tiếp cận" },
  { id: "section-6", label: "6. Chia sẻ với bên thứ ba" },
  { id: "section-7", label: "7. Quyền của người dùng" },
  { id: "section-8", label: "8. Bảo mật & Cookie" },
  { id: "section-9", label: "9. Liên hệ & Khiếu nại" },
];
```

**Render:**

```tsx
<nav aria-label="Mục lục chính sách">
  <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
    Nội dung
  </p>
  <ul className="space-y-1">
    {sections.map((s) => (
      <li key={s.id}>
        <a
          href={`#${s.id}`}
          className={cn(
            "block text-sm py-1.5 px-3 rounded-md transition-colors",
            activeId === s.id
              ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
              : "text-muted hover:text-secondary hover:bg-bg",
          )}
        >
          {s.label}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

---

## 6. COMPONENT: `<PolicyContent />`

**Vị trí:** `components/privacy/PolicyContent.tsx`

### Wrapper section dùng chung

```tsx
function PolicySection({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-heading text-xl font-bold text-secondary">
          {title}
        </h2>
      </div>
      {/* Body */}
      <div
        className="prose prose-slate max-w-none
        prose-p:text-muted prose-p:leading-relaxed
        prose-li:text-muted prose-li:leading-relaxed
        prose-strong:text-secondary prose-strong:font-semibold
        prose-h3:font-heading prose-h3:text-secondary prose-h3:font-semibold prose-h3:text-base
      "
      >
        {children}
      </div>
    </section>
  );
}
```

---

## 7. NỘI DUNG 9 ĐIỀU KHOẢN

> Dùng `<PolicySection>` wrapper cho mỗi điều. Nội dung viết bằng JSX (p, ul, li, strong).

---

### ĐIỀU 1 — Mục đích và phạm vi sử dụng thông tin

`id="section-1"` · Icon: `Shield`

```
Benhub là nền tảng vận chuyển vật liệu xây dựng B2B, cung cấp dịch vụ kết nối
giữa các doanh nghiệp, đại lý VLXD, nhà thầu với đội ngũ tài xế và phương tiện vận tải
chuyên nghiệp.

Chính sách bảo mật thông tin này ("Chính sách") giải thích cách Benhub thu thập, sử dụng,
lưu trữ và bảo vệ thông tin của người dùng (bao gồm khách hàng doanh nghiệp B2B, đối tác
tài xế, ứng viên tuyển dụng và khách truy cập website) khi sử dụng các dịch vụ và
website tại https://benhub.vn.

Bằng việc sử dụng dịch vụ của Benhub, người dùng xác nhận đã đọc, hiểu và đồng ý với
toàn bộ nội dung Chính sách này. Chính sách có thể được sửa đổi bởi Benhub và sẽ có
hiệu lực sau 05 (năm) ngày kể từ ngày đăng tải công khai trên website https://benhub.vn.
```

---

### ĐIỀU 2 — Thông tin được thu thập

`id="section-2"` · Icon: `Database`

**2.1 Thông tin người dùng tự cung cấp:**

```
Khi đăng ký, sử dụng dịch vụ hoặc điền form trên website, Benhub có thể thu thập:
• Họ và tên đầy đủ
• Tên công ty / doanh nghiệp (đối với khách hàng B2B)
• Mã số thuế doanh nghiệp (nếu có)
• Số điện thoại liên lạc
• Địa chỉ email
• Địa chỉ giao nhận hàng, địa chỉ công trình
• Thông tin phương tiện vận tải (đối với tài xế đăng ký hợp tác): loại xe, biển số,
  đăng kiểm, bảo hiểm
• Hồ sơ ứng tuyển: CV, thư giới thiệu (đối với ứng viên)
• Nội dung yêu cầu vận chuyển và phản hồi dịch vụ
```

**2.2 Thông tin thu thập tự động:**

```
• Địa chỉ IP, loại trình duyệt, hệ điều hành
• Thời gian truy cập, trang đã xem, thời lượng phiên
• Dữ liệu định vị (nếu người dùng cho phép) — dùng để xác định khu vực phục vụ
• Dữ liệu Cookie và công nghệ theo dõi tương tự
```

**2.3 Thông tin từ bên thứ ba:**

```
Benhub có thể tiếp nhận thông tin từ đối tác kinh doanh, nền tảng thương mại điện tử,
đơn vị cung cấp dịch vụ logistics, hoặc cơ quan nhà nước có thẩm quyền.
```

---

### ĐIỀU 3 — Mục đích sử dụng thông tin

`id="section-3"` · Icon: `Target`

```
Benhub sử dụng thông tin thu thập được cho các mục đích sau:

a) Cung cấp và vận hành dịch vụ
   • Xác minh danh tính, xử lý yêu cầu vận chuyển và kết nối tài xế phù hợp
   • Điều phối xe tải, theo dõi hành trình và xác nhận giao hàng
   • Xuất hóa đơn, chứng từ vận chuyển cho khách hàng B2B

b) Nâng cao chất lượng dịch vụ
   • Phân tích nhu cầu, tần suất sử dụng dịch vụ của từng khách hàng
   • Tối ưu hóa lộ trình và thời gian giao hàng
   • Phát triển tính năng, dịch vụ mới phù hợp với nhu cầu thị trường VLXD

c) Liên lạc và hỗ trợ
   • Thông báo trạng thái đơn hàng, xác nhận giao dịch qua email/SMS
   • Hỗ trợ khách hàng khi có sự cố, khiếu nại
   • Gửi thông tin về chính sách, chương trình ưu đãi (người dùng có thể từ chối)

d) An toàn và phòng chống gian lận
   • Phát hiện, ngăn chặn các hành vi gian lận, giả mạo thông tin
   • Bảo vệ quyền lợi của khách hàng và tài xế đối tác

e) Tuân thủ pháp lý
   • Lưu trữ hồ sơ theo quy định pháp luật về vận tải và thương mại
   • Cung cấp thông tin cho cơ quan nhà nước có thẩm quyền khi được yêu cầu
```

---

### ĐIỀU 4 — Thời gian lưu trữ thông tin

`id="section-4"` · Icon: `Clock`

**Render dạng bảng hoặc 3 card:**

```
┌─────────────────────────────┬──────────────────────────────────┐
│ Loại thông tin               │ Thời gian lưu trữ                │
├─────────────────────────────┼──────────────────────────────────┤
│ Hồ sơ khách hàng B2B        │ 60 tháng kể từ giao dịch cuối    │
│ Thông tin tài xế đối tác    │ 36 tháng kể từ ngày chấm dứt HĐ  │
│ Hồ sơ ứng viên tuyển dụng   │ 12 tháng kể từ ngày nộp hồ sơ   │
│ Nhật ký truy cập website     │ 12 tháng                         │
│ Hồ sơ pháp lý, hóa đơn      │ Theo quy định pháp luật (tối     │
│                              │ thiểu 10 năm theo Luật Kế toán)  │
└─────────────────────────────┴──────────────────────────────────┘

Sau khi hết thời hạn lưu trữ, Benhub sẽ xóa hoặc ẩn danh hóa toàn bộ dữ liệu
cá nhân theo quy trình bảo mật nội bộ.
```

**Render bảng bằng Tailwind:**

```tsx
<div className="overflow-x-auto">
  <table className="w-full text-sm border-collapse">
    <thead>
      <tr className="bg-secondary text-white">
        <th className="text-left px-4 py-3 font-semibold rounded-tl-lg">
          Loại thông tin
        </th>
        <th className="text-left px-4 py-3 font-semibold rounded-tr-lg">
          Thời gian lưu trữ
        </th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i} className={i % 2 === 0 ? "bg-bg" : "bg-white"}>
          <td className="px-4 py-3 text-secondary font-medium">{row.type}</td>
          <td className="px-4 py-3 text-muted">{row.duration}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

---

### ĐIỀU 5 — Đối tượng tiếp cận và quản lý thông tin

`id="section-5"` · Icon: `Users`

```
Benhub chỉ cho phép các đối tượng sau tiếp cận thông tin người dùng, trên nguyên tắc
"tối thiểu cần thiết" — chỉ cung cấp đúng thông tin cần thiết để thực hiện nhiệm vụ:

• Nhân viên và quản lý nội bộ Benhub có liên quan trực tiếp đến việc cung cấp dịch vụ
• Tài xế đối tác được điều phối — chỉ nhận thông tin địa chỉ giao hàng và tên liên lạc
• Đối tác công nghệ, nhà cung cấp hạ tầng điện toán đám mây (ký NDA bảo mật)
• Đối tác kiểm toán, tư vấn pháp lý độc lập (theo yêu cầu tuân thủ)
• Cơ quan nhà nước có thẩm quyền (Bộ Công an, Tòa án, Cơ quan thuế...)
  theo quy định pháp luật

Benhub cam kết không bán, cho thuê hoặc trao đổi thông tin người dùng
vì mục đích thương mại với bất kỳ bên thứ ba nào.
```

**Địa chỉ đơn vị quản lý thông tin:**

```tsx
// Render dưới dạng info card
<div className="mt-5 p-4 rounded-xl border border-border bg-bg">
  <p className="font-semibold text-secondary mb-2">
    Đơn vị thu thập và quản lý thông tin
  </p>
  <ul className="space-y-1 text-sm text-muted">
    <li>
      <strong>Tên công ty:</strong> Công ty cổ phần Benhub Việt Nam
    </li>
    <li>
      <strong>Địa chỉ:</strong> [Địa chỉ trụ sở Benhub], Hà Nội
    </li>
    <li>
      <strong>Email:</strong> privacy@benhub.vn
    </li>
    <li>
      <strong>Hotline:</strong> 024 777 67 666 (8:00 – 17:30, Thứ 2 – Thứ 6)
    </li>
  </ul>
</div>
```

---

### ĐIỀU 6 — Chia sẻ thông tin với bên thứ ba

`id="section-6"` · Icon: `Share2`

```
Benhub chỉ chia sẻ thông tin người dùng trong các trường hợp sau:

a) Thực hiện dịch vụ vận chuyển
   Thông tin giao hàng cơ bản (địa điểm, tên liên lạc) được chia sẻ với tài xế được
   chỉ định để thực hiện hành trình. Tài xế cam kết bảo mật theo hợp đồng hợp tác.

b) Đối tác cung cấp dịch vụ hỗ trợ
   Các nhà cung cấp dịch vụ đám mây, phân tích dữ liệu, gửi email/SMS ký hợp đồng
   bảo mật và chỉ được sử dụng thông tin đúng mục đích ủy quyền.

c) Tái cơ cấu doanh nghiệp
   Trong trường hợp Benhub sáp nhập, chuyển nhượng hoặc tái cơ cấu, người dùng sẽ
   được thông báo trước và pháp nhân mới phải kế thừa toàn bộ cam kết bảo mật này.

d) Tuân thủ pháp lý bắt buộc
   Khi có quyết định của Tòa án, lệnh điều tra của cơ quan công an, hoặc yêu cầu của
   cơ quan thuế và cơ quan nhà nước có thẩm quyền theo quy định pháp luật Việt Nam.

e) Bảo vệ lợi ích hợp pháp
   Khi cần thiết để ngăn chặn gian lận, bảo vệ an toàn tài sản, tính mạng của
   khách hàng, tài xế hoặc bên thứ ba.

Trong mọi trường hợp, Benhub không chia sẻ thông tin nhạy cảm như số tài khoản ngân hàng,
thông tin định danh cá nhân đầy đủ mà không có sự đồng ý rõ ràng của người dùng.
```

---

### ĐIỀU 7 — Quyền của người dùng

`id="section-7"` · Icon: `UserCheck`

**Render dạng 3×2 grid card:**

```
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│ 👁 Quyền truy cập    │  │ ✏️ Quyền chỉnh sửa   │  │ 🗑 Quyền xóa         │
│ Yêu cầu xem toàn bộ │  │ Cập nhật thông tin   │  │ Yêu cầu xóa dữ liệu │
│ dữ liệu Benhub đang │  │ không chính xác      │  │ cá nhân bất kỳ lúc  │
│ lưu trữ về bạn      │  │ theo yêu cầu         │  │ nào (trừ dữ liệu    │
│                      │  │                      │  │ bắt buộc pháp lý)   │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│ ⛔ Quyền phản đối    │  │ 📦 Quyền chuyển dữ   │  │ 📧 Quyền từ chối    │
│ Phản đối việc xử lý │  │ liệu                 │  │ tiếp thị            │
│ dữ liệu cho mục đích│  │ Nhận bản sao dữ liệu │  │ Hủy đăng ký nhận   │
│ tiếp thị trực tiếp  │  │ theo định dạng phổ   │  │ email/SMS quảng cáo │
│                      │  │ biến (JSON/CSV)      │  │ bất kỳ lúc nào     │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘

Để thực hiện các quyền trên, người dùng liên hệ:
Email: privacy@benhub.vn | Benhub sẽ phản hồi trong vòng 15 ngày làm việc.
```

**Render bằng grid Tailwind:**

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
  {rights.map((r) => (
    <div key={r.title} className="p-4 rounded-xl border border-border bg-white">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
        <r.Icon className="w-4 h-4 text-primary" />
      </div>
      <p className="font-semibold text-sm text-secondary mb-1">{r.title}</p>
      <p className="text-xs text-muted leading-relaxed">{r.desc}</p>
    </div>
  ))}
</div>
```

---

### ĐIỀU 8 — Bảo mật thông tin và Cookie

`id="section-8"` · Icon: `Lock`

**8.1 Biện pháp bảo mật kỹ thuật:**

```
Benhub áp dụng các tiêu chuẩn bảo mật sau để bảo vệ thông tin người dùng:
• Mã hóa dữ liệu truyền tải bằng giao thức TLS 1.3 (HTTPS)
• Mã hóa dữ liệu lưu trữ (AES-256)
• Kiểm soát truy cập nội bộ theo nguyên tắc phân quyền tối thiểu
• Giám sát hệ thống 24/7, phát hiện xâm nhập bất thường
• Sao lưu dữ liệu định kỳ, phục hồi thảm họa
• Kiểm tra bảo mật định kỳ bởi bên thứ ba độc lập
```

**8.2 Trách nhiệm người dùng:**

```
• Bảo mật thông tin đăng nhập, không chia sẻ mật khẩu
• Không cung cấp thông tin tài khoản Benhub cho website/nền tảng khác
• Thông báo ngay cho Benhub qua privacy@benhub.vn nếu phát hiện
  tài khoản bị truy cập trái phép
```

**8.3 Chính sách Cookie:**

```
Benhub sử dụng Cookie để:
• Duy trì phiên đăng nhập (Cookie thiết yếu — không thể tắt)
• Ghi nhớ tùy chọn ngôn ngữ, giao diện (Cookie chức năng)
• Phân tích lưu lượng truy cập để cải thiện dịch vụ (Cookie phân tích)
• Hiển thị nội dung phù hợp (Cookie tiếp thị — người dùng có thể từ chối)

Người dùng có thể quản lý Cookie tại: Cài đặt trình duyệt → Quyền riêng tư.
Tắt Cookie thiết yếu có thể ảnh hưởng đến chức năng website.
```

---

### ĐIỀU 9 — Liên hệ và Khiếu nại

`id="section-9"` · Icon: `MessageCircle`

```
Nếu có câu hỏi, yêu cầu hoặc khiếu nại liên quan đến Chính sách này, người dùng
có thể liên hệ Benhub qua các kênh sau:
```

**Render dưới dạng contact cards:**

```tsx
// 3 card: Email | Hotline | Địa chỉ
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
  <div className="p-4 rounded-xl border border-border text-center">
    <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
    <p className="text-xs text-muted mb-1">Email chuyên trách</p>
    <p className="text-sm font-semibold text-secondary">privacy@benhub.vn</p>
    <p className="text-xs text-muted mt-1">Phản hồi trong 15 ngày làm việc</p>
  </div>

  <div className="p-4 rounded-xl border border-border text-center">
    <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
    <p className="text-xs text-muted mb-1">Hotline hỗ trợ</p>
    <p className="text-sm font-semibold text-secondary">024 777 67 666</p>
    <p className="text-xs text-muted mt-1">8:00 – 17:30 | T2 – T6</p>
  </div>

  <div className="p-4 rounded-xl border border-border text-center">
    <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
    <p className="text-xs text-muted mb-1">Trụ sở công ty</p>
    <p className="text-sm font-semibold text-secondary">[Địa chỉ Benhub]</p>
    <p className="text-xs text-muted mt-1">Hà Nội, Việt Nam</p>
  </div>
</div>
```

**Cơ quan nhà nước có thẩm quyền:**

```
Trong trường hợp không được giải quyết thỏa đáng, người dùng có quyền khiếu nại
đến Cục An toàn thông tin – Bộ Thông tin và Truyền thông hoặc các cơ quan nhà nước
có thẩm quyền theo quy định tại Nghị định 13/2023/NĐ-CP.
```

---

## 8. COMPONENT: `<UpdateBanner />`

```tsx
// Hiển thị ở cuối trang content, trước footer
<div className="mt-12 p-5 rounded-2xl border border-border bg-bg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
  <div>
    <p className="text-sm font-semibold text-secondary">
      Chính sách bảo mật thông tin – Benhub
    </p>
    <p className="text-xs text-muted mt-1">
      Ngày ban hành: 01/01/2025 · Có hiệu lực từ: 01/01/2025 · Phiên bản 1.0
    </p>
  </div>
  <button
    onClick={() => window.print()}
    className="flex items-center gap-2 text-sm text-primary border border-primary/30
               px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors flex-shrink-0"
  >
    <Printer className="w-4 h-4" />
    In trang này
  </button>
</div>
```

---

## 9. ROUTE & FILE CẦN TẠO

```
apps/web/app/chinh-sach-bao-mat/
└── page.tsx                           ← Page chính (import layout + sections)

apps/web/components/privacy/
├── PolicySidebar.tsx                  ← Mục lục sticky sidebar
├── PolicySection.tsx                  ← Wrapper section (icon + title + content)
├── PolicyContent.tsx                  ← Toàn bộ 9 điều khoản
└── UpdateBanner.tsx                   ← Banner ngày hiệu lực + nút in
```

---

## 10. CẬP NHẬT FOOTER

Thêm link vào Footer component (`components/layout/Footer.tsx`):

```tsx
// Trong bottom bar của Footer, bên cạnh "Điều khoản sử dụng":
<Link
  href="/chinh-sach-bao-mat"
  className="text-sm text-gray-400 hover:text-white transition-colors"
>
  Chính sách bảo mật
</Link>
```

---

## 11. CHECKLIST

- [ ] Tạo route `app/chinh-sach-bao-mat/page.tsx`
- [ ] Tạo `PolicySidebar.tsx` với IntersectionObserver highlight
- [ ] Tạo `PolicySection.tsx` wrapper component
- [ ] Tạo `PolicyContent.tsx` với đầy đủ 9 điều khoản
- [ ] Render bảng Điều 4 bằng Tailwind table
- [ ] Render grid quyền người dùng Điều 7
- [ ] Render contact cards Điều 9
- [ ] Tạo `UpdateBanner.tsx` với nút in
- [ ] Thêm `generateMetadata()` SEO
- [ ] Thêm link footer
- [ ] Test responsive: sidebar ẩn trên mobile
- [ ] Test smooth scroll từ sidebar đến từng section
- [ ] Test highlight active section khi scroll
