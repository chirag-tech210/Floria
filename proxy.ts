import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserFromRequest } from './lib/auth';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = getUserFromRequest(request);

  const publicRoutes = ['/login', '/signup', '/'];
  const isPublicRoute = publicRoutes.includes(pathname) || 
                        (pathname.startsWith('/products/') && !pathname.includes('/admin')) ||
                        pathname === '/products';

  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard/admin');
  
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/cart') || 
                          pathname.startsWith('/checkout');

  if (isProtectedRoute && !user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === '/login' || pathname === '/signup') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (isAdminRoute && (!user || user.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
