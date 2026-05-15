import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PROTECTED = ["/cms"];
const SKIP_INTL = ["/api/", "/cms", "/login", "/register", "/_next"];

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const path = nextUrl.pathname;

  // Protect CMS/posts routes
  if (PROTECTED.some((p) => path.startsWith(p)) && !session) {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  // Skip i18n for API, auth, static routes
  if (SKIP_INTL.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  return intlMiddleware(req as Parameters<typeof intlMiddleware>[0]);
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
