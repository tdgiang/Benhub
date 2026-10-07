"use client";

import { useRef, useState } from "react";
import { Building2, Mountain } from "lucide-react";
import { useTranslations } from "next-intl";
import { PartnerLeadForm } from "@/components/marketing/PartnerLeadForm";
import { PartnerSignupForm } from "@/components/marketing/PartnerSignupForm";

type Tab = "business" | "mine";

const TABS: { id: Tab; icon: typeof Building2; labelKey: string }[] = [
  { id: "business", icon: Building2, labelKey: "tab_business" },
  { id: "mine", icon: Mountain, labelKey: "tab_mine" },
];

/**
 * Partner sign-up with two tabs:
 * - business: general partners → lead in the BenHub backend
 * - mine: quarry businesses → BenHub Mine account registration
 * Both panels stay mounted so switching tabs keeps typed input.
 */
export function PartnerSignupTabs({
  defaultTab,
  source,
}: {
  defaultTab: Tab;
  /** Lead `source` for the business tab, e.g. "partner_page". */
  source: string;
}) {
  const t = useTranslations("PartnerForm");
  const [active, setActive] = useState<Tab>(defaultTab);
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    business: null,
    mine: null,
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next: Tab = active === "business" ? "mine" : "business";
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div id="partner-form" className="scroll-mt-20">
      <div
        role="tablist"
        aria-label={t("tabs_aria")}
        onKeyDown={onKeyDown}
        className="mb-4 grid grid-cols-2 gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-sm"
      >
        {TABS.map(({ id, icon: Icon, labelKey }) => {
          const selected = active === id;
          return (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[id] = el;
              }}
              type="button"
              role="tab"
              id={`partner-tab-${id}`}
              aria-selected={selected}
              aria-controls={`partner-panel-${id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(id)}
              className={`inline-flex cursor-pointer items-center justify-center gap-1.5 text-center leading-tight min-[360px]:whitespace-nowrap rounded-xl px-2 py-3 text-[13px] font-black sm:gap-2 sm:px-4 sm:text-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/40 ${
                selected
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-950/30"
                  : "text-slate-300 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon className="hidden h-4 w-4 shrink-0 min-[400px]:block" />
              {t(labelKey)}
            </button>
          );
        })}
      </div>

      {TABS.map(({ id }) => (
        <div
          key={id}
          role="tabpanel"
          id={`partner-panel-${id}`}
          aria-labelledby={`partner-tab-${id}`}
          hidden={active !== id}
        >
          {id === "business" ? (
            <PartnerLeadForm source={source} />
          ) : (
            <PartnerSignupForm variant="mine" />
          )}
        </div>
      ))}
    </div>
  );
}
