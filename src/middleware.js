import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const secret = process.env.NEXTAUTH_SECRET;

  // Retrieve token for the request
  const token = await getToken({
    req,
    secret,
    cookieName: "next-auth.session-token",
    raw: true,
  });

  // Extract the pathname from the request URL
  const { pathname } = req.nextUrl;

  // Check if the user is trying to access the login page
  if (pathname === "/login") {
    // If the user is already logged in and tries to access /login, redirect to /transactions
    if (token) {
      return NextResponse.redirect(new URL("/transactions", req.url));
    }
    // Allow access to the login page if the user is not logged in
    return NextResponse.next();
  }

  // For all other routes, check if the token exists (i.e., user is authenticated)
  if (!token) {
    console.log("No token found. User is unauthenticated.");
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is authenticated, allow access to the protected routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/transactions/:path*"], // Apply middleware to these routes
};
