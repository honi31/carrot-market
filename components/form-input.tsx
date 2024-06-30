interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}
export default function FormInput({
  type,
  placeholder,
  required,
  errors,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md w-full h-10 focus:outline-none transition ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 p-2"
        type={type} // 외부에서 커스텀 할수있는부분
        placeholder={placeholder} // 외부에서 커스텀 할수있는부분
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
