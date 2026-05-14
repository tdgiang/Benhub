import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  CreditCard,
  Eye,
  Globe,
  Layers3,
  LayoutDashboard,
  Network,
  Package,
  Smartphone,
  Truck,
} from "lucide-react";

const products = [
  {
    icon: LayoutDashboard,
    name: "BenHub Core",
    tag: "Platform",
    description: "Trung tâm điều hành toàn bộ hệ sinh thái logistics xây dựng.",
    features: ["Dashboard & Dispatch", "Smart Reporting", "Control Tower"],
    layer: "Điều hành",
    accent: "from-orange-500 to-amber-400",
    featured: "core",
  },
  {
    icon: Smartphone,
    name: "BenHub Driver",
    tag: "Mobile",
    description: "App tài xế — nhận chuyến, GPS, E-Ticket số, ví tiền.",
    features: ["Nhận chuyến 1-tap", "GPS Navigation", "E-Ticket số"],
    layer: "Tuyến đầu",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    icon: Eye,
    name: "BenHub Supervisor",
    tag: "Monitor",
    description: "Giám sát công trường realtime, phát hiện gian lận tức thì.",
    features: ["Realtime tracking", "Phát hiện lệch tuyến", "Kiểm tải"],
    layer: "Giám sát",
    accent: "from-purple-500 to-fuchsia-400",
  },
  {
    icon: Truck,
    name: "BenHub Fleet",
    tag: "Management",
    description: "Quản lý toàn bộ đội xe, tài xế, bảo dưỡng và chi phí.",
    features: ["Quản lý đội xe", "Lịch bảo dưỡng", "Báo cáo chi phí"],
    layer: "Đội xe",
    accent: "from-green-500 to-emerald-400",
  },
  {
    icon: Globe,
    name: "BenHub Marketplace",
    tag: "Platform",
    description: "Sàn kết nối cung–cầu vận tải với Dynamic Pricing.",
    features: ["Smart Matching", "Bidding Engine", "Rating System"],
    layer: "Thị trường",
    accent: "from-cyan-500 to-sky-400",
  },
  {
    icon: CreditCard,
    name: "BenHub Finance",
    tag: "Fintech",
    description: "Tài chính vận tải — factoring, ứng tiền nhanh, ví điện tử.",
    features: ["Ứng tiền 24h", "Factoring", "Ví điện tử"],
    layer: "Dòng tiền",
    accent: "from-emerald-500 to-lime-400",
    featured: "finance",
  },
  {
    icon: Package,
    name: "BenHub Materials",
    tag: "Marketplace",
    description: "Sàn giao dịch vật liệu — kết nối mỏ, báo giá realtime.",
    features: ["Kết nối mỏ đất", "Báo giá realtime", "Logistics vật liệu"],
    layer: "Vật liệu",
    accent: "from-amber-500 to-yellow-400",
  },
  {
    icon: Cpu,
    name: "BenHub AI Labs",
    tag: "AI",
    description: "AI logistics — chống gian lận, tối ưu route, dự báo nhu cầu.",
    features: ["Phát hiện gian lận", "Route AI", "Demand Forecast"],
    layer: "AI/Data",
    accent: "from-violet-500 to-indigo-400",
  },
];

const coreProduct = products.find((product) => product.featured === "core")!;
const financeProduct = products.find(
  (product) => product.featured === "finance",
)!;
const supportingProducts = products.filter((product) => !product.featured);

export function ProductsSection() {
  return (
    <section
      id="products"
      className="relative overflow-hidden py-8 text-white md:py-8"
      style={{ background: "#050B18" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-300">
              <Layers3 className="h-4 w-4" />
              Hệ thống sản phẩm
            </p>
            <h2
              className="font-black leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.7rem, 6vw, 5rem)",
              }}
            >
              8 sản phẩm.
              <span className="block bg-linear-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                1 hệ sinh thái vận hành.
              </span>
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg lg:justify-self-end">
            BenHub không chỉ là dashboard hay app tài xế. Đây là bộ sản phẩm
            liên kết theo chuỗi: điều hành, giám sát, marketplace, tài chính,
            vật liệu và AI.
          </p>
        </div> */}
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-300">
          <Layers3 className="h-4 w-4" />
          Hệ thống sản phẩm
        </p>
        <div className="grid gap-5 lg:grid-cols-12">
          <FeaturedProductCard
            product={coreProduct}
            className="lg:col-span-7"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/4 p-6 shadow-2xl shadow-black/30 backdrop-blur lg:col-span-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                  Ecosystem map
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  Các lớp sản phẩm kết nối nhau
                </h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-orange-300">
                <Network className="h-5 w-5" />
              </div>
            </div>

            <div className="relative min-h-[280px] rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(249,115,22,0.18),transparent_36%)]" />
              <div className="relative grid h-full grid-cols-2 gap-3">
                {products.map(({ name, layer, accent }) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3"
                  >
                    <div
                      className={`mb-3 h-1 rounded-full bg-linear-to-r ${accent}`}
                    />
                    <p className="text-xs font-bold text-white">{layer}</p>
                    <p className="mt-1 text-[11px] leading-snug text-slate-500">
                      {name.replace("BenHub ", "")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <FeaturedProductCard
            product={financeProduct}
            className="lg:col-span-5"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            {supportingProducts.map((product) => (
              <ProductMiniCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Product = (typeof products)[number];

function FeaturedProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const Icon = product.icon;

  return (
    <article
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/4 p-6 shadow-2xl shadow-black/30 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-orange-400/30 ${className ?? ""}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${product.accent}`}
      />
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl transition group-hover:bg-orange-500/20" />

      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-orange-300">
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            {product.tag}
          </span>
        </div>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
          {product.layer}
        </p>
        <h3
          className="font-black leading-none text-white"
          style={{
            fontFamily: "var(--font-barlow), system-ui, sans-serif",
            fontSize: "clamp(2.4rem, 5vw, 4rem)",
          }}
        >
          {product.name}
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
          {product.description}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {product.features.map((feature) => (
            <div
              key={feature}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
            >
              <CheckCircle2 className="mb-3 h-4 w-4 text-orange-300" />
              <p className="text-sm font-medium leading-snug text-slate-200">
                {feature}
              </p>
            </div>
          ))}
        </div>

        <a
          href="/doi-tac"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
        >
          Hợp tác triển khai
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function ProductMiniCard({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-400/25 hover:bg-white/7">
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${product.accent}`}
      />
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 transition group-hover:text-orange-300">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
          {product.tag}
        </span>
      </div>

      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-300">
        {product.layer}
      </p>
      <h3 className="text-lg font-bold text-white">{product.name}</h3>
      <p className="mt-3 min-h-16 text-sm leading-relaxed text-slate-500 transition group-hover:text-slate-400">
        {product.description}
      </p>

      <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
        {product.features.slice(0, 2).map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
            <span className="text-xs text-slate-500">{feature}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
