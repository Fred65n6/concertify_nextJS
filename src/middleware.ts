import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

interface Token {
  id: string;
  isAdmin: boolean;
  isArtist: boolean;
  isVerified: boolean;
  // Add other fields in your Token interface as needed
}

export async function verify(token: string): Promise<Token | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET!));

    // Type check and assign properties from payload to Token
    const adaptedToken: Token = {
      id: typeof payload.sub === 'string' ? payload.sub : '',
      isAdmin: payload.isAdmin === true,
      isArtist: payload.isArtist === true, 
      isVerified: payload.isVerified === true,
    };

    return adaptedToken;
  } catch (error:any) {
    console.error('Error verifying token:', error.message);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminPath =
    path === '/admin-dashboard' ||
    path === '/admin-artist' ||
    path === '/admin-concerts' ||
    path === '/admin-upload-artist' ||
    path === '/admin-uploadconcert' ||
    path === '/admin-upload-venue' ||
    path === '/admin-venues' ||
    path === '/api/admin/deleteArtist';

  const isRestrictedPath =
    path === '/favourites' || path === '/profile' || path === '/profile/${data}';

  const isArtistPath = path === '/user-upload-concert';

  const token = request.cookies.get('token')?.value || '';

  // Initialize decodedToken to null
  let decodedToken: Token | null = null;

  if (token) {
    // Verify the token using the provided verify function
    decodedToken = await verify(token);
  }

  if (isAdminPath && (!decodedToken || !decodedToken.isAdmin)) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (isArtistPath && (!decodedToken || !decodedToken.isArtist || !decodedToken.isAdmin)) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (isRestrictedPath && (!decodedToken || !decodedToken.isVerified)) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail',
    '/admin-dashboard',
    '/favourites',
    '/admin-concerts',
    '/admin-venues',
    '/admin-artists',
    '/admin-upload-artist',
    '/admin-upload-venue',
    '/admin-upload-concert',
    '/profile/${data}',
    '/user-upload-concert',
    '/api/admin/deleteArtist',
  ],
};

