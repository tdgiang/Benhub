import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { SolutionSection } from "@/components/marketing/SolutionSection";
import { ProductsSection } from "@/components/marketing/ProductsSection";
import { MarketSection } from "@/components/marketing/MarketSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { EcosystemSection } from "@/components/marketing/EcosystemSection";
import { RoadmapSection } from "@/components/marketing/RoadmapSection";

export const metadata: Metadata = {
  title: "BenHub — Hệ Điều Hành Số Cho Vận Tải Công Trình Việt Nam",
  description:
    "BenHub số hóa toàn bộ chuỗi logistics xây dựng: điều phối xe ben, quản lý đội xe, E-Ticket, GPS tracking và đối soát tài chính realtime.",
  keywords:
    "BenHub, vận tải công trình, logistics xây dựng, quản lý xe ben, E-ticket vận tải, điều phối xe ben",
  openGraph: {
    title: "BenHub — Hệ Điều Hành Số Cho Vận Tải Công Trình",
    description:
      "Số hóa toàn bộ logistics xây dựng — từ xe ben đến đối soát tài chính.",
    url: "https://benhub.vn",
    siteName: "BenHub",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BenHub — Construction Logistics OS",
    description: "Số hóa ngành vận tải công trình Việt Nam",
  },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <>
      {/* S1 */}
      <HeroSection />
      {/* S2 */}
      <ProblemSection />
      {/* S3 */}
      <SolutionSection />
      {/* S4 */}
      <MarketSection />
      {/* S5 */}
      <ProductsSection />
      {/* S6 */}

      <HowItWorksSection />

      {/* S8 */}
      <RoadmapSection />

      <EcosystemSection />
      {/* S9 */}
      {/* <RegisterSection /> */}
    </>
  );
}
