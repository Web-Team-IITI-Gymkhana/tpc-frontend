import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const adminRoutes = "/admin";
const dashBoardRoutes = "/admin/dashboard";

const studentRoutes = "/student";

const recruiterRoutes = "/recruiter";
const recruiterAuthRoutes = ["/recruiter/signin", "/recruiter/signup"];

const facultyRoutes = "/faculty";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  let user = null;
  const prod = process.env.NEXT_PUBLIC_PROD;

  if (accessToken) {
    try {
      const decoded: any = jwtDecode(accessToken.value);
      user = decoded ? { role: decoded.role } : null;
    } catch (error) {
      console.error("JWT decoding error:", error);
    }
  }

  const redirectTo = (path: string) => {
    const newUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${process.env.NEXT_PUBLIC_BASE_PATH}${path}`;
    console.log(process.env.NEXT_PUBLIC_FRONTEND_URL);
    console.log(newUrl);

    return NextResponse.redirect(new URL(newUrl));
  };

  if (request.nextUrl.pathname === "/devlogin" && prod === "TRUE") {
    return redirectTo("/login");
  }
  if (request.nextUrl.pathname === "/" && !user) {
    return redirectTo("/login");
  }
  if (request.nextUrl.pathname === "/" && (user?.role === "STUDENT" || user?.role === "TPC_MEMBER")) {
    return redirectTo("/student/profile");
  }
  if (request.nextUrl.pathname === "/" && user?.role === "ADMIN") {
    return redirectTo("/admin/profile");
  }
  if (request.nextUrl.pathname === "/" && user?.role === "RECRUITER") {
    return redirectTo("/recruiter/profile");
  }
  if (request.nextUrl.pathname === "/" && user?.role === "FACULTY") {
    return redirectTo("/faculty");
  }
  if (
    (user?.role !== "ADMIN" && user?.role !== "TPC_MEMBER") &&
      request.nextUrl.pathname.startsWith(adminRoutes)
  ) {
    return redirectTo("/login");
  }
  if (
    user?.role !== "ADMIN" &&
      request.nextUrl.pathname.startsWith(dashBoardRoutes)
  ) {
    return redirectTo("/login");
  }
  if (
    (user?.role !== "STUDENT" && user?.role !== "TPC_MEMBER") &&
    request.nextUrl.pathname.startsWith(studentRoutes)
  ) {
    return redirectTo("/login");
  }
  if (
    user?.role !== "RECRUITER" &&
    request.nextUrl.pathname.startsWith(recruiterRoutes)
    && !recruiterAuthRoutes.includes(request.nextUrl.pathname)
  ) {
    return redirectTo("/recruiter/signin");
  }
  if (
    user?.role !== "FACULTY" &&
    request.nextUrl.pathname.startsWith(facultyRoutes)
  ) {
    return redirectTo("/login");
  }

  return NextResponse.next();
}
