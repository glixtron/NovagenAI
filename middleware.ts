import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This middleware protects only specific routes, not the home page
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 1. Get the token (session)
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // 2. Define protected routes
  const protectedRoutes = ['/slides', '/catalogue', '/dashboard']
  
  // 3. Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // 4. Logic: Only redirect if accessing protected route WITHOUT a valid token
  if (isProtectedRoute && !token) {
    const signInUrl = new URL('/auth/signin', request.url)
    return NextResponse.redirect(signInUrl)
  }
  
  // 5. Allow access to all other routes (including home page)
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
