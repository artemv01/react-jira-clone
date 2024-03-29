import { NextResponse, NextRequest } from 'next/server';

// eslint-disable-next-line func-style
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname == '/') {
    return NextResponse.redirect(new URL('/project/board', req.url));
  }

  return NextResponse.next();
}
