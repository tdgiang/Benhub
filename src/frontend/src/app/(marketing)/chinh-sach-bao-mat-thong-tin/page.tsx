import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Database,
  Target,
  Clock,
  Users,
  Share2,
  UserCheck,
  Lock,
  MessageCircle,
  Eye,
  Pencil,
  Trash2,
  Ban,
  PackageOpen,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PolicySidebar } from "@/components/privacy/PolicySidebar";
import { UpdateBanner } from "@/components/privacy/UpdateBanner";

export const metadata: Metadata = {
  title: "Chính sách bảo mật thông tin | Benhub",
  description:
    "Tìm hiểu cách Benhub thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng, đối tác tài xế và người dùng website.",
  robots: "index, follow",
};

/* ─── MiniHero ─── */
function MiniHero() {
  return (
    <section
      className="relative overflow-hidden pt-20 pb-12"
      style={{ background: "#050B18" }}
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -top-20 -left-20 h-[400px] w-[500px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(ellipse, #F97316 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, #FBBF24 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-300 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-600">
              /
            </li>
            <li className="text-slate-300 font-medium">Chính sách bảo mật</li>
          </ol>
        </nav>

        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
          <Shield className="h-3.5 w-3.5" />
          Nghị định 13/2023/NĐ-CP
        </div>

        <h1
          className="font-black leading-[0.95] tracking-tight text-white"
          style={{
            fontFamily: "var(--font-barlow), system-ui, sans-serif",
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
          }}
        >
          Chính sách bảo mật
          <br />
          <span className="text-orange-400">thông tin</span>
        </h1>
        <p className="mt-4 text-sm text-slate-400">
          Cập nhật lần cuối: 01/03/2026 · Có hiệu lực từ: 06/03/2025
        </p>
      </div>
    </section>
  );
}

/* ─── Section wrapper ─── */
function PolicySection({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-14">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-orange-500" />
        </div>
        <h2
          className="font-bold text-xl text-slate-900"
          style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
        >
          {title}
        </h2>
      </div>
      <div className="text-slate-600 leading-relaxed space-y-4 text-sm md:text-base">
        {children}
      </div>
    </section>
  );
}

/* ─── Section 4 — table data ─── */
const storageRows = [
  { type: "Hồ sơ khách hàng B2B", duration: "60 tháng kể từ giao dịch cuối" },
  {
    type: "Thông tin tài xế đối tác",
    duration: "36 tháng kể từ ngày chấm dứt hợp đồng",
  },
  {
    type: "Hồ sơ ứng viên tuyển dụng",
    duration: "12 tháng kể từ ngày nộp hồ sơ",
  },
  { type: "Nhật ký truy cập website", duration: "12 tháng" },
  {
    type: "Hồ sơ pháp lý, hóa đơn",
    duration: "Tối thiểu 10 năm theo Luật Kế toán",
  },
];

/* ─── Section 7 — user rights ─── */
const userRights = [
  {
    icon: Eye,
    title: "Quyền truy cập",
    desc: "Yêu cầu xem toàn bộ dữ liệu Benhub đang lưu trữ về bạn",
  },
  {
    icon: Pencil,
    title: "Quyền chỉnh sửa",
    desc: "Cập nhật thông tin không chính xác theo yêu cầu",
  },
  {
    icon: Trash2,
    title: "Quyền xóa",
    desc: "Yêu cầu xóa dữ liệu cá nhân bất kỳ lúc nào (trừ dữ liệu bắt buộc pháp lý)",
  },
  {
    icon: Ban,
    title: "Quyền phản đối",
    desc: "Phản đối việc xử lý dữ liệu cho mục đích tiếp thị trực tiếp",
  },
  {
    icon: PackageOpen,
    title: "Quyền chuyển dữ liệu",
    desc: "Nhận bản sao dữ liệu theo định dạng phổ biến (JSON/CSV)",
  },
  {
    icon: Mail,
    title: "Quyền từ chối tiếp thị",
    desc: "Hủy đăng ký nhận email/SMS quảng cáo bất kỳ lúc nào",
  },
];

/* ─── Page ─── */
export default function PrivacyPolicyPage() {
  return (
    <main>
      <MiniHero />

      {/* Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex gap-12">
          <PolicySidebar />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* ── Điều 1 ── */}
            <PolicySection
              id="section-1"
              icon={Shield}
              title="1. Mục đích và phạm vi sử dụng thông tin"
            >
              <p>
                Benhub là nền tảng vận chuyển vật liệu xây dựng B2B, cung cấp
                dịch vụ kết nối giữa các doanh nghiệp, đại lý VLXD, nhà thầu với
                đội ngũ tài xế và phương tiện vận tải chuyên nghiệp.
              </p>
              <p>
                Chính sách bảo mật thông tin này (
                <strong>&#8220;Chính sách&#8221;</strong>) giải thích cách
                Benhub thu thập, sử dụng, lưu trữ và bảo vệ thông tin của người
                dùng — bao gồm khách hàng doanh nghiệp B2B, đối tác tài xế, ứng
                viên tuyển dụng và khách truy cập website — khi sử dụng các dịch
                vụ và website tại{" "}
                <span className="text-orange-600 font-medium">
                  https://benhub.vn
                </span>
                .
              </p>
              <p>
                Bằng việc sử dụng dịch vụ của Benhub, người dùng xác nhận đã
                đọc, hiểu và đồng ý với toàn bộ nội dung Chính sách này. Chính
                sách có thể được sửa đổi và sẽ có hiệu lực sau{" "}
                <strong>05 ngày</strong> kể từ ngày đăng tải công khai trên
                website.
              </p>
            </PolicySection>

            {/* ── Điều 2 ── */}
            <PolicySection
              id="section-2"
              icon={Database}
              title="2. Thông tin được thu thập"
            >
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  2.1 Thông tin người dùng tự cung cấp
                </h3>
                <p className="mb-3">
                  Khi đăng ký, sử dụng dịch vụ hoặc điền form trên website,
                  Benhub có thể thu thập:
                </p>
                <ul className="space-y-1.5 list-none">
                  {[
                    "Họ và tên đầy đủ",
                    "Tên công ty / doanh nghiệp (đối với khách hàng B2B)",
                    "Mã số thuế doanh nghiệp (nếu có)",
                    "Số điện thoại liên lạc",
                    "Địa chỉ email",
                    "Địa chỉ giao nhận hàng, địa chỉ công trình",
                    "Thông tin phương tiện vận tải (đối với tài xế đăng ký hợp tác): loại xe, biển số, đăng kiểm, bảo hiểm",
                    "Hồ sơ ứng tuyển: CV, thư giới thiệu (đối với ứng viên)",
                    "Nội dung yêu cầu vận chuyển và phản hồi dịch vụ",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  2.2 Thông tin thu thập tự động
                </h3>
                <ul className="space-y-1.5 list-none">
                  {[
                    "Địa chỉ IP, loại trình duyệt, hệ điều hành",
                    "Thời gian truy cập, trang đã xem, thời lượng phiên",
                    "Dữ liệu định vị (nếu người dùng cho phép) — dùng để xác định khu vực phục vụ",
                    "Dữ liệu Cookie và công nghệ theo dõi tương tự",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  2.3 Thông tin từ bên thứ ba
                </h3>
                <p>
                  Benhub có thể tiếp nhận thông tin từ đối tác kinh doanh, nền
                  tảng thương mại điện tử, đơn vị cung cấp dịch vụ logistics,
                  hoặc cơ quan nhà nước có thẩm quyền.
                </p>
              </div>
            </PolicySection>

            {/* ── Điều 3 ── */}
            <PolicySection
              id="section-3"
              icon={Target}
              title="3. Mục đích sử dụng thông tin"
            >
              <p>
                Benhub sử dụng thông tin thu thập được cho các mục đích sau:
              </p>
              <div className="space-y-4">
                {[
                  {
                    label: "a) Cung cấp và vận hành dịch vụ",
                    items: [
                      "Xác minh danh tính, xử lý yêu cầu vận chuyển và kết nối tài xế phù hợp",
                      "Điều phối xe tải, theo dõi hành trình và xác nhận giao hàng",
                      "Xuất hóa đơn, chứng từ vận chuyển cho khách hàng B2B",
                    ],
                  },
                  {
                    label: "b) Nâng cao chất lượng dịch vụ",
                    items: [
                      "Phân tích nhu cầu, tần suất sử dụng dịch vụ của từng khách hàng",
                      "Tối ưu hóa lộ trình và thời gian giao hàng",
                      "Phát triển tính năng, dịch vụ mới phù hợp với nhu cầu thị trường VLXD",
                    ],
                  },
                  {
                    label: "c) Liên lạc và hỗ trợ",
                    items: [
                      "Thông báo trạng thái đơn hàng, xác nhận giao dịch qua email/SMS",
                      "Hỗ trợ khách hàng khi có sự cố, khiếu nại",
                      "Gửi thông tin về chính sách, chương trình ưu đãi (người dùng có thể từ chối)",
                    ],
                  },
                  {
                    label: "d) An toàn và phòng chống gian lận",
                    items: [
                      "Phát hiện, ngăn chặn các hành vi gian lận, giả mạo thông tin",
                      "Bảo vệ quyền lợi của khách hàng và tài xế đối tác",
                    ],
                  },
                  {
                    label: "e) Tuân thủ pháp lý",
                    items: [
                      "Lưu trữ hồ sơ theo quy định pháp luật về vận tải và thương mại",
                      "Cung cấp thông tin cho cơ quan nhà nước có thẩm quyền khi được yêu cầu",
                    ],
                  },
                ].map(({ label, items }) => (
                  <div key={label}>
                    <p className="font-semibold text-slate-800 mb-2">{label}</p>
                    <ul className="space-y-1.5 list-none pl-3">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </PolicySection>

            {/* ── Điều 4 ── */}
            <PolicySection
              id="section-4"
              icon={Clock}
              title="4. Thời gian lưu trữ thông tin"
            >
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ background: "#0F172A" }}>
                      <th className="text-left px-5 py-3.5 font-semibold text-white rounded-tl-xl">
                        Loại thông tin
                      </th>
                      <th className="text-left px-5 py-3.5 font-semibold text-white rounded-tr-xl">
                        Thời gian lưu trữ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {storageRows.map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                      >
                        <td className="px-5 py-3.5 text-slate-800 font-medium">
                          {row.type}
                        </td>
                        <td className="px-5 py-3.5 text-slate-600">
                          {row.duration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4">
                Sau khi hết thời hạn lưu trữ, Benhub sẽ{" "}
                <strong>xóa hoặc ẩn danh hóa</strong> toàn bộ dữ liệu cá nhân
                theo quy trình bảo mật nội bộ.
              </p>
            </PolicySection>

            {/* ── Điều 5 ── */}
            <PolicySection
              id="section-5"
              icon={Users}
              title="5. Đối tượng tiếp cận và quản lý thông tin"
            >
              <p>
                Benhub chỉ cho phép các đối tượng sau tiếp cận thông tin người
                dùng, trên nguyên tắc{" "}
                <strong>&#8220;tối thiểu cần thiết&#8221;</strong> — chỉ cung
                cấp đúng thông tin cần thiết để thực hiện nhiệm vụ:
              </p>
              <ul className="space-y-2 list-none">
                {[
                  "Nhân viên và quản lý nội bộ Benhub có liên quan trực tiếp đến việc cung cấp dịch vụ",
                  "Tài xế đối tác được điều phối — chỉ nhận thông tin địa chỉ giao hàng và tên liên lạc",
                  "Đối tác công nghệ, nhà cung cấp hạ tầng điện toán đám mây (ký NDA bảo mật)",
                  "Đối tác kiểm toán, tư vấn pháp lý độc lập (theo yêu cầu tuân thủ)",
                  "Cơ quan nhà nước có thẩm quyền (Bộ Công an, Tòa án, Cơ quan thuế...) theo quy định pháp luật",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-xl border border-orange-100 bg-orange-50">
                <p className="font-semibold text-orange-800 mb-1">
                  Cam kết quan trọng
                </p>
                <p className="text-orange-700 text-sm">
                  Benhub cam kết không bán, cho thuê hoặc trao đổi thông tin
                  người dùng vì mục đích thương mại với bất kỳ bên thứ ba nào.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <p className="font-semibold text-slate-800 mb-3">
                  Đơn vị thu thập và quản lý thông tin
                </p>
                <ul className="space-y-1.5 text-sm text-slate-600">
                  <li>
                    <strong className="text-slate-700">Tên công ty:</strong>{" "}
                    Công ty TNHH Benhub Việt Nam
                  </li>
                  <li>
                    <strong className="text-slate-700">Địa chỉ:</strong> Hà Nội,
                    Việt Nam
                  </li>
                  <li>
                    <strong className="text-slate-700">Email:</strong>{" "}
                    <a
                      href="mailto:contact@benhub.vn"
                      className="text-orange-600 hover:underline"
                    >
                      contact@benhub.vn
                    </a>
                  </li>
                  <li>
                    <strong className="text-slate-700">Hotline:</strong> 024 777
                    67 666 (8:00 – 17:30, Thứ 2 – Thứ 6)
                  </li>
                </ul>
              </div>
            </PolicySection>

            {/* ── Điều 6 ── */}
            <PolicySection
              id="section-6"
              icon={Share2}
              title="6. Chia sẻ thông tin với bên thứ ba"
            >
              <p>
                Benhub chỉ chia sẻ thông tin người dùng trong các trường hợp
                sau:
              </p>
              <div className="space-y-4">
                {[
                  {
                    label: "a) Thực hiện dịch vụ vận chuyển",
                    text: "Thông tin giao hàng cơ bản (địa điểm, tên liên lạc) được chia sẻ với tài xế được chỉ định để thực hiện hành trình. Tài xế cam kết bảo mật theo hợp đồng hợp tác.",
                  },
                  {
                    label: "b) Đối tác cung cấp dịch vụ hỗ trợ",
                    text: "Các nhà cung cấp dịch vụ đám mây, phân tích dữ liệu, gửi email/SMS ký hợp đồng bảo mật và chỉ được sử dụng thông tin đúng mục đích ủy quyền.",
                  },
                  {
                    label: "c) Tái cơ cấu doanh nghiệp",
                    text: "Trong trường hợp Benhub sáp nhập, chuyển nhượng hoặc tái cơ cấu, người dùng sẽ được thông báo trước và pháp nhân mới phải kế thừa toàn bộ cam kết bảo mật này.",
                  },
                  {
                    label: "d) Tuân thủ pháp lý bắt buộc",
                    text: "Khi có quyết định của Tòa án, lệnh điều tra của cơ quan công an, hoặc yêu cầu của cơ quan thuế và cơ quan nhà nước có thẩm quyền theo quy định pháp luật Việt Nam.",
                  },
                  {
                    label: "e) Bảo vệ lợi ích hợp pháp",
                    text: "Khi cần thiết để ngăn chặn gian lận, bảo vệ an toàn tài sản, tính mạng của khách hàng, tài xế hoặc bên thứ ba.",
                  },
                ].map(({ label, text }) => (
                  <div key={label}>
                    <p className="font-semibold text-slate-800 mb-1">{label}</p>
                    <p className="pl-4">{text}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                Trong mọi trường hợp, Benhub không chia sẻ thông tin nhạy cảm
                như số tài khoản ngân hàng, thông tin định danh cá nhân đầy đủ
                mà không có sự đồng ý rõ ràng của người dùng.
              </p>
            </PolicySection>

            {/* ── Điều 7 ── */}
            <PolicySection
              id="section-7"
              icon={UserCheck}
              title="7. Quyền của người dùng"
            >
              <p>
                Theo Nghị định 13/2023/NĐ-CP, người dùng có các quyền sau đối
                với dữ liệu cá nhân của mình:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userRights.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-orange-200 hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4 text-orange-500" />
                    </div>
                    <p className="font-semibold text-sm text-slate-900 mb-1">
                      {title}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-center text-slate-500 mt-2">
                Để thực hiện các quyền trên, liên hệ{" "}
                <a
                  href="mailto:contact@benhub.vn"
                  className="text-orange-600 font-semibold hover:underline"
                >
                  contact@benhub.vn
                </a>{" "}
                — Benhub sẽ phản hồi trong vòng{" "}
                <strong>15 ngày làm việc</strong>.
              </p>
            </PolicySection>

            {/* ── Điều 8 ── */}
            <PolicySection
              id="section-8"
              icon={Lock}
              title="8. Bảo mật thông tin và Cookie"
            >
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  8.1 Biện pháp bảo mật kỹ thuật
                </h3>
                <p className="mb-3">
                  Benhub áp dụng các tiêu chuẩn bảo mật sau để bảo vệ thông tin
                  người dùng:
                </p>
                <ul className="space-y-1.5 list-none">
                  {[
                    "Mã hóa dữ liệu truyền tải bằng giao thức TLS 1.3 (HTTPS)",
                    "Mã hóa dữ liệu lưu trữ (AES-256)",
                    "Kiểm soát truy cập nội bộ theo nguyên tắc phân quyền tối thiểu",
                    "Giám sát hệ thống 24/7, phát hiện xâm nhập bất thường",
                    "Sao lưu dữ liệu định kỳ, phục hồi thảm họa",
                    "Kiểm tra bảo mật định kỳ bởi bên thứ ba độc lập",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  8.2 Trách nhiệm người dùng
                </h3>
                <ul className="space-y-1.5 list-none">
                  {[
                    "Bảo mật thông tin đăng nhập, không chia sẻ mật khẩu",
                    "Không cung cấp thông tin tài khoản Benhub cho website/nền tảng khác",
                    "Thông báo ngay cho Benhub qua contact@benhub.vn nếu phát hiện tài khoản bị truy cập trái phép",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 mb-2">
                  8.3 Chính sách Cookie
                </h3>
                <p className="mb-3">Benhub sử dụng Cookie để:</p>
                <ul className="space-y-1.5 list-none">
                  {[
                    "Duy trì phiên đăng nhập (Cookie thiết yếu — không thể tắt)",
                    "Ghi nhớ tùy chọn ngôn ngữ, giao diện (Cookie chức năng)",
                    "Phân tích lưu lượng truy cập để cải thiện dịch vụ (Cookie phân tích)",
                    "Hiển thị nội dung phù hợp (Cookie tiếp thị — người dùng có thể từ chối)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-slate-500">
                  Người dùng có thể quản lý Cookie tại:{" "}
                  <strong>Cài đặt trình duyệt → Quyền riêng tư</strong>. Tắt
                  Cookie thiết yếu có thể ảnh hưởng đến chức năng website.
                </p>
              </div>
            </PolicySection>

            {/* ── Điều 9 ── */}
            <PolicySection
              id="section-9"
              icon={MessageCircle}
              title="9. Liên hệ và Khiếu nại"
            >
              <p>
                Nếu có câu hỏi, yêu cầu hoặc khiếu nại liên quan đến Chính sách
                này, người dùng có thể liên hệ Benhub qua các kênh sau:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl border border-slate-200 text-center hover:border-orange-200 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-xs text-slate-500 mb-1">
                    Email chuyên trách
                  </p>
                  <a
                    href="mailto:contact@benhub.vn"
                    className="text-sm font-semibold text-slate-900 hover:text-orange-600 transition-colors"
                  >
                    contact@benhub.vn
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    Phản hồi trong 15 ngày làm việc
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 text-center hover:border-orange-200 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-3">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-xs text-slate-500 mb-1">Hotline hỗ trợ</p>
                  <p className="text-sm font-semibold text-slate-900">
                    024 777 67 666
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    8:00 – 17:30 | T2 – T6
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 text-center hover:border-orange-200 hover:shadow-sm transition-all">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-xs text-slate-500 mb-1">Trụ sở công ty</p>
                  <p className="text-sm font-semibold text-slate-900">
                    Công ty TNHH Benhub Việt Nam
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Hà Nội, Việt Nam
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-sm">
                <p className="font-semibold text-slate-800 mb-1">
                  Cơ quan nhà nước có thẩm quyền
                </p>
                <p className="text-slate-600">
                  Trong trường hợp không được giải quyết thỏa đáng, người dùng
                  có quyền khiếu nại đến{" "}
                  <strong>
                    Cục An toàn thông tin – Bộ Thông tin và Truyền thông
                  </strong>{" "}
                  hoặc các cơ quan nhà nước có thẩm quyền theo quy định tại Nghị
                  định 13/2023/NĐ-CP.
                </p>
              </div>
            </PolicySection>

            <UpdateBanner />
          </div>
        </div>
      </div>
    </main>
  );
}
