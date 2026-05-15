import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/pages/about/HeroSection";
import { StorySection } from "@/components/pages/about/StorySection";
import { MissionVisionSection } from "@/components/pages/about/MissionVisionSection";
import { CoreValuesSection } from "@/components/pages/about/CoreValuesSection";
import { EcosystemSection } from "@/components/pages/about/EcosystemSection";
import { MilestonesSection } from "@/components/pages/about/MilestonesSection";
import { LeadershipSection } from "@/components/pages/about/LeadershipSection";
import { PresenceSection } from "@/components/pages/about/PresenceSection";
import { JoinUsSection } from "@/components/pages/about/JoinUsSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutUs" });
  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
      url: "https://benhub.vn/ve-chung-toi",
      siteName: "BenHub",
      locale: locale === "en" ? "en_US" : "vi_VN",
      type: "website",
      images: [{ url: "/og-about.png", width: 1200, height: 630 }],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
