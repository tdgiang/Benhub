import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/ui/FadeUp";

const PROVINCES = [
  { name: "Hà Nội", entity: "BenHub Hà Nội", status: "active" as const },
  { name: "Nghệ An", entity: "BenHub Nghệ An", status: "active" as const },
  { name: "Quảng Ninh", entity: "BenHub Quảng Ninh", status: "active" as const },
  { name: "Đồng Nai", entity: "BenHub Đồng Nai", status: "active" as const },
  { name: "Bình Dương", entity: "BenHub Bình Dương", status: "active" as const },
  { name: "Long An", entity: "BenHub Long An", status: "active" as const },
];

export function PresenceSection() {
  const t = useTranslations("AboutUs");

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-14 md:py-20">
      {/* Chapter watermark */}
      <div
        className="pointer-events-none absolute -right-6 bottom-0 select-none font-black leading-none text-slate-200"
        style={{
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          fontSize: "clamp(10rem, 20vw, 22rem)",
        }}
        aria-hidden="true"
      >
        07
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
          {/* Left */}
          <FadeUp>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[#F0B429]" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F0B429]">
                {t("presence_label")}
              </p>
            </div>
            <h2
              className="font-black leading-tight text-[#0F2246]"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
              }}
            >
              {t("presence_h2_1")}
              <br />
              <span style={{ color: "#F0B429" }}>{t("presence_h2_2")}</span>
            </h2>
            <p className="mt-6 text-base leading-[1.85] text-slate-600">{t("presence_sub")}</p>

            {/* Ownership callout */}
            <div
              className="mt-8 rounded-2xl p-5"
              style={{ background: "rgba(15,34,70,0.05)", border: "1px solid rgba(15,34,70,0.08)" }}
            >
              <div className="flex gap-3">
                <div
                  className="mt-0.5 h-10 w-1 shrink-0 rounded-full"
                  style={{ background: "#F0B429" }}
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0F2246] opacity-50">
                    Mô hình sở hữu
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t("presence_model")}</p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { val: "6", label: "Tỉnh thành" },
                { val: "51%", label: "BenHub giữ" },
                { val: "10%", label: "ESOP" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl py-4 text-center"
                  style={{ background: "rgba(15,34,70,0.04)" }}
                >
                  <p
                    className="font-black text-[#0F2246]"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      fontSize: "1.75rem",
                    }}
                  >
                    {s.val}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Right — province grid */}
          <FadeUp delay={160}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PROVINCES.map((p) => (
                <div
                  key={p.name}
                  className="group relative overflow-hidden rounded-2xl bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{ border: "1px solid #E8EEFA", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                >
                  {/* Active indicator line */}
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 transition-all duration-200 group-hover:h-1"
                    style={{ background: p.status === "active" ? "#22C55E" : "#F0B429" }}
                  />

                  {/* Status */}
                  <div className="mb-3 flex items-center gap-1.5">
                    <span
                      className="relative flex h-2 w-2"
                    >
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                        style={{ background: p.status === "active" ? "#22C55E" : "#F0B429" }}
                      />
                      <span
                        className="relative inline-flex h-2 w-2 rounded-full"
                        style={{ background: p.status === "active" ? "#22C55E" : "#F0B429" }}
                      />
                    </span>
                    <span className="text-[11px] font-semibold" style={{ color: p.status === "active" ? "#16A34A" : "#B45309" }}>
                      {p.status === "active" ? t("presence_active") : t("presence_coming")}
                    </span>
                  </div>

                  <p className="font-bold text-[#0F2246]">{p.name}</p>
                  <p className="mt-0.5 text-[12px] text-slate-400">{p.entity}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
