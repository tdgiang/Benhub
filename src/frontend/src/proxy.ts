import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PROTECTED = ["/cms"];
const SKIP_INTL = ["/api/", "/cms", "/login", "/register", "/_next"];

function hasSession(req: NextRequest): boolean {
  return !!(
    req.cookies.get("__Secure-authjs.session-token") ??
    req.cookies.get("authjs.session-token")
  );
}

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (PROTECTED.some((p) => path.startsWith(p)) && !hasSession(req)) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  if (SKIP_INTL.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
