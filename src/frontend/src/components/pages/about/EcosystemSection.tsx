import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Smartphone,
  Camera,
  Truck,
  Store,
  CreditCard,
  Package,
  BrainCircuit,
} from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";

const PRODUCTS = [
  { icon: LayoutDashboard, nameKey: "prod1_name", descKey: "prod1_desc", featured: true, color: "#F0B429" },
  { icon: Smartphone, nameKey: "prod2_name", descKey: "prod2_desc", featured: false, color: "#F97316" },
  { icon: Camera, nameKey: "prod3_name", descKey: "prod3_desc", featured: false, color: "#3B82F6" },
  { icon: Truck, nameKey: "prod4_name", descKey: "prod4_desc", featured: false, color: "#22C55E" },
  { icon: Store, nameKey: "prod5_name", descKey: "prod5_desc", featured: false, color: "#8B5CF6" },
  { icon: CreditCard, nameKey: "prod6_name", descKey: "prod6_desc", featured: false, color: "#EC4899" },
  { icon: Package, nameKey: "prod7_name", descKey: "prod7_desc", featured: false, color: "#14B8A6" },
  { icon: BrainCircuit, nameKey: "prod8_name", descKey: "prod8_desc", featured: false, color: "#F59E0B" },
] as const;

export function EcosystemSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="relative overflow-hidden bg-[#0A1628] py-14 md:py-20">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Chapter watermark */}
      <div
        className="pointer-events-none absolute -left-8 bottom-4 select-none font-black leading-none opacity-[0.03] text-white"
        style={{
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          fontSize: "clamp(12rem, 25vw, 28rem)",
        }}
        aria-hidden="true"
      >
        04
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "rgba(240,180,41,0.5)" }} />
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(240,180,41,0.7)" }}>
              {t("eco_label")}
            </p>
          </div>
          <h2
            className="font-black leading-tight text-white"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
            }}
          >
            {t("eco_h2_1")}
            <br />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>{t("eco_h2_2")}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            {t("eco_sub")}
          </p>
        </FadeUp>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map(({ icon: Icon, nameKey, descKey, featured, color }, i) => (
            <FadeUp key={nameKey} delay={i * 50}>
              <div
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
                style={
                  featured
                    ? {
                        background: `linear-gradient(135deg, rgba(240,180,41,0.15), rgba(240,180,41,0.05))`,
                        border: "1px solid rgba(240,180,41,0.3)",
                      }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }
                }
              >
                {/* Featured badge */}
                {featured && (
                  <div
                    className="absolute right-4 top-4 rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ background: "rgba(240,180,41,0.2)", color: "#F0B429" }}
                  >
                    CORE
                  </div>
                )}

                {/* Icon */}
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${color}18`, border: `1px solid ${color}25` }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>

                {/* Text */}
                <div>
                  <p
                    className="font-bold text-white"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {t(nameKey as Parameters<typeof t>[0])}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
                    {t(descKey as Parameters<typeof t>[0])}
                  </p>
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 inset-x-0 h-0.5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"
                  style={{ background: color }}
                />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
