import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as moment from "moment-timezone";
import { jwtDecode } from "jwt-decode";

export async function middleware(request: NextRequest) {
  try {
    const adminToken: any = request.cookies.get("adminToken") || null;

    let isAuthTokenValid = false;
    let decodedAuthToken: any = null;

    // Validate adminToken
    if (adminToken && adminToken?.value) {
      decodedAuthToken = jwtDecode(adminToken?.value);
      if (decodedAuthToken && decodedAuthToken?.exp) {
        // Check if the token is not expired
        isAuthTokenValid = moment.utc().valueOf() < decodedAuthToken.exp * 1000;
      }
    }

    const isLoginPage = request.nextUrl.pathname === "/login";
    const isRootPage = request.nextUrl.pathname === "/"; // Check if the root path is being accessed

    // Always redirect from root path to dashboard if user is logged in
    if (isRootPage) {
      if (isAuthTokenValid) {
        return NextResponse.redirect(new URL("/masters/orders", request.url));
      } else {
        return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if not authenticated
      }
    }

    // Prevent logged-in users from accessing the login page
    if (isLoginPage && isAuthTokenValid) {
      return NextResponse.redirect(new URL("/masters/orders", request.url));
    }

    // Redirect to login page if the user is not logged in and trying to access a protected route
    if (!isAuthTokenValid && !isLoginPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

  } catch (error) {
    // Handle errors, e.g., token decoding failure
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  // Define the routes to apply this middleware to
  matcher: [
    "/",
    "/masters/:path*",
    "/login", // Include login page in matcher
  ],
};
