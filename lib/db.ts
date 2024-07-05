import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test() {
  const token = await db.sMSToken.create({
    data: {
      user: {
        connect: {
          id: 1,
        },
      },
      token: "121212",
    },
  });
  console.log(token);
}
test();
export default db;
