import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/ve-chung-toi",
        permanent: true,
      },
      {
        source: "/:locale/about",
        destination: "/:locale/ve-chung-toi",
        permanent: true,
        locale: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
