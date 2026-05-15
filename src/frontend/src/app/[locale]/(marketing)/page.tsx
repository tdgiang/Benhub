import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { ProductsSection } from "@/components/marketing/ProductsSection";
import { MarketSection } from "@/components/marketing/MarketSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { EcosystemSection } from "@/components/marketing/EcosystemSection";
import { RoadmapSection } from "@/components/marketing/RoadmapSection";
import { NewsSection } from "@/components/marketing/NewsSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale !== "en";
  return {
    title: isVi
      ? "BenHub — Hệ Điều Hành Số Cho Vận Tải Công Trình Việt Nam"
      : "BenHub — Digital Operating System for Vietnam Construction Logistics",
    description: isVi
      ? "BenHub số hóa toàn bộ chuỗi logistics xây dựng: điều phối xe ben, quản lý đội xe, E-Ticket, GPS tracking và đối soát tài chính realtime."
      : "BenHub digitalizes the entire construction logistics chain: vehicle dispatch, fleet management, E-Ticket, GPS tracking and real-time financial reconciliation.",
    openGraph: {
      url: "https://benhub.vn",
      siteName: "BenHub",
      locale: isVi ? "vi_VN" : "en_US",
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <MarketSection />
      <ProductsSection />
      <HowItWorksSection />
      <RoadmapSection />
      <EcosystemSection />
      <NewsSection />
    </>
  );
}
