export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "BenHub";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const HARDCODED_USERS = [
  {
    id: "1",
    name: "Admin",
    email: "admin@example.com",
    password: "Admin@123",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Editor",
    email: "editor@example.com",
    password: "Editor@123",
    role: "editor" as const,
  },
];

export const NAV_ITEMS = [
  { label: "Vấn đề", href: "/#problem" },
  { label: "Giải pháp", href: "/#solution" },
  { label: "Sản phẩm", href: "/#products" },
  { label: "Hệ sinh thái", href: "/#ecosystem" },
  { label: "Lộ trình", href: "/#roadmap" },
];

export const CMS_NAV_ITEMS = [
  { label: "Dashboard", href: "/cms/dashboard", icon: "LayoutDashboard" },
  { label: "Bài viết", href: "/cms/posts", icon: "FileText" },
  { label: "Leads", href: "/cms/leads", icon: "Inbox" },
  { label: "Cài đặt", href: "/cms/settings", icon: "Settings" },
];

export const FEATURES = [
  {
    title: "Hiệu suất cao",
    description:
      "Được tối ưu hóa với Next.js App Router, Server Components và Streaming để mang lại tốc độ tải trang cực nhanh.",
    icon: "Zap",
  },
  {
    title: "Bảo mật mạnh mẽ",
    description:
      "Tích hợp NextAuth.js v5 với JWT session, bảo vệ route và role-based access control sẵn sàng.",
    icon: "Shield",
  },
  {
    title: "CMS nội bộ",
    description:
      "Dashboard quản trị đầy đủ tính năng với CRUD bài viết, DataTable tái sử dụng và giao diện thân thiện.",
    icon: "LayoutDashboard",
  },
  {
    title: "Dark Mode",
    description:
      "Hỗ trợ dark/light mode tự động với next-themes và Tailwind CSS class strategy.",
    icon: "Moon",
  },
  {
    title: "TypeScript Strict",
    description:
      "Toàn bộ codebase TypeScript strict mode, không có any, tích hợp ESLint và Prettier.",
    icon: "Code2",
  },
  {
    title: "Responsive Design",
    description:
      "Mobile-first với Tailwind CSS, hoạt động hoàn hảo trên mọi kích thước màn hình.",
    icon: "Smartphone",
  },
];
