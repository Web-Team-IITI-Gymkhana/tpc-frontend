import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin/company", "/admin/students", "/admin/job"];

export function middleware(request: NextRequest) {
    const verify = request.cookies.get("accessToken");
    if (!verify && (protectedRoutes.includes(request.nextUrl.pathname) || request.url.includes("/admin"))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}
