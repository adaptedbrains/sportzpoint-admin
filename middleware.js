// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token'); // Retrieve token from cookie

  // If token is not found, redirect to /login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If token exists, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/profile','/'], // Specify the routes where this middleware should run
};
