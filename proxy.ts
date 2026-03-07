// proxyS.ts
import { NextResponse, type NextRequest } from "next/server";
import { getServerSession } from "./lib/get-session";

export default async function proxy(request: NextRequest) {
   
    // 1. Check if the user is logged in
  const session = await getServerSession();

  // Get the current pathname
  const { pathname } = request.nextUrl;

  // 2. Check if the user is trying to access protected routes
  const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

  if (isProtected && !session) {
    // 3. Redirect to sign-in if no session exists
    return NextResponse.redirect(new URL("/sign-in?error=unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};