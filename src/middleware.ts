import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isAdminPath = path === '/admin-dashboard' 
//   const isRestrictedPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  const token = request.cookies.get('token')?.value || ''
  const adminToken = request.cookies.get('adminToken')?.value || ''

  if(isAdminPath && !adminToken) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl))
//   }
    
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/admin-dashboard'
  ]
}

