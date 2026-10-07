import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import {
  AlarmClock,
  ArrowRight,
  BadgeCheck,
  Banknote,
  Boxes,
  Briefcase,
  Calculator,
  Cloud,
  CalendarCheck,
  ChartColumn,
  ChevronDown,
  ClipboardList,
  Database,
  FileSpreadsheet,
  FlaskConical,
  GitPullRequestArrow,
  Handshake,
  HardHat,
  History,
  KeyRound,
  LayoutDashboard,
  Lock,
  Mountain,
  Receipt,
  Scale,
  Settings2,
  Smartphone,
  Truck,
  UserCog,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { PartnerSignupForm } from "@/components/marketing/PartnerSignupForm";

/**
 * PLACEHOLDER — temporary figures and links pending real data.
 * Replace every value in this block before public launch.
 */
const PLACEHOLDER = {
  stats: [
    { value: "20+", labelVi: "Mỏ đang sử dụng", labelEn: "Quarries onboard" },
    {
      value: "500.000+",
      labelVi: "Phiếu cân đã xử lý",
      labelEn: "Tickets processed",
    },
    { value: "3.000+", labelVi: "Người dùng", labelEn: "Users" },
    {
      value: "2–4 tuần",
      labelVi: "Thời gian triển khai",
      labelEn: "Rollout time",
      valueEn: "2–4 weeks",
    },
  ],
  rolloutVi: "Thời gian triển khai dự kiến: 2–4 tuần cho một mỏ.",
  rolloutEn: "Expected rollout: 2–4 weeks per quarry.",
  hostingVi: "Triển khai trên cloud hoặc máy chủ riêng tại doanh nghiệp.",
  hostingEn: "Deploy on the cloud or on your own on-premise server.",
  /** Empty string renders the badge as "coming soon". */
  appStoreUrl: "",
  googlePlayUrl: "",
  faqs: [
    {
      qVi: "Có tùy chỉnh theo quy trình riêng của doanh nghiệp không?",
      qEn: "Can it be tailored to our own workflows?",
      aVi: "Có. Danh mục, luồng duyệt và phân quyền được cấu hình theo cơ cấu doanh nghiệp. Các tích hợp riêng như trạm cân hay phần mềm kế toán được báo giá theo yêu cầu.",
      aEn: "Yes. Catalogs, approval flows and permissions are configured to your organization. Custom integrations such as weighbridges or accounting software are quoted on request.",
    },
    {
      qVi: "Chi phí như thế nào?",
      qEn: "How is it priced?",
      aVi: "Thuê bao theo từng mỏ, thanh toán theo tháng hoặc gói năm. Dùng thử miễn phí 30 ngày, báo giá chi tiết sau buổi khảo sát.",
      aEn: "Subscription per quarry, billed monthly or annually. 30-day free trial; detailed quote after the assessment.",
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale !== "en";
  return {
    title: isVi
      ? "BenHub Mine | Phần Mềm Quản Lý Mỏ Khai Thác Toàn Diện"
      : "BenHub Mine | All-in-One Quarry Management Software",
    description: isVi
      ? "Phần mềm quản lý mỏ: kế hoạch khai thác, sản lượng, phiếu cân điện tử, tồn kho, hợp đồng, công nợ, chấm công và tiền lương trên một nền tảng web và di động."
      : "Quarry management software: extraction planning, output, digital weighbridge tickets, inventory, contracts, receivables, attendance and payroll on one web and mobile platform.",
    keywords: isVi
      ? [
          "phần mềm quản lý mỏ",
          "quản lý khai thác khoáng sản",
          "phiếu cân điện tử",
          "quản lý mỏ đá",
          "phần mềm mỏ vật liệu xây dựng",
          "quản lý xe ra vào mỏ",
        ]
      : [
          "quarry management software",
          "mining operations software",
          "digital weighbridge ticket",
          "construction materials quarry",
        ],
  };
}

const problems = [
  {
    icon: Database,
    titleVi: "Số liệu rời rạc",
    titleEn: "Scattered data",
    descVi:
      "Sản lượng ở tổ khai thác, phiếu cân ở trạm cân, hợp đồng ở kinh doanh, bảng lương ở kế toán. Muốn báo cáo tổng phải gom tay.",
    descEn:
      "Output sits with the extraction team, tickets at the weighbridge, contracts in sales, payroll in accounting. Every report is compiled by hand.",
  },
  {
    icon: Truck,
    titleVi: "Khó kiểm soát xe ra vào",
    titleEn: "Hard to control truck traffic",
    descVi:
      "Phiếu cân giấy dễ sai, dễ thất lạc, khó đối chiếu với khách hàng và tài xế.",
    descEn:
      "Paper weighbridge slips get miswritten and lost, and are hard to reconcile with customers and drivers.",
  },
  {
    icon: ChartColumn,
    titleVi: "Kế hoạch lệch thực tế",
    titleEn: "Plans drift from reality",
    descVi:
      "Kế hoạch và sản lượng thực tế lệch nhau mà không ai biết sớm. Khi phát hiện thì đã cuối tháng.",
    descEn:
      "Plans and actual output diverge without anyone noticing — until month-end.",
  },
  {
    icon: AlarmClock,
    titleVi: "Hồ sơ hết hạn không ai nhắc",
    titleEn: "Expiring documents, no reminders",
    descVi:
      "Giấy phép khai thác, giấy phép nổ mìn, trữ lượng, bảo hiểm sắp hết hạn mà không có cảnh báo.",
    descEn:
      "Mining licenses, blasting permits, reserves and insurance run out without warning.",
  },
  {
    icon: CalendarCheck,
    titleVi: "Chấm công, tính lương thủ công",
    titleEn: "Manual attendance & payroll",
    descVi:
      "Hàng trăm công nhân, tài xế làm ca sáng, ca chiều, ca gãy — chấm công và tính lương bằng tay.",
    descEn:
      "Hundreds of workers and drivers on morning, afternoon and split shifts — tracked and paid by hand.",
  },
  {
    icon: FileSpreadsheet,
    titleVi: "Công nợ nằm trong nhiều file",
    titleEn: "Receivables across many files",
    descVi:
      "Công nợ khách hàng và nhà cung cấp theo dõi bằng nhiều file Excel, đối soát mất nhiều ngày.",
    descEn:
      "Customer and supplier balances live in many spreadsheets; reconciliation takes days.",
  },
];

const chain = {
  vi: ["Mỏ", "Khai thác", "Kho bãi", "Vận chuyển", "Bán hàng", "Thu tiền"],
  en: ["Quarry", "Extraction", "Stockpile", "Haulage", "Sales", "Collection"],
};
const hrChain = {
  vi: ["Nhân sự", "Chấm công", "Tính lương"],
  en: ["Staff", "Attendance", "Payroll"],
};

const pillars = [
  {
    icon: Database,
    titleVi: "Một nguồn dữ liệu duy nhất",
    titleEn: "One source of truth",
    descVi: "Không còn nhập lại, không còn lệch số giữa các phòng ban.",
    descEn: "No more re-entry, no more mismatched numbers between departments.",
  },
  {
    icon: GitPullRequestArrow,
    titleVi: "Quy trình có duyệt",
    titleEn: "Approval workflows",
    descVi:
      "Kế hoạch, hợp đồng, phiếu cân, đơn nghỉ phép, bảng lương đều đi theo luồng tạo → duyệt hoặc từ chối, có lưu lịch sử.",
    descEn:
      "Plans, contracts, tickets, leave requests and payroll follow create → approve or reject, with full history.",
  },
  {
    icon: Smartphone,
    titleVi: "Làm việc ngay tại hiện trường",
    titleEn: "Work right on site",
    descVi:
      "Tài xế và công nhân dùng app để nhận phiếu, check-in/check-out, chấm công, xin nghỉ phép và nhận thông báo đẩy.",
    descEn:
      "Drivers and workers use the app to receive tickets, check in/out, clock attendance, request leave and get push notifications.",
  },
];

const modules = [
  {
    icon: Mountain,
    titleVi: "Quản lý mỏ và tài nguyên",
    titleEn: "Quarry & resources",
    itemsVi: [
      "Hồ sơ mỏ, doanh nghiệp sở hữu, giấy phép khai thác",
      "Khu vực, điểm khai thác, điểm đổ thải",
      "Giấy phép nổ mìn và hiệu lực",
      "Trữ lượng còn lại theo từng mỏ",
    ],
    itemsEn: [
      "Quarry profile, owning company, mining license",
      "Areas, extraction points, dump sites",
      "Blasting permits and validity",
      "Remaining reserves per quarry",
    ],
  },
  {
    icon: ClipboardList,
    titleVi: "Kế hoạch và sản lượng",
    titleEn: "Planning & output",
    itemsVi: [
      "Kế hoạch khai thác theo kỳ, khu vực, có duyệt",
      "Ghi nhận sản lượng thực tế",
      "Biểu đồ kế hoạch so với thực hiện",
      "Tồn kho khoáng sản theo loại và điểm đổ",
    ],
    itemsEn: [
      "Extraction plans by period and area, with approval",
      "Actual output logging",
      "Plan vs. actual charts",
      "Mineral inventory by type and dump site",
    ],
  },
  {
    icon: FlaskConical,
    titleVi: "Chất lượng (KCS)",
    titleEn: "Quality control",
    itemsVi: [
      "Phiếu lấy mẫu và phân tích chất lượng",
      "Nhập kết quả theo từng chỉ tiêu",
      "Lịch sử chất lượng theo lô, loại khoáng sản",
    ],
    itemsEn: [
      "Sampling and quality analysis forms",
      "Results entered per indicator",
      "Quality history by batch and mineral type",
    ],
  },
  {
    icon: Scale,
    titleVi: "Phiếu cân E-Ticket và vận chuyển",
    titleEn: "E-Ticket weighbridge & haulage",
    itemsVi: [
      "Phiếu cân điện tử thay phiếu giấy, có duyệt nội bộ",
      "Khách hàng xác nhận hoặc khiếu nại phiếu",
      "App tài xế: nhận chuyến, check-in/out, báo sự cố",
      "Thống kê theo khách hàng, xuất Excel",
    ],
    itemsEn: [
      "Digital tickets replace paper, with internal approval",
      "Customers confirm or dispute tickets",
      "Driver app: accept trips, check in/out, report incidents",
      "Per-customer statistics, Excel export",
    ],
  },
  {
    icon: Truck,
    titleVi: "Phương tiện, thiết bị, tài sản",
    titleEn: "Vehicles, equipment, assets",
    itemsVi: [
      "Xe: biển số, tải trọng, tài xế, xe nhà hay xe thuê",
      "Máy móc, thiết bị khai thác",
      "Cấp phát, thu hồi tài sản và đồ bảo hộ",
    ],
    itemsEn: [
      "Vehicles: plate, capacity, driver, owned or hired",
      "Extraction machinery and equipment",
      "Issue and recover assets and PPE",
    ],
  },
  {
    icon: Briefcase,
    titleVi: "Khách hàng, đấu thầu, hợp đồng",
    titleEn: "Customers, tenders, contracts",
    itemsVi: [
      "Hồ sơ và phân loại khách hàng",
      "Theo dõi gói thầu, hồ sơ dự thầu, kết quả",
      "Tạo, duyệt và theo dõi trạng thái hợp đồng",
    ],
    itemsEn: [
      "Customer profiles and segments",
      "Tender packages, bids and results",
      "Create, approve and track contracts",
    ],
  },
  {
    icon: Receipt,
    titleVi: "Công nợ",
    titleEn: "Receivables & payables",
    itemsVi: [
      "Công nợ phải thu theo khách hàng và kỳ hợp đồng",
      "Tự sinh chứng từ định kỳ từ phiếu cân hoàn thành",
      "Gửi email đề nghị thanh toán, ghi nhận thu tiền",
      "Đối soát công nợ phải trả theo hợp đồng",
    ],
    itemsEn: [
      "Receivables by customer and contract period",
      "Periodic documents generated from completed tickets",
      "Email payment requests, record collections",
      "Payables reconciled per contract",
    ],
  },
  {
    icon: HardHat,
    titleVi: "Nhân sự và vận hành ca",
    titleEn: "Staff & shifts",
    itemsVi: [
      "Hồ sơ nhân viên, cảnh báo GPLX hết hạn",
      "Theo dõi bảo hiểm nhân viên",
      "Phân ca sáng, chiều, ca gãy theo khu vực",
      "Nhật ký ca làm và nhân viên có mặt",
    ],
    itemsEn: [
      "Employee records, driver license expiry alerts",
      "Employee insurance tracking",
      "Morning, afternoon and split shifts by area",
      "Shift logs and attendance lists",
    ],
  },
  {
    icon: CalendarCheck,
    titleVi: "Chấm công và nghỉ phép",
    titleEn: "Attendance & leave",
    itemsVi: [
      "Chấm công trên điện thoại tại địa điểm đăng ký",
      "Tổng hợp chấm công theo ngày",
      "Đơn nghỉ phép gửi trên app, quản lý duyệt",
    ],
    itemsEn: [
      "Mobile clock-in at registered locations",
      "Daily attendance summaries",
      "Leave requests on the app, approved by managers",
    ],
  },
  {
    icon: Banknote,
    titleVi: "Tiền lương",
    titleEn: "Payroll",
    itemsVi: [
      "Chính sách lương và khoản lương theo chức vụ",
      "Bảng lương tự động từ dữ liệu chấm công",
      "Điều chỉnh, tính lại, chốt bảng lương",
      "Theo dõi chi trả, xuất Excel",
    ],
    itemsEn: [
      "Pay policies and pay items by position",
      "Payroll generated from attendance data",
      "Adjust, recalculate and lock payroll",
      "Track payouts, Excel export",
    ],
  },
  {
    icon: Settings2,
    titleVi: "Quản trị hệ thống",
    titleEn: "Administration",
    itemsVi: [
      "Phân quyền theo vai trò đến từng thao tác",
      "Danh mục dùng chung: ca, chức vụ, loại khoáng sản…",
      "Thông báo trong hệ thống và thông báo đẩy",
      "Giao diện song ngữ Việt – Anh",
    ],
    itemsEn: [
      "Role-based permissions down to each action",
      "Shared catalogs: shifts, positions, mineral types…",
      "In-app and push notifications",
      "Bilingual Vietnamese – English interface",
    ],
  },
];

const mobileRoles = [
  {
    icon: Truck,
    roleVi: "Tài xế",
    roleEn: "Drivers",
    itemsVi: [
      "Nhận hoặc từ chối chuyến",
      "Check-in/check-out tại mỏ",
      "Xem phiếu cân của mình",
      "Báo sự cố khẩn cấp, khiếu nại phiếu",
    ],
    itemsEn: [
      "Accept or decline trips",
      "Check in/out at the quarry",
      "View own weighbridge tickets",
      "Report emergencies, dispute tickets",
    ],
  },
  {
    icon: HardHat,
    roleVi: "Công nhân, nhân viên",
    roleEn: "Workers & staff",
    itemsVi: [
      "Chấm công tại địa điểm quy định",
      "Xin nghỉ phép",
      "Xem thông báo",
    ],
    itemsEn: [
      "Clock in at designated locations",
      "Request leave",
      "Read notifications",
    ],
  },
  {
    icon: UserCog,
    roleVi: "Quản lý",
    roleEn: "Managers",
    itemsVi: [
      "Nhận thông báo đẩy khi có việc cần duyệt",
      "Theo dõi tình hình mỏ",
    ],
    itemsEn: [
      "Push notifications for pending approvals",
      "Monitor quarry status",
    ],
  },
];

const roles = [
  {
    icon: LayoutDashboard,
    roleVi: "Ban giám đốc",
    roleEn: "Executives",
    descVi:
      "Nắm sản lượng, doanh thu, công nợ theo thời gian thực, ra quyết định dựa trên số liệu.",
    descEn:
      "See output, revenue and receivables in real time; decide with data.",
  },
  {
    icon: Mountain,
    roleVi: "Quản lý mỏ",
    roleEn: "Quarry managers",
    descVi:
      "Lập và theo dõi kế hoạch khai thác, điều phối ca, kiểm soát tồn kho và chất lượng.",
    descEn:
      "Plan and track extraction, coordinate shifts, control inventory and quality.",
  },
  {
    icon: Handshake,
    roleVi: "Phòng kinh doanh",
    roleEn: "Sales",
    descVi:
      "Quản lý khách hàng, đấu thầu, hợp đồng, theo dõi xe xuất hàng theo hợp đồng.",
    descEn:
      "Manage customers, tenders and contracts; track dispatched trucks per contract.",
  },
  {
    icon: Calculator,
    roleVi: "Kế toán",
    roleEn: "Accounting",
    descVi:
      "Công nợ tự sinh từ phiếu cân, gửi đề nghị thanh toán qua email, bảng lương tự động.",
    descEn:
      "Receivables generated from tickets, emailed payment requests, automatic payroll.",
  },
  {
    icon: Users,
    roleVi: "Nhân sự",
    roleEn: "HR",
    descVi:
      "Hồ sơ nhân viên, bảo hiểm, chấm công, nghỉ phép, tài sản cấp phát nằm chung một nơi.",
    descEn:
      "Employee records, insurance, attendance, leave and issued assets in one place.",
  },
  {
    icon: FlaskConical,
    roleVi: "KCS",
    roleEn: "Quality control",
    descVi: "Phiếu lấy mẫu và kết quả phân tích được số hóa, tra cứu nhanh.",
    descEn: "Sampling forms and analysis results digitized and searchable.",
  },
];

const steps = [
  {
    num: "01",
    titleVi: "Khảo sát",
    titleEn: "Assessment",
    descVi: "Tìm hiểu quy trình vận hành thực tế của mỏ.",
    descEn: "Understand how your quarry actually operates.",
  },
  {
    num: "02",
    titleVi: "Cấu hình",
    titleEn: "Configuration",
    descVi:
      "Khai báo mỏ, khu vực, danh mục, phân quyền theo cơ cấu doanh nghiệp.",
    descEn:
      "Set up quarries, areas, catalogs and permissions to match your organization.",
  },
  {
    num: "03",
    titleVi: "Chuyển dữ liệu",
    titleEn: "Data migration",
    descVi: "Nhập nhân sự, phương tiện, khách hàng, hợp đồng hiện có.",
    descEn: "Import existing staff, vehicles, customers and contracts.",
  },
  {
    num: "04",
    titleVi: "Đào tạo và vận hành",
    titleEn: "Training & go-live",
    descVi: "Hướng dẫn từng bộ phận, đồng hành trong giai đoạn đầu.",
    descEn: "Train each department and support you through the early phase.",
  },
];

const security = [
  {
    icon: KeyRound,
    titleVi: "Phân quyền chi tiết",
    titleEn: "Granular permissions",
    descVi: "Mỗi người dùng chỉ thấy và thao tác đúng phần được giao.",
    descEn: "Each user sees and acts only on what they are assigned.",
  },
  {
    icon: Lock,
    titleVi: "Xác thực an toàn",
    titleEn: "Secure authentication",
    descVi: "Xác thực bằng token, mật khẩu được mã hóa, quên mật khẩu qua OTP.",
    descEn: "Token-based auth, hashed passwords, OTP password recovery.",
  },
  {
    icon: History,
    titleVi: "Lưu vết thao tác",
    titleEn: "Audit trail",
    descVi:
      "Ghi lại ai tạo, ai sửa, lúc nào. Dữ liệu xóa được lưu trữ an toàn, không mất vĩnh viễn.",
    descEn:
      "Records who created or edited what, and when. Deleted data is archived, never lost.",
  },
  {
    icon: Workflow,
    titleVi: "Lịch sử duyệt",
    titleEn: "Approval history",
    descVi:
      "Mọi thay đổi trạng thái của phiếu, hợp đồng, kế hoạch đều được ghi lại.",
    descEn: "Every status change on tickets, contracts and plans is recorded.",
  },
];

const faqs = [
  {
    qVi: "BenHub Mine phù hợp với loại mỏ nào?",
    qEn: "What kind of quarries is BenHub Mine for?",
    aVi: "Mỏ khai thác khoáng sản, đá, cát, sỏi và vật liệu xây dựng — đặc biệt các doanh nghiệp có nhiều xe vận chuyển và cần quản lý phiếu cân, công nợ khách hàng.",
    aEn: "Mineral, stone, sand, gravel and construction material quarries — especially businesses with many haul trucks that need to manage weighbridge tickets and customer receivables.",
  },
  {
    qVi: "Một doanh nghiệp quản lý nhiều mỏ được không?",
    qEn: "Can one company manage several quarries?",
    aVi: "Được. Mỗi mỏ có khu vực, điểm khai thác, kế hoạch và tồn kho riêng. Dashboard cho phép chọn xem từng mỏ.",
    aEn: "Yes. Each quarry has its own areas, extraction points, plans and inventory. The dashboard lets you switch between quarries.",
  },
  {
    qVi: "Có dùng được trên điện thoại không?",
    qEn: "Does it work on mobile?",
    aVi: "Có. Tài xế, công nhân và quản lý đều có ứng dụng di động. Bản web dùng cho văn phòng.",
    aEn: "Yes. Drivers, workers and managers each have a mobile app. The web version is for the office.",
  },
  {
    qVi: "Có xuất báo cáo ra Excel không?",
    qEn: "Can I export reports to Excel?",
    aVi: "Có. Phiếu cân, hợp đồng, nhân viên, bảng lương… đều xuất được ra Excel.",
    aEn: "Yes. Tickets, contracts, employees, payroll and more can be exported to Excel.",
  },
];

const barlow = { fontFamily: "var(--font-barlow), system-ui, sans-serif" };

function SectionHeading({
  eyebrow,
  title,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p
        className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-orange-300" : "text-orange-600"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-black leading-tight ${dark ? "text-white" : "text-slate-950"}`}
        style={{ ...barlow, fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}
      >
        {title}
      </h2>
    </div>
  );
}

export default async function BenHubMinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale !== "en";

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden pb-12 pt-24 md:pb-16 md:pt-28"
        style={{ background: "#050B18" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/bg_login.png')" }}
          />
          <div
            className="absolute -left-32 -top-20 h-[600px] w-[600px] rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(ellipse, #F97316 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
          <div
            className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(ellipse, #FBBF24 0%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_440px]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                <Mountain className="h-4 w-4" />
                {isVi
                  ? "BenHub Mine · Dành cho doanh nghiệp mỏ"
                  : "BenHub Mine · For quarry businesses"}
              </div>
              <h1
                className="font-black tracking-tight text-white"
                style={{
                  ...barlow,
                  fontSize: "clamp(2.6rem, 6.5vw, 4.8rem)",
                  lineHeight: "1.05",
                }}
              >
                {isVi ? "Quản lý mỏ khai thác" : "Run your entire quarry"}
                <br />
                <span className="text-orange-400">
                  {isVi
                    ? "trên một nền tảng duy nhất."
                    : "on a single platform."}
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                {isVi
                  ? "Từ giấy phép, kế hoạch khai thác, sản lượng, phiếu cân xe ra vào đến nhân sự, chấm công, tiền lương và công nợ. Tất cả số liệu của mỏ nằm chung một hệ thống, cập nhật theo thời gian thực, xem được trên web và điện thoại."
                  : "From licenses, extraction plans, output and weighbridge tickets to staff, attendance, payroll and receivables. All your quarry data in one system, updated in real time, on web and mobile."}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#dang-ky"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-black text-white shadow-xl shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
                >
                  {isVi ? "Đăng ký dùng thử" : "Start free trial"}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#dashboard"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/8"
                >
                  {isVi ? "Xem demo" : "See demo"}
                  <ChevronDown className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-400">
                {(isVi
                  ? [
                      "Khoáng sản, đá, cát, vật liệu xây dựng",
                      "Web và ứng dụng di động",
                      "Phân quyền đến từng thao tác",
                    ]
                  : [
                      "Minerals, stone, sand, construction materials",
                      "Web and mobile apps",
                      "Permissions down to each action",
                    ]
                ).map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4 text-orange-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Value chain card */}
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-300">
                {isVi ? "Một hệ thống, toàn chuỗi" : "One system, end to end"}
              </p>
              <h2
                className="font-black leading-tight text-white"
                style={{ ...barlow, fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)" }}
              >
                {isVi
                  ? "Từ mặt mỏ đến tiền về tài khoản"
                  : "From quarry face to cash collected"}
              </h2>
              <ol className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                {(isVi ? chain.vi : chain.en).map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-sm font-black text-orange-300"
                      style={barlow}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-xs font-semibold text-slate-400">
                <Users className="h-4 w-4 text-amber-300" />
                {(isVi ? hrChain.vi : hrChain.en).join(" → ")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats (placeholder figures) */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {PLACEHOLDER.stats.map(({ value, valueEn, labelVi, labelEn }) => (
              <div key={labelVi}>
                <p
                  className="font-black leading-none text-slate-950"
                  style={{ ...barlow, fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
                >
                  {isVi ? value : (valueEn ?? value)}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {isVi ? labelVi : labelEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={isVi ? "Vấn đề thường gặp" : "Common pain points"}
            title={
              isVi
                ? "Vận hành mỏ bằng sổ sách và Excel thì luôn chậm một nhịp."
                : "Running a quarry on paper and Excel keeps you a step behind."
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map(
              ({ icon: Icon, titleVi, titleEn, descVi, descEn }) => (
                <div
                  key={titleVi}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 bg-orange-50 transition group-hover:border-orange-200 group-hover:bg-orange-100">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-black leading-snug text-slate-950">
                    {isVi ? titleVi : titleEn}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {isVi ? descVi : descEn}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-10 md:py-14" style={{ background: "#0F172A" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow={isVi ? "Giải pháp" : "The solution"}
            title={
              isVi
                ? "BenHub Mine — số hóa toàn bộ chuỗi vận hành mỏ."
                : "BenHub Mine — your whole quarry operation, digitized."
            }
          />
          <p className="-mt-6 mb-10 max-w-3xl text-base leading-relaxed text-slate-400">
            {isVi
              ? "Mỗi bộ phận làm đúng phần việc của mình, ban lãnh đạo xem bức tranh tổng ngay trên Dashboard."
              : "Every department does its own part; leadership sees the full picture on the dashboard."}
          </p>
          <div className="grid gap-5 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, titleVi, titleEn, descVi, descEn }) => (
              <div
                key={titleVi}
                className="rounded-[2rem] border border-white/8 bg-white/5 p-6 backdrop-blur-sm transition hover:border-orange-400/20 hover:bg-white/8"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-950/40">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-black leading-snug text-white">
                  {isVi ? titleVi : titleEn}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {isVi ? descVi : descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="phan-he" className="scroll-mt-16 bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={isVi ? "Các phân hệ chức năng" : "Modules"}
            title={
              isVi
                ? "Đầy đủ nghiệp vụ cho doanh nghiệp khai thác mỏ."
                : "Everything a quarry business needs."
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map(
              ({ icon: Icon, titleVi, titleEn, itemsVi, itemsEn }) => (
                <div
                  key={titleVi}
                  className="group rounded-[2rem] border border-slate-200 bg-slate-50/60 p-6 transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-xl hover:shadow-orange-100/60"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 transition group-hover:bg-orange-100">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="text-base font-black leading-snug text-slate-950">
                      {isVi ? titleVi : titleEn}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {(isVi ? itemsVi : itemsEn).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-relaxed text-slate-600"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
            <a
              href="#dang-ky"
              className="group flex flex-col justify-between rounded-[2rem] bg-orange-500 p-6 text-white transition duration-200 hover:-translate-y-1 hover:bg-orange-600"
            >
              <Boxes className="h-8 w-8 text-white/80" />
              <div className="mt-8">
                <p
                  className="font-black leading-tight"
                  style={{ ...barlow, fontSize: "1.9rem" }}
                >
                  {isVi ? "Tất cả trong một nền tảng." : "All in one platform."}
                </p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold">
                  {isVi ? "Đăng ký dùng thử" : "Start free trial"}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section
        id="dashboard"
        className="scroll-mt-16 py-10 md:py-14"
        style={{ background: "#050B18" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionHeading
                dark
                eyebrow={isVi ? "Dashboard điều hành" : "Executive dashboard"}
                title={
                  isVi
                    ? "Toàn cảnh mỏ trên một màn hình."
                    : "Your whole quarry on one screen."
                }
              />
              <p className="-mt-6 text-base leading-relaxed text-slate-400">
                {isVi
                  ? "Ban giám đốc chọn mỏ và xem ngay các chỉ số tổng hợp: sản lượng, kế hoạch so với thực hiện, tồn kho, phiếu cân trong ngày, công nợ, nhân sự đang trong ca. Không cần chờ báo cáo cuối tháng."
                  : "Pick a quarry and instantly see output, plan vs. actual, inventory, today's tickets, receivables and staff on shift. No waiting for month-end reports."}
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/40 md:p-3">
              <div className="flex items-center gap-2 px-3 pb-2.5 pt-1">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="relative max-h-[560px] overflow-hidden rounded-[1.4rem] bg-white">
                <Image
                  src="/mine/dashboard.png"
                  alt={
                    isVi
                      ? "Bảng điều khiển điều hành mỏ BenHub Mine: sản lượng, trữ lượng, kế hoạch so với thực tế"
                      : "BenHub Mine executive dashboard: output, reserves, plan vs. actual"
                  }
                  width={1280}
                  height={1502}
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="h-auto w-full"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile app */}
      <section className="bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={isVi ? "Ứng dụng di động" : "Mobile apps"}
            title={
              isVi
                ? "Hiện trường kết nối với văn phòng."
                : "The field, connected to the office."
            }
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {mobileRoles.map(
              ({ icon: Icon, roleVi, roleEn, itemsVi, itemsEn }) => (
                <div
                  key={roleVi}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900">
                      <Icon className="h-5 w-5 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-black text-slate-950">
                      {isVi ? roleVi : roleEn}
                    </h3>
                  </div>
                  <ul className="space-y-2.5">
                    {(isVi ? itemsVi : itemsEn).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-slate-600"
                      >
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { store: "App Store", url: PLACEHOLDER.appStoreUrl },
              { store: "Google Play", url: PLACEHOLDER.googlePlayUrl },
            ].map(({ store, url }) => {
              const content = (
                <>
                  <Smartphone className="h-5 w-5 text-orange-400" />
                  <span className="text-left leading-tight">
                    <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      {url
                        ? isVi
                          ? "Tải trên"
                          : "Get it on"
                        : isVi
                          ? "Sắp ra mắt"
                          : "Coming soon"}
                    </span>
                    <span className="block text-sm font-bold">{store}</span>
                  </span>
                </>
              );
              const cls =
                "inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-5 py-3 text-white";
              return url ? (
                <a
                  key={store}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cls} cursor-pointer transition hover:bg-slate-800`}
                >
                  {content}
                </a>
              ) : (
                <span key={store} className={`${cls} opacity-70`}>
                  {content}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={isVi ? "Lợi ích theo vai trò" : "Benefits by role"}
            title={
              isVi
                ? "Mỗi vị trí đều có công cụ phù hợp."
                : "The right tools for every role."
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map(({ icon: Icon, roleVi, roleEn, descVi, descEn }) => (
              <div
                key={roleVi}
                className="group flex gap-4 rounded-[2rem] border border-slate-200 p-6 transition hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 transition group-hover:bg-orange-100">
                  <Icon className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-950">
                    {isVi ? roleVi : roleEn}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {isVi ? descVi : descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section className="py-10 md:py-14" style={{ background: "#0F172A" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow={isVi ? "Quy trình triển khai" : "Rollout"}
            title={
              isVi
                ? "Bắt đầu nhanh, không gián đoạn sản xuất."
                : "Get started fast, without disrupting production."
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ num, titleVi, titleEn, descVi, descEn }) => (
              <div
                key={num}
                className="relative rounded-[2rem] border border-white/8 bg-white/5 p-6 backdrop-blur-sm transition hover:border-orange-400/20 hover:bg-white/8"
              >
                <span
                  className="font-black leading-none text-orange-400/80"
                  style={{ ...barlow, fontSize: "2.6rem" }}
                >
                  {num}
                </span>
                <h3 className="mt-4 text-lg font-black leading-snug text-white">
                  {isVi ? titleVi : titleEn}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {isVi ? descVi : descEn}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-orange-400/20 bg-orange-500/10 px-5 py-3 text-sm font-semibold text-orange-200">
            <AlarmClock className="h-4 w-4" />
            {isVi ? PLACEHOLDER.rolloutVi : PLACEHOLDER.rolloutEn}
          </p>
        </div>
      </section>

      {/* Security */}
      <section className="bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={isVi ? "Bảo mật và độ tin cậy" : "Security & reliability"}
            title={
              isVi
                ? "Dữ liệu mỏ của bạn được kiểm soát chặt chẽ."
                : "Your quarry data, tightly controlled."
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {security.map(
              ({ icon: Icon, titleVi, titleEn, descVi, descEn }) => (
                <div
                  key={titleVi}
                  className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="mb-4 h-6 w-6 text-orange-500" />
                  <h3 className="text-base font-black text-slate-950">
                    {isVi ? titleVi : titleEn}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {isVi ? descVi : descEn}
                  </p>
                </div>
              ),
            )}
          </div>
          <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Cloud className="h-4 w-4 text-orange-500" />
            {isVi ? PLACEHOLDER.hostingVi : PLACEHOLDER.hostingEn}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={isVi ? "Câu hỏi thường gặp" : "FAQ"}
            title={isVi ? "Bạn còn thắc mắc?" : "Questions?"}
          />
          <div className="divide-y divide-slate-200 rounded-[2rem] border border-slate-200">
            {[...faqs, ...PLACEHOLDER.faqs].map(({ qVi, qEn, aVi, aEn }) => (
              <details key={qVi} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-slate-950">
                  {isVi ? qVi : qEn}
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {isVi ? aVi : aEn}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section
        id="dang-ky"
        className="scroll-mt-16 py-10 md:py-14"
        style={{ background: "#050B18" }}
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_560px]">
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                {isVi ? "Đăng ký dùng thử" : "Free trial"}
              </p>
              <h2
                className="font-black leading-[0.95] tracking-tight text-white"
                style={{ ...barlow, fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
              >
                {isVi
                  ? "Sẵn sàng số hóa mỏ của bạn?"
                  : "Ready to digitize your quarry?"}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
                {isVi
                  ? "Đăng ký tài khoản doanh nghiệp, đội ngũ BenHub sẽ liên hệ tư vấn và demo trực tiếp trên quy trình của doanh nghiệp bạn."
                  : "Register your company account and the BenHub team will reach out to advise and demo on your own workflows."}
              </p>
              <div className="mt-8 space-y-3">
                {[
                  {
                    icon: Wallet,
                    vi: "Dùng thử miễn phí, tư vấn miễn phí",
                    en: "Free trial and free consultation",
                  },
                  {
                    icon: LayoutDashboard,
                    vi: "Demo trên quy trình thực tế của mỏ",
                    en: "Demo on your quarry's real workflows",
                  },
                  {
                    icon: Smartphone,
                    vi: "Web cho văn phòng, app cho hiện trường",
                    en: "Web for the office, apps for the field",
                  },
                ].map(({ icon: Icon, vi, en }) => (
                  <div key={vi} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/15">
                      <Icon className="h-4 w-4 text-orange-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-300">
                      {isVi ? vi : en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <PartnerSignupForm variant="mine" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
