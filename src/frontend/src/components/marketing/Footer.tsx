import Link from "next/link";
import { Truck, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer({ className }: { className?: string }) {
  const t = useTranslations("Footer");

  const products = [
    "BenHub Core",
    "BenHub Driver",
    "BenHub Fleet",
    "BenHub Finance",
    "BenHub Materials",
    "BenHub AI Labs",
  ];

  const company = [
    { label: t("company_about"), href: "/#hero" },
    { label: t("company_news"), href: "/tin-tuc" },
    { label: t("company_driver"), href: "/dang-ky-tai-xe" },
    { label: t("company_hiring"), href: "#" },
    { label: t("company_partner"), href: "/doi-tac" },
    { label: t("company_investor"), href: "/#roadmap" },
  ];

  return (
    <footer
      id="main-footer"
      className={`bg-[#0F172A] border-t border-white/5 ${className ?? ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
                <Truck className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Ben<span className="text-orange-400">Hub</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              {t("tagline")}
            </p>
            {/* Social */}
            <div className="flex gap-2.5">
              {[
                {
                  id: "fb",
                  label: "Facebook",
                  path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                },
                {
                  id: "li",
                  label: "LinkedIn",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map(({ id, label, path }) => (
                <a
                  key={id}
                  href="#"
                  id={`footer-${id}`}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 hover:bg-orange-500 hover:border-orange-500 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
              <a
                href="#"
                aria-label="Zalo"
                className="h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-orange-500 hover:border-orange-500 flex items-center justify-center text-slate-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                Zalo OA
              </a>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              {t("products_header")}
            </h3>
            <ul className="space-y-2.5">
              {products.map((p) => (
                <li key={p}>
                  <Link
                    href="/#products"
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors cursor-pointer"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              {t("company_header")}
            </h3>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-slate-400 hover:text-orange-400 text-sm transition-colors cursor-pointer"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">
              {t("contact_header")}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:1800000000"
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-orange-400 transition-colors">
                      {t("contact_phone")}
                    </p>
                    <p className="text-slate-500 text-xs">{t("contact_phone_label")}</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@benhub.vn"
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white text-sm font-medium group-hover:text-orange-400 transition-colors">
                      {t("contact_email")}
                    </p>
                    <p className="text-slate-500 text-xs">{t("contact_email_label")}</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">{t("contact_address")}</p>
                  <p className="text-slate-500 text-xs">{t("contact_address_label")}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm font-medium">{t("contact_hours")}</p>
                  <p className="text-slate-500 text-xs">{t("contact_hours_label")}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">{t("copyright")}</p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors cursor-pointer"
            >
              {t("privacy")}
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors cursor-pointer"
            >
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
