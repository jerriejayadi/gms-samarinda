import { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  groupClassName?: string;
  label?: string;
  prefix?: string;
}

export default function Input({
  groupClassName,
  label,
  prefix,
  ...props
}: InputProps) {
  const [value, setValue] = useState<any>();
  return (
    <div className={`${groupClassName} flex flex-col gap-2 w-full`}>
      {label && <label htmlFor={props.id}>{label}</label>}
      <div
        className={`bg-[#202020] border border-white border-opacity-30 w-full  flex items-center rounded-lg focus-within:border-opacity-70`}
      >
        {prefix && (
          <div
            className={`px-4 py-3 border-r border-white border-opacity-10 text-[#565656]`}
          >
            {prefix}
          </div>
        )}
        <input
          value={value}
          className={`${props.className} w-full px-4 py-3 focus:outline-none bg-transparent placeholder:text-[#565656]`}
          {...props}
        />
      </div>
    </div>
  );
}
