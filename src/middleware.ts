import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionId = req.cookies.get("sessionId");
  console.log("middleware called", sessionId);
  if (!sessionId && req.nextUrl.pathname.startsWith("/dev")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dev/:path*"],
};