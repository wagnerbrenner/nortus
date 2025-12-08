import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const publicRoutes = ["/login"];
  const isPublicRoute = publicRoutes.includes(pathname);

  const protectedRoutes = ["/dashboard", "/tickets", "/chat", "/simulator"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoute && token && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/tickets/:path*",
    "/chat/:path*",
    "/simulador/:path*",
    "/login",
  ],
};
