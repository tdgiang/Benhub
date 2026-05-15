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

const PRODUCT_ICONS = [
  LayoutDashboard,
  Smartphone,
  Camera,
  Truck,
  Store,
  CreditCard,
  Package,
  BrainCircuit,
] as const;

const PRODUCT_KEYS = [
  { name: "prod1_name", desc: "prod1_desc" },
  { name: "prod2_name", desc: "prod2_desc" },
  { name: "prod3_name", desc: "prod3_desc" },
  { name: "prod4_name", desc: "prod4_desc" },
  { name: "prod5_name", desc: "prod5_desc" },
  { name: "prod6_name", desc: "prod6_desc" },
  { name: "prod7_name", desc: "prod7_desc" },
  { name: "prod8_name", desc: "prod8_desc" },
] as const;

export function EcosystemSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="bg-[#F8FAFC] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-14 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.22em]"
            style={{ color: "#F0B429" }}
          >
            {t("eco_label")}
          </p>
          <h2
            className="font-black leading-tight text-[#0F2246]"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
            }}
          >
            {t("eco_h2_1")}
            <br />
            {t("eco_h2_2")}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-slate-500">
            {t("eco_sub")}
          </p>
        </FadeUp>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCT_KEYS.map((keys, i) => {
            const Icon = PRODUCT_ICONS[i];
            return (
              <FadeUp key={keys.name} delay={i * 60}>
                <div
                  className="group flex h-full flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#F0B429]/40 hover:shadow-lg"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "rgba(240,180,41,0.10)" }}
                  >
                    <Icon className="h-5 w-5" style={{ color: "#C8941A" }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F2246]">
                      {t(keys.name as Parameters<typeof t>[0])}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {t(keys.desc as Parameters<typeof t>[0])}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
