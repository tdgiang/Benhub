import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PrivacyPolicyPage from "@/app/(marketing)/chinh-sach-bao-mat-thong-tin/page";

export const metadata: Metadata = {
  title: "Chính sách bảo mật thông tin | Benhub",
  description:
    "Tìm hiểu cách Benhub thu thập, sử dụng và bảo vệ thông tin cá nhân của khách hàng, đối tác tài xế và người dùng website.",
  robots: "index, follow",
};

export default async function LocalePrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyPolicyPage />;
}
