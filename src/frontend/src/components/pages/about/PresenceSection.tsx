import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/ui/FadeUp";

const PROVINCES = [
  { name: "Hà Nội", entity: "BenHub Hà Nội", status: "active" },
  { name: "Nghệ An", entity: "BenHub Nghệ An", status: "active" },
  { name: "Quảng Ninh", entity: "BenHub Quảng Ninh", status: "active" },
  { name: "Đồng Nai", entity: "BenHub Đồng Nai", status: "active" },
  { name: "Bình Dương", entity: "BenHub Bình Dương", status: "active" },
  { name: "Long An", entity: "BenHub Long An", status: "active" },
] as const;

export function PresenceSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="bg-[#F8FAFC] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-start">
          {/* Left */}
          <FadeUp>
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.22em]"
              style={{ color: "#F0B429" }}
            >
              {t("presence_label")}
            </p>
            <h2
              className="font-black leading-tight text-[#0F2246]"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
              }}
            >
              {t("presence_h2_1")}
              <br />
              <span style={{ color: "#F0B429" }}>{t("presence_h2_2")}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              {t("presence_sub")}
            </p>
            {/* Ownership note */}
            <div
              className="mt-8 rounded-xl border-l-4 p-4 text-sm text-slate-600"
              style={{
                borderLeftColor: "#F0B429",
                background: "rgba(15,34,70,0.04)",
              }}
            >
              {t("presence_model")}
            </div>
          </FadeUp>

          {/* Right — province grid */}
          <FadeUp delay={120}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PROVINCES.map((p, i) => (
                <div
                  key={p.name}
                  className="rounded-xl border border-[#E2E8F0] bg-white p-4 transition-all duration-200 hover:border-[#F0B429]/40 hover:shadow-md"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        background: p.status === "active" ? "#22c55e" : "#F0B429",
                      }}
                    />
                    <span className="text-[11px] font-semibold text-slate-500">
                      {p.status === "active" ? t("presence_active") : t("presence_coming")}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[#0F2246]">{p.name}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{p.entity}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
