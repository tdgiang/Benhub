/**
 * PLACEHOLDER — temporary figures and links pending real data.
 * Replace every value in this block before public launch.
 * Used by the BenHub Mine page and the home hero.
 */
const QUARRIES_CONNECTED = "20+";

export const MINE_PLACEHOLDER = {
  /** Shown on the home hero (Hero.proof_4) and the Mine stats strip. */
  quarriesConnected: QUARRIES_CONNECTED,
  stats: [
    {
      value: QUARRIES_CONNECTED,
      labelVi: "Mỏ đang sử dụng",
      labelEn: "Quarries onboard",
    },
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
  /** Empty string links the badge to the trial form instead of a store. */
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
