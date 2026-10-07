import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Public marketing routes; default locale (vi) has no prefix, en is /en/...
const ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/benhub-mine", changeFrequency: "monthly", priority: 0.9 },
  { path: "/doi-tac", changeFrequency: "monthly", priority: 0.8 },
  { path: "/dang-ky-tai-xe", changeFrequency: "monthly", priority: 0.8 },
  { path: "/tin-tuc", changeFrequency: "daily", priority: 0.7 },
  { path: "/ve-chung-toi", changeFrequency: "yearly", priority: 0.6 },
  { path: "/trung-tam-tro-giup", changeFrequency: "monthly", priority: 0.5 },
  {
    path: "/chinh-sach-bao-mat-thong-tin",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        vi: `${SITE_URL}${path}`,
        en: `${SITE_URL}/en${path}`,
      },
    },
  }));
}
