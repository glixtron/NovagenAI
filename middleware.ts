import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware protects only specific routes, not the home page
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect only these routes
  const protectedRoutes = ['/slides', '/catalogue', '/dashboard']  
  // Allow public routes and static assets
  const publicRoutes = ['/', '/auth/signin', '/auth/signout', '/api/auth']
  
  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname === route)
  
  // If accessing protected route without authentication, redirect to sign-in
  if (isProtectedRoute && !isPublicRoute) {
    const signInUrl = new URL('/auth/signin', request.url)
    return NextResponse.redirect(signInUrl)
  }
  
  // Allow access to public routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
