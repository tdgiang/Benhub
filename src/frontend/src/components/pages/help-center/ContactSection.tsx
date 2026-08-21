import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeUp } from "@/components/ui/FadeUp";

export function ContactSection() {
  const t = useTranslations("HelpCenter");
  const tFooter = useTranslations("Footer");

  const channels = [
    {
      icon: Phone,
      href: "tel:1800000000",
      title: tFooter("contact_phone"),
      desc: tFooter("contact_phone_label"),
    },
    {
      icon: Mail,
      href: "mailto:contact@benhub.vn",
      title: tFooter("contact_email"),
      desc: tFooter("contact_email_label"),
    },
    {
      icon: MapPin,
      href: undefined,
      title: tFooter("contact_address"),
      desc: tFooter("contact_address_label"),
    },
  ] as const;

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
            {t("contact_label")}
          </p>
          <h2
            className="font-black leading-tight text-slate-950"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            }}
          >
            {t("contact_h2")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-500 md:text-base">
            {t("contact_desc")}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {channels.map(({ icon: Icon, href, title, desc }) => {
            const content = (
              <>
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-slate-950">{title}</p>
                <p className="text-sm text-slate-500">{desc}</p>
              </>
            );
            const className =
              "rounded-2xl border border-slate-200 p-6 text-center transition-colors hover:border-orange-300";

            return href ? (
              <a key={desc} href={href} className={className}>
                {content}
              </a>
            ) : (
              <div key={desc} className={className}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
