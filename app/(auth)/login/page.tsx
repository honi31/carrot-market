"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { login } from "./action";
import { useFormState } from "react-dom";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  const [state, action] = useFormState(login, null);
  //useFormStatus reactjs 제공 훅 객체 반환, action 어떤 액션, data 전송된 데이터, method, pending pending상태인지 아닌지 함수가 끝난여부를 알려줌 이 훅은 form의 자식에서만 사용가능 form 액션이 발생하는 곳에서 같이 사용못한다 따라서 form 상태에 따라 변경하고자 하는 component 내부에서만 사용가능
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          type="password"
          name="password"
          minLength={PASSWORD_MIN_LENGTH}
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        />
        <Button text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
