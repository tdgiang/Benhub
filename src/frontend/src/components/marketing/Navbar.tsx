"use client";

import { useState, useEffect } from "react";
import { Truck, Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

function getScrollTop() {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function Navbar({ className }: { className?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: t("nav_solution"), href: "/#solution" },
    { label: t("nav_products"), href: "/#products" },
    { label: t("nav_mine"), href: "/benhub-mine" },
    { label: t("nav_ecosystem"), href: "/#ecosystem" },
    { label: t("nav_news"), href: "/tin-tuc" },
    { label: t("nav_driver"), href: "/dang-ky-tai-xe" },
    { label: t("nav_partner"), href: "/doi-tac" },
    { label: t("nav_about"), href: "/ve-chung-toi" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(getScrollTop() > 60);

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleLocale = () => {
    router.replace(pathname, { locale: locale === "vi" ? "en" : "vi" });
  };

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        id="main-navbar"
        data-scrolled={scrolled ? "true" : "false"}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-slate-900/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent",
          className,
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 cursor-pointer"
            id="navbar-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-sm shadow-orange-500/40">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Ben<span className="text-orange-400">Hub</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-150 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/12 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              aria-label="Switch language"
            >
              <Globe className="w-3.5 h-3.5" />
              {t("lang_label")}
            </button>
            <Link
              href="/doi-tac"
              className="hidden md:inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 cursor-pointer shadow-sm shadow-orange-500/30"
            >
              {t("cta")}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="md:hidden w-9 h-9 rounded-lg bg-white/10 hover:bg-white/15 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10"
              aria-label={open ? t("aria_close") : t("aria_open")}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile backdrop */}
      <button
        type="button"
        aria-label={t("aria_close")}
        onClick={closeMenu}
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      {/* Mobile drawer — fixed so it is never clipped by page overflow */}
      <nav
        id="mobile-nav-drawer"
        aria-hidden={!open}
        className={cn(
          "md:hidden fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto bg-slate-900 border-t border-white/5 px-4 py-4 space-y-0.5 shadow-xl transition-all duration-300",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 pointer-events-none invisible",
        )}
      >
        {navLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
          >
            {item.label}
          </a>
        ))}
        <div className="pt-3 border-t border-white/5 mt-3 space-y-2">
          <button
            type="button"
            onClick={() => {
              toggleLocale();
              closeMenu();
            }}
            className="w-full flex items-center justify-center gap-2 border border-white/10 bg-white/5 text-slate-300 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            {t("lang_label")}
          </button>
          <Link
            href="/doi-tac"
            onClick={closeMenu}
            className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            {t("cta")}
          </Link>
        </div>
      </nav>
    </>
  );
}
