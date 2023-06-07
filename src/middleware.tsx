import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token");
  console.log(req.url);
  console.log(req.nextUrl);

  if (token === undefined) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    console.log(url);
    return NextResponse.redirect(url);
  } else {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.url);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }
};

export const config = {
  matcher: ["/seasons", "/members", "/companies"],
};

export default middleware;
