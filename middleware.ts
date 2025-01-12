import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Cookieから認証トークンを取得
  const token = req.cookies.get("authToken")?.value;

  // トークンがない場合はログインページへリダイレクト
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // トークンを検証 (Firebase Admin SDK を使用)
    await verifyIdToken(token); // 実装方法は後述
    return NextResponse.next(); // トークンが有効なら次の処理へ
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/protected-page/:path*"], // 保護するルートを指定
};
