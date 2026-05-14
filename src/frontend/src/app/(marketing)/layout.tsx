import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s — ${APP_NAME}`,
  },
  description: "Next.js 14 base template với Landing Page và CMS nội bộ production-ready.",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Hero manages its own pt-16 to clear the fixed navbar */}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
