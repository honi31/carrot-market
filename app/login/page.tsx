"use client";

import FormInput from "@/components/form-input";
import FormButton from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import { handleForm } from "./action";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, action] = useFormState(handleForm, null);
  //useFormStatus reactjs 제공 훅 객체 반환, action 어떤 액션, data 전송된 데이터, method, pending pending상태인지 아닌지 함수가 끝난여부를 알려줌 이 훅은 form의 자식에서만 사용가능 form 액션이 발생하는 곳에서 같이 사용못한다 따라서 form 상태에 따라 변경하고자 하는 component 내부에서만 사용가능
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
        />
        <FormButton text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
