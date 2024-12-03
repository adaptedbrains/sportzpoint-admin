import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token'); // Retrieve token from cookies
  const pathname = request.nextUrl.pathname; // Get the current path
  if (pathname === '/login'||pathname.startsWith('/reset-password/') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Match all routes
};
