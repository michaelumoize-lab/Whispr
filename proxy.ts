// proxy.ts
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  // 1. Get the session cookie directly
  // Better Auth stores the session token in a cookie (usually 'better-auth.session_token')
  const sessionToken = 
    request.cookies.get("better-auth.session_token") || 
    request.cookies.get("__Secure-better-auth.session_token");

  const { pathname } = request.nextUrl;

  // 2. Define protected routes
  const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

  // 3. Guard logic
  if (isProtected && !sessionToken) {
    return NextResponse.redirect(new URL("/sign-in?error=unauthorized", request.url));
  }

  return NextResponse.next();
}

// 4. Configuration
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};