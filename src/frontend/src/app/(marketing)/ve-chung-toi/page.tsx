import type { Metadata } from "next";
import { HeroSection } from "@/components/pages/about/HeroSection";
import { StorySection } from "@/components/pages/about/StorySection";
import { MissionVisionSection } from "@/components/pages/about/MissionVisionSection";
import { CoreValuesSection } from "@/components/pages/about/CoreValuesSection";
import { EcosystemSection } from "@/components/pages/about/EcosystemSection";
import { MilestonesSection } from "@/components/pages/about/MilestonesSection";
import { LeadershipSection } from "@/components/pages/about/LeadershipSection";
import { PresenceSection } from "@/components/pages/about/PresenceSection";
import { JoinUsSection } from "@/components/pages/about/JoinUsSection";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | BenHub — Nền Tảng Logistics Công Trình",
  description:
    "BenHub là nền tảng logistics công trình hàng đầu Việt Nam. Câu chuyện, sứ mệnh, giá trị cốt lõi và đội ngũ đứng sau hệ điều hành số cho ngành vận tải công trình.",
  openGraph: {
    title: "Về BenHub — Hệ Điều Hành Số Cho Vận Tải Công Trình",
    description: "Từ bất cập thực tế đến nền tảng quốc gia — câu chuyện hình thành BenHub Việt Nam.",
    url: "https://benhub.vn/ve-chung-toi",
    images: [{ url: "/og-about.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <MissionVisionSection />
      <CoreValuesSection />
      <EcosystemSection />
      <MilestonesSection />
      <LeadershipSection />
      <PresenceSection />
      <JoinUsSection />
    </>
  );
}
