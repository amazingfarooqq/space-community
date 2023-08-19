'use client';

import clsx from "clsx";
import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
  disabled?: boolean;
  placeholder: string
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = 'text',
  disabled,
  placeholder
}) => {
  return ( 
    <div className="">
      {/* <label 
        htmlFor={id} 
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
        "
      >
        {label}
      </label> */}
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(`block text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-600 dark:bg-[#1e272d]`,
            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
          placeholder={placeholder}
        />
      </div>
    </div>
   );
}
 

export default Input;