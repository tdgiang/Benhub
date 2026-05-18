import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

// Force dynamic rendering for all non-locale routes — prevents SSG prerender
// errors caused by next-intl needing locale context (set by middleware at runtime)
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s — ${APP_NAME}`,
  },
  description: "Nền tảng logistics công trình #1 Việt Nam.",
};

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default locale (vi) routes have no prefix — must still provide i18n context
  // to client components (Navbar uses useTranslations, useRouter from next-intl)
  setRequestLocale(routing.defaultLocale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={routing.defaultLocale} messages={messages}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
