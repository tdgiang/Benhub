"use client";

import { useEffect } from "react";

/**
 * The root layout renders <html lang="vi"> for every route (it has no locale
 * param). Sync the attribute with the active locale after hydration so
 * /en pages expose lang="en" to assistive tech and crawlers that run JS.
 */
export function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
