
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user')?.value;
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/signup'];
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  if (!user) {
    console.log(`user is unauthenticated and path is ${path}`)
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const userData = JSON.parse(user);

    // Admin routes protection
    console.log(`user data : ${JSON.stringify(userData)}`)
    if (path.startsWith('/admin') && userData.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Instructor routes protection
    if (path.startsWith('/instructor') && userData.role !== 'instructor') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Student routes protection
    if (path.startsWith('/student') && userData.role !== 'student') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If there's an error parsing the user data, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Configure the paths that should be handled by the middleware
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};