import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const session: Number = 0;
  if (session === 1 && !req.url.includes("/login")) {
    return NextResponse.redirect(new URL("http://localhost:3000/login"));
  } else {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-url", req.url);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }
};

export default middleware;
