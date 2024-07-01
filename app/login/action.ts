"use server";

import { redirect } from "next/navigation";

//이 함수가 서버에서만 실행되도록

export async function handleForm(prevState: any, formData: FormData) {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 5000)); // 강제 로딩상태
  console.log("logged in!");
  // redirect("/");
  return {
    errors: ["wrong password", "password is too short"],
  };
}
