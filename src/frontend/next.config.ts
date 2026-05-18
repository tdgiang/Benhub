import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  // Prevent Next.js from tracing up to a parent lockfile and nesting standalone output.
  outputFileTracingRoot: path.join(process.cwd()),
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
