import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

interface SessionContent {
  id?: number; // 쿠키에 id가 없을수도 있어서. 로그아웃한 사용자인 경우
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "delicious-carrot",
    password: process.env.COOKIE_PASSWORD!, //쿠키를 암호화 하기 위해 필요
  }); //iron-session은 딜리셔스 케럿이라는 쿠키가 있으면 그 내용을 비밀번호를 활용해서 복호화하고 없으면 생성함
}
