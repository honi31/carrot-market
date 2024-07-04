import { InputHTMLAttributes } from "react";

interface InputProps {
  errors?: string[];
  name: string;
}
export default function Input({
  errors = [],
  name,
  ...rest //변수 하나에 모든 prop를 한꺼번에 받아 적을거다
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  // input이 받을 수 있는 모든 attribute 또한 받을 수 있다.
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name} //외부에서 커스텀할수있는부분
        className="bg-transparent rounded-md w-full h-10 focus:outline-none transition ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 p-2"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
