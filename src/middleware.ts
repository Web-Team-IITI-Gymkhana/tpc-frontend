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

  if (accessToken) {
    try {
      const decoded: any = jwtDecode(accessToken.value);
      user = decoded ? { role: decoded.role } : null;
    } catch (error) {
      console.error("JWT decoding error:", error);
    }
  }

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

  if (
    user?.role !== "ADMIN" &&
    adminRoutes.some((route) =>
      typeof route === "string"
        ? request.nextUrl.pathname === route
        : route.test(request.nextUrl.pathname),
    )
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    user?.role !== "STUDENT" &&
    studentRoutes.some((route) =>
      typeof route === "string"
        ? request.nextUrl.pathname === route
        : route.test(request.nextUrl.pathname),
    )
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    user?.role !== "RECRUITER" &&
    recruiterRoutes.some((route) =>
      typeof route === "string"
        ? request.nextUrl.pathname === route
        : route.test(request.nextUrl.pathname),
    )
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    user?.role !== "FACULTY" &&
    facultyRoutes.includes(request.nextUrl.pathname) &&
    request.url.includes("/faculty")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
