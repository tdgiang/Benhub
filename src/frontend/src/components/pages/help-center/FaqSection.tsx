import { Building2, ChevronDown, Truck, UserCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/ui/FadeUp";

const CATEGORIES = [
  {
    icon: UserCircle,
    labelKey: "cat_account",
    items: ["faq_account_1", "faq_account_2", "faq_account_3"],
  },
  {
    icon: Truck,
    labelKey: "cat_driver",
    items: ["faq_driver_1", "faq_driver_2", "faq_driver_3"],
  },
  {
    icon: Building2,
    labelKey: "cat_partner",
    items: ["faq_partner_1", "faq_partner_2", "faq_partner_3"],
  },
] as const;

export function FaqSection() {
  const t = useTranslations("HelpCenter");

  return (
    <section className="bg-slate-50 py-14 md:py-20" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="sr-only">
        FAQ
      </h2>
      <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
        {CATEGORIES.map(({ icon: Icon, labelKey, items }, catIndex) => (
          <FadeUp key={labelKey} delay={catIndex * 80}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-lg font-black text-slate-950">{t(labelKey as Parameters<typeof t>[0])}</h3>
            </div>

            <div className="space-y-3">
              {items.map((key) => (
                <details
                  key={key}
                  className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm open:border-orange-200 open:shadow-md open:shadow-orange-100/50"
                >
                  <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-slate-950 transition hover:text-orange-600 [&::-webkit-details-marker]:hidden">
                    <span>{t(`${key}_q` as Parameters<typeof t>[0])}</span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-open:rotate-180 group-open:border-orange-200 group-open:text-orange-500"
                      aria-hidden="true"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </summary>
                  <div className="border-t border-slate-100 px-6 pb-5 pt-4">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {t(`${key}_a` as Parameters<typeof t>[0])}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
