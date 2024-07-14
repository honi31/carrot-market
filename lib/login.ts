import getSession from "./session";

async function sessionLogin(userId: number) {
  const session = await getSession();
  session.id = userId;
  await session.save();
}

export default sessionLogin;
