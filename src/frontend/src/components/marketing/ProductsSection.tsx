import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  CreditCard,
  Eye,
  Globe,
  Layers3,
  LayoutDashboard,
  Link2,
  Mountain,
  Network,
  Smartphone,
  Truck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

/** 2×4 cell centers (viewBox 0–100) — lines radiate from shared Core hub */
const ECOSYSTEM_HUB_CENTERS: { x: number; y: number }[] = [
  { x: 26, y: 16 },
  { x: 74, y: 16 },
  { x: 26, y: 39 },
  { x: 74, y: 39 },
  { x: 26, y: 62 },
  { x: 74, y: 62 },
  { x: 26, y: 85 },
  { x: 74, y: 85 },
];

export function ProductsSection() {
  const t = useTranslations("Products");

  const products = [
    {
      icon: LayoutDashboard,
      name: "BenHub Core",
      tag: "Platform",
      description: t("core_desc"),
      features: [t("core_f1"), t("core_f2"), t("core_f3")],
      layer: t("core_layer"),
      accent: "from-orange-500 to-amber-400",
      dotClass: "bg-orange-400",
      featured: "core",
    },
    {
      icon: Smartphone,
      name: "BenHub Driver",
      tag: "Mobile",
      description: t("driver_desc"),
      features: [t("driver_f1"), t("driver_f2"), t("driver_f3")],
      layer: t("driver_layer"),
      accent: "from-blue-500 to-cyan-400",
      dotClass: "bg-sky-400",
    },
    {
      icon: Eye,
      name: "BenHub Supervisor",
      tag: "Monitor",
      description: t("supervisor_desc"),
      features: [t("supervisor_f1"), t("supervisor_f2"), t("supervisor_f3")],
      layer: t("supervisor_layer"),
      accent: "from-purple-500 to-fuchsia-400",
      dotClass: "bg-fuchsia-400",
    },
    {
      icon: Truck,
      name: "BenHub Fleet",
      tag: "Management",
      description: t("fleet_desc"),
      features: [t("fleet_f1"), t("fleet_f2"), t("fleet_f3")],
      layer: t("fleet_layer"),
      accent: "from-green-500 to-emerald-400",
      dotClass: "bg-emerald-400",
    },
    {
      icon: Globe,
      name: "BenHub Marketplace",
      tag: "Platform",
      description: t("marketplace_desc"),
      features: [t("marketplace_f1"), t("marketplace_f2"), t("marketplace_f3")],
      layer: t("marketplace_layer"),
      accent: "from-cyan-500 to-sky-400",
      dotClass: "bg-cyan-400",
    },
    {
      icon: CreditCard,
      name: "BenHub Finance",
      tag: "Fintech",
      description: t("finance_desc"),
      features: [t("finance_f1"), t("finance_f2"), t("finance_f3")],
      layer: t("finance_layer"),
      accent: "from-emerald-500 to-lime-400",
      dotClass: "bg-lime-400",
      featured: "finance",
    },
    {
      icon: Mountain,
      name: "BenHub Mine",
      tag: "Mining",
      description: t("mine_desc"),
      features: [t("mine_f1"), t("mine_f2"), t("mine_f3")],
      layer: t("mine_layer"),
      accent: "from-stone-400 to-amber-500",
      dotClass: "bg-amber-500",
    },
    {
      icon: Cpu,
      name: "BenHub AI Labs",
      tag: "AI",
      description: t("ai_desc"),
      features: [t("ai_f1"), t("ai_f2"), t("ai_f3")],
      layer: t("ai_layer"),
      accent: "from-violet-500 to-indigo-400",
      dotClass: "bg-violet-400",
    },
  ];

  const coreProduct = products.find((p) => p.featured === "core")!;
  const financeProduct = products.find((p) => p.featured === "finance")!;
  const supportingProducts = products.filter((p) => !p.featured);
  const ctaText = t("cta");
  const mapLabel = t("map_label");
  const mapTitle = t("map_title");
  const mapSubtitle = t("map_subtitle");
  const flowLegend = t("flow_legend");
  const layerTie = t("layer_tie");
  const mapTileBadge = t("map_tile_badge");

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
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-orange-300">
          <Layers3 className="h-4 w-4" />
          {t("badge")}
        </p>
        <div className="grid gap-5 lg:grid-cols-12">
          <FeaturedProductCard
            product={coreProduct}
            ctaText={ctaText}
            className="lg:col-span-7"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/4 p-6 shadow-2xl shadow-black/30 backdrop-blur lg:col-span-5">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
                  {mapLabel}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white">
                  {mapTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {mapSubtitle}
                </p>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-orange-300">
                <Network className="h-5 w-5" />
              </div>
            </div>

            <div className="relative min-h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
              >
                {ECOSYSTEM_HUB_CENTERS.map((pt, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={pt.x}
                    y2={pt.y}
                    stroke="rgb(249 115 22)"
                    strokeOpacity="0.2"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                  />
                ))}
                <circle
                  cx="50"
                  cy="50"
                  r="3.2"
                  className="fill-orange-500/90 motion-safe:animate-pulse"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="6"
                  fill="none"
                  stroke="rgb(249 115 22)"
                  strokeOpacity="0.25"
                  strokeWidth="0.4"
                />
              </svg>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.22),transparent_42%)]" />
              <div className="relative z-10 grid h-full grid-cols-2 gap-3">
                {products.map(({ name, layer, accent }) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-white/10 bg-slate-950/55 p-3 shadow-sm shadow-black/20 backdrop-blur-[2px] transition hover:border-orange-400/25 hover:bg-slate-950/75"
                  >
                    <div
                      className={`mb-3 h-1 rounded-full bg-linear-to-r ${accent}`}
                    />
                    <p className="text-xs font-bold text-white">{layer}</p>
                    <p className="mt-1 text-[11px] leading-snug text-slate-500">
                      {name.replace("BenHub ", "")}
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                      <span
                        className="inline-block h-1 w-1 rounded-full bg-orange-400/80"
                        aria-hidden
                      />
                      {mapTileBadge}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <FeaturedProductCard
            product={financeProduct}
            ctaText={ctaText}
            className="lg:col-span-5"
          />

          <div className="flex flex-col gap-4 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/4 px-4 py-3 backdrop-blur-sm">
              <span className="flex shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                <Link2 className="h-3.5 w-3.5 text-orange-400/90" aria-hidden />
                {flowLegend}
              </span>
              <div className="flex min-h-[6px] min-w-[140px] flex-1 items-center gap-0.5 sm:gap-1">
                {supportingProducts.map((p) => (
                  <div
                    key={p.name}
                    title={p.name}
                    className={`h-1.5 min-w-[6px] flex-1 rounded-full bg-linear-to-r ${p.accent}`}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {supportingProducts.map((product) => (
                <ProductMiniCard
                  key={product.name}
                  product={product}
                  layerTie={layerTie}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Product = {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  tag: string;
  description: string;
  features: string[];
  layer: string;
  accent: string;
  dotClass: string;
  featured?: string;
};

function FeaturedProductCard({
  product,
  ctaText,
  className,
}: {
  product: Product;
  ctaText: string;
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

        <Link
          href="/doi-tac"
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-0.5 hover:bg-orange-600"
        >
          {ctaText}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function ProductMiniCard({
  product,
  layerTie,
}: {
  product: Product;
  layerTie: string;
}) {
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
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${product.dotClass}`}
            />
            <span className="text-xs text-slate-500">{feature}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
        <Link2 className="h-3 w-3 shrink-0 text-slate-500" aria-hidden />
        {layerTie}
      </p>
    </article>
  );
}
