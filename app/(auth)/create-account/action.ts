"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import getSession from "@/lib/session";

function checkUsername(username: string) {
  return !username.includes("potato");
}

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "이름은 문자로 입력해주세요",
        required_error: "이름을 입력해주세요",
      })
      .refine(checkUsername, "custom error"),

    email: z.string().email(),

    password: z
      .string({ required_error: "비밀번호를 입력하세요" })
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  }); // 우리가 검사하지않고 조건 설명만

export async function createAccount(prevState: any, formData: FormData) {
  console.log(cookies());
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
    //flatten 에러가 줄어들고 쉽게 ui에 사용할수있게 해준다.
  } else {
    //hash password

    const hashedPassword = await bcrypt.hash(result.data.password, 12); //해싱 알고리즘을 얼마나 돌릴지 숫자 12
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    }); //새로 생성된 user database
    //login
    const session = await getSession();
    session.id = user.id;
    await session.save();

    // cookie.id = user.id; // 이 쿠키에 프리즈마 디비에서 가져온 반환값 id를 넣는다
    // await cookie.save(); //그리고 쿠키를 저장한다 내용을 암호화할때도 같은 비밀번호 사용

    redirect("/profile");
  }
}
