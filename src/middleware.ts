import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token;

    if (!token) {
      if (pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.next();
    }

    const userRoles = (token.roles as string[]) || [];

    if (token && pathname === "/login") {
      if (userRoles.includes("admin")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else if (userRoles.includes("user")) {
        return NextResponse.redirect(new URL("/products", req.url));
      } else {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    if (pathname.startsWith("/dashboard")) {
      if (!userRoles.includes("admin")) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    if (pathname.startsWith("/products")) {
      if (!(userRoles.includes("admin") || userRoles.includes("user"))) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next|_static|favicon.ico).*)"],
};
