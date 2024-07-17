import db from "./db";

async function checkUserName(username: string) {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
}

export default checkUserName;
