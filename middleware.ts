import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromRequest } from './lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = getUserFromRequest(request);

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/signup', '/'];
  const isPublicRoute = publicRoutes.includes(pathname) || 
                        (pathname.startsWith('/products/') && !pathname.includes('/admin')) ||
                        pathname === '/products';

  // Admin routes
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard/admin');
  
  // Protected routes (require authentication)
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/cart') || 
                          pathname.startsWith('/checkout');

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing login/signup while authenticated
  if ((pathname === '/login' || pathname === '/signup') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to dashboard if accessing admin route without admin role
  if (isAdminRoute && (!user || user.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
