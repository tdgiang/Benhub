import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/pages/help-center/HeroSection";
import { FaqSection } from "@/components/pages/help-center/FaqSection";
import { ContactSection } from "@/components/pages/help-center/ContactSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HelpCenter" });
  return {
    title: t("meta_title"),
    description: t("meta_desc"),
  };
}

export default async function HelpCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
