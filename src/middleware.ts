import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



const adminRoutes = ["/admin/company", "/admin/students", "/admin/job"];
const studentRoutes = [
  "/student/jobs",
  "/student/offCampus",
  "/student/onCampus",
  "/student/interviewExperiences",
  "/student/profile",
  "/student/resumes",
];
const recruiterRoutes = ["/recruiter/jaf", "/recruiter/prevjaf"];

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (request.nextUrl.pathname === "/" && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname === "/viewprofile" && user?.role === "STUDENT") {
    return NextResponse.redirect(new URL("/student/profile", request.url));
  }
  if (request.nextUrl.pathname === "/viewprofile" && user?.role === "ADMIN") {
    return NextResponse.redirect(new URL("admin/companies", request.url));
  }
  if (request.nextUrl.pathname === "/viewprofile" && user?.role === "RECRUITER") {
    return NextResponse.redirect(new URL("/recruiter/jaf", request.url));
  }

  if (
    user?.role !== "ADMIN" &&
    adminRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    user?.role !== "STUDENT" &&
    studentRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    user?.role !== "RECRUITER" &&
    recruiterRoutes.includes(request.nextUrl.pathname) &&
    request.url.includes("/recruiter")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }



  return NextResponse.next();
}
