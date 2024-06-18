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

  // GoogleAuth in backend sends cookie in the format:
  // { name: 'user', value: 'j:{"id":"4105818e-a203-4e35-ae7f-8881a4caf804","email":"someEmail","role":"STUDENT","studentId":"de42afd4-36b7-42d5-8ddf-1ea174d00c9f"}' }
  // Removing the 'j:' prefix from the value
  let parsedUserCookie;
  if (userCookie && userCookie.value.startsWith("j:")) {
    parsedUserCookie = userCookie.value.substring(2);
  } else if (userCookie) {
    parsedUserCookie = userCookie.value;
  }

  let user;
  try {
    user = parsedUserCookie ? JSON.parse(parsedUserCookie) : null;
  } catch (e) {
    console.error("Error parsing JSON:", e);
  }

  const response = NextResponse.next();

  if (userCookie && userCookie.value.startsWith("j:")) {
    response.cookies.set({
      name: "user",
      value: parsedUserCookie,
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: "/",
    });
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
    recruiterRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}
