import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession(); //세션 가져오기
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    }); //user의 id 와 세션안의 id를 확인하고 일치하는 User를 찾는다.
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logout = async () => {
    "use server"; //인라인 서버 액션, 클라이언트 컴포넌트로 만들지 않기 위해서 onclick사용하지않고
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <form action={logout}>
        <button>Log out</button>
      </form>
    </div>
  );
}
