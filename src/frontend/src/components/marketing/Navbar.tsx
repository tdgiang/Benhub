"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Truck, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Giải pháp", href: "/#solution" },
  { label: "Sản phẩm", href: "/#products" },
  { label: "Hệ sinh thái", href: "/#ecosystem" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Tài xế", href: "/dang-ky-tai-xe" },
  { label: "Đối tác", href: "/doi-tac" },
];

export function Navbar({ className }: { className?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <header
      id="main-navbar"
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
        <div className="flex items-center gap-3">
          <a
            href="/doi-tac"
            className="hidden md:inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 cursor-pointer shadow-sm shadow-orange-500/30"
          >
            Đăng ký đối tác →
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden w-9 h-9 rounded-lg bg-white/10 hover:bg-white/15 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/10"
            aria-label={open ? "Đóng menu" : "Mở menu"}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-white/5 px-4 py-4 space-y-0.5">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/5 mt-3">
            <a
              href="/doi-tac"
              onClick={() => setOpen(false)}
              className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
            >
              Đăng ký đối tác →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
