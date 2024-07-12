import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (request.nextUrl.pathname === "/" && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname === "/" && user?.role === "STUDENT") {
    return NextResponse.redirect(new URL("/student/profile", request.url));
  }
  if (request.nextUrl.pathname === "/" && user?.role === "ADMIN") {
    return NextResponse.redirect(new URL("admin/profile", request.url));
  }
  if (request.nextUrl.pathname === "/" && user?.role === "RECRUITER") {
    return NextResponse.redirect(new URL("/recruiter/profile", request.url));
  }
  if (request.nextUrl.pathname === "/" && user?.role === "FACULTY") {
    return NextResponse.redirect(new URL("/faculty", request.url));
  }

  if (user?.role !== "ADMIN" && request.nextUrl.pathname.startsWith("/admin")) {

    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    user?.role !== "STUDENT" &&
    request.nextUrl.pathname.startsWith("/student")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (user?.role !== "RECRUITER" && request.url.includes("/recruiter")) {

    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (user?.role !== "FACULTY" && request.url.includes("/faculty")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
