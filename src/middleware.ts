import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const adminRoutes = [
  "/admin/company",
  "/admin/students",
  "/admin/job",
  /^\/admin\/jobs\/events\/[a-zA-Z0-9\-]+$/,
];

const studentRoutes = [
  "/student/jobs",
  "/student/offCampus",
  "/student/onCampus",
  "/student/interviewExperiences",
  "/student/profile",
  "/student/resumes",
  /^\/student\/job\/[a-zA-Z0-9\-]+$/,
  /^\/student\/job\/salary\/[a-zA-Z0-9\-]+$/,
];

const recruiterRoutes = [
  "/recruiter",
  "/recruiter/jobs",
  "/recruiter/events",
  "/recruiter/profile",
  "/JAF",
  /^\/recruiter\/jobs\/[a-zA-Z0-9\-]+$/,
  /^\/recruiter\/events\/[a-zA-Z0-9\-]+$/,
];

const facultyRoutes = ["/faculty", "/faculty/profile"];

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
    const newUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${process.env.NEXT_PUBLIC_BASE_PATH}${path}`
    console.log(newUrl);

    return NextResponse.redirect(new URL(newUrl));
  };

  if (request.nextUrl.pathname === "/devlogin" && prod === "TRUE") {
    return redirectTo("/login");
  }
  if (request.nextUrl.pathname === "/" && !user) {
    return redirectTo("/login");
  }
  if (request.nextUrl.pathname === "/" && user?.role === "STUDENT") {
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
    user?.role !== "ADMIN" &&
    adminRoutes.some((route) =>
      typeof route === "string"
        ? request.nextUrl.pathname === route
        : route.test(request.nextUrl.pathname),
    )
  ) {
    return redirectTo("/login");
  }
  if (
    user?.role !== "STUDENT" &&
    studentRoutes.some((route) =>
      typeof route === "string"
        ? request.nextUrl.pathname === route
        : route.test(request.nextUrl.pathname),
    )
  ) {
    return redirectTo("/login");
  }
  if (
    user?.role !== "RECRUITER" &&
    recruiterRoutes.some((route) =>
      typeof route === "string"
        ? request.nextUrl.pathname === route
        : route.test(request.nextUrl.pathname),
    )
  ) {
    return redirectTo("/login");
  }
  if (
    user?.role !== "FACULTY" &&
    facultyRoutes.includes(request.nextUrl.pathname) &&
    request.url.includes("/faculty")
  ) {
    return redirectTo("/login");
  }

  return NextResponse.next();
}
