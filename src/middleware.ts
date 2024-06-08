import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin/company", "/admin/students", "/admin/job"];
// const adminRoutes = ['/admin/companies', '/admin/JAF', '/admin/jobs', '/admin/students'];
// const studentRoutes = ['/student/jobs', '/student/offCampus', '/student/onCampus', '/student/interviewExperiences', '/student/profile', '/student/resumes'];
// const recruiterRoutes = ['/recruiter/jaf', '/recruiter/prevjaf'];

export function middleware(request: NextRequest) {
  // const isStudent = request.cookies.get("isStudent");
  const isStudent = true;
  // const isAdmin = request.cookies.get('isAdmin');
  const isAdmin = false;
  // const isRecruiter = request.cookies.get("isRecruiter");
  const isRecruiter = false;

  if (isAdmin && (request.url.includes('/recruiter') || request.url.includes('/student'))) {
    return NextResponse.redirect("http://localhost:3000/login/");
  }
  else if (isStudent && (request.url.includes('/recruiter') || request.url.includes('/admin'))) {
    return NextResponse.redirect("http://localhost:3000/login/");
  }
  else if (isRecruiter && (request.url.includes('/student') || request.url.includes('/admin'))) {
    return NextResponse.redirect("http://localhost:3000/login/");
  }

  return NextResponse.next();
}
