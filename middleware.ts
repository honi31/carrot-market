import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

//인증되지 않은 user도 접근가능한 페이지들
const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname]; //사용자가 가려는 url 탐색
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    //user는 로그아웃 상태
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/prodict", request.url));
    }
  } //user는 로그인 상태
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], //패턴을 사용할수도 user로 시작하는 모든 경로
}; //반드시 실행되어야하는 경로
