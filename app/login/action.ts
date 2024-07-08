"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
//이 함수가 서버에서만 실행되도록
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: { id: true },
  }); //일종의 유효성 검사 -> refine
  return Boolean(user);
};
const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "이 이메일을 가진 사용자는 존재하지 않습니다."),
  password: z.string({ required_error: "비밀번호를 입력하세요" }),
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(PASSWORD_REGEX),
});
export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // 비밀번호가 맞는지 확인( 사용자가 찾아졌을때만) 비밀번호 해시값을 얻는다
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? ""); //d이게 실행될때는 무조건 user가 존재한다. 따라서 느낌표를 붙인다. 비밀번호가 필수는 아니었어서 없으면 ""이거랑 비교
    console.log(ok);
    //로그인
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile"); //redirect profile
    } else {
      return {
        fieldErrors: {
          email: [],
          password: ["잘못된 비밀번호 입니다."],
        },
      };
    }
  }
}
