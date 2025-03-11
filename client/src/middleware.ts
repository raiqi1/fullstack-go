import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware berjalan untuk:", req.nextUrl.pathname);

  const token = req.cookies.get("auth_token")?.value;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (!token && !isLoginPage) {
    console.log("🔄 Redirect ke /login karena token tidak ada");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Terapkan middleware ke semua halaman kecuali /login dan register dan /api/*
export const config = {
  matcher: ["/((?!login|register|api|_next/static|_next/image|favicon.ico).*)"],
};
